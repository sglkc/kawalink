import { ref } from 'vue'
import Peer, { PeerError, util, type DataConnection } from 'peerjs'
import { addToast } from './toast'

interface FileMetadata {
  name: string
  size: number
  type: string
  length: number
}

const CREDENTIALS = {
  username: '',
  credential: ''
}

export const ID_PREFIX = 'p2share-'

export const peer = ref<Peer>()
export const receiver = ref<DataConnection>()
export const file = ref<File>()
export const fileMetadata = ref<FileMetadata>()
export const fileProgress = ref(0)
export const isConnected = ref(false)

const fileChunks: Array<Uint8Array | ArrayBuffer> = []

export async function start(id: string) {
  return new Promise<Peer>(async (resolve, reject) => {
    if (peer.value) return resolve(peer.value)

    if (!CREDENTIALS.username || !CREDENTIALS.credential) {
      try {
        addToast({ type: 'info', text: 'Getting credentials...' })

        const res = await fetch('https://speed.cloudflare.com/turn-creds')
        const { username, credential } = await res.json()

        CREDENTIALS.username = username
        CREDENTIALS.credential = credential
      } catch (error) {
        addToast({ type: 'error', text: 'Failed connecting to outside world :(' })
        console.error(error)
      }
    }

    const newPeer = new Peer(ID_PREFIX + id, {
      secure: true,
      debug: 3,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          {
            urls: [ 'turn:turn.speed.cloudflare.com:50000' ],
            ...CREDENTIALS
          },
        ],
      }

    })

    newPeer
      .on('open', () => {
        isConnected.value = true
        resolve(newPeer)
      })
      .on('connection', (connection) => {
        const id = connection.peer.replace(ID_PREFIX, '')

        connection.on('data', (data) => {
          if (typeof data === 'number') {
            fileProgress.value = data
            return
          }
        })

        connection.on('close', () => {
          receiver.value = undefined
          addToast({ type: 'error', text: `No longer paired with ${id}` })
        })

        receiver.value = connection
        addToast({ type: 'success', text: `Paired with ${id}` })
      })
      .on('disconnected', reject)
      .on('error', (error) => {
        addToast({ type: 'error', text: error.message.replace(ID_PREFIX, '') })
        stop()
      })

    peer.value = newPeer
  })
}

export function stop() {
  if (receiver.value && receiver.value.open) {
    receiver.value.close()
  }

  receiver.value = undefined

  if (peer.value && !peer.value.destroyed) {
    peer.value?.destroy()
  }

  peer.value = undefined
  isConnected.value = false
}

export async function connect(id: string) {
  return new Promise<void>((resolve, reject) => {
    if (!peer.value) return reject(new Error('Peer not started'))
    if (receiver.value) return resolve()

    function peerErrorHandler(error: PeerError<string>) {
      if (error.type !== 'unavailable-id' && !error.message.includes(id)) return
      connection.off('error', peerErrorHandler)
      reject()
    }

    peer.value.on('error', peerErrorHandler)

    const connection = peer.value.connect(ID_PREFIX + id, { reliable: true })

    connection.once('open', () => {
      addToast({ type: 'success', text: `Connected to ${id}` })
      resolve()

      connection.on('data', (data) => {
        if (!data) return

        if (
          fileMetadata.value &&
            (data instanceof ArrayBuffer || data instanceof Uint8Array)
        ) {
          const { name, type, length } = fileMetadata.value

          fileChunks.push(data)
          fileProgress.value = fileChunks.length / length
          connection.send(fileProgress.value, false)

          if (fileProgress.value >= 1) {
            file.value = new File(fileChunks, name, { type })
          }

          return
        }

        fileMetadata.value = data as FileMetadata
        fileProgress.value = 0
        fileChunks.length = 0
      })
    })

    connection.once('close', () => {
      addToast({ type: 'error', text: `Disconnected from ${id}` })
      stop()
    })
  })
}

export async function sendFile() {
  const $file = file.value
  const $receiver = receiver.value

  if (!$file || !$receiver) return
  if (!$receiver.open) return addToast({ type: 'error', text: 'Not connected yet' })

  const { name, size, type } = $file
  const buffer = await $file.arrayBuffer()
  const chunks = util.chunk(buffer)
  const length = chunks[0].total

  $receiver.send({ name, size, type, length })

  for (const { data } of chunks) {
    $receiver.send(data, false)
  }
}

export function downloadFile() {
  if (!file.value || !fileMetadata.value) {
    addToast({ type: 'error', text: 'File has been deleted' })
    return
  }

  const a = document.createElement('a')

  fileProgress.value = 1
  a.href = URL.createObjectURL(file.value)
  a.download = fileMetadata.value.name ?? Date.now().toString()
  a.click()
  a.remove()

  file.value = undefined
  URL.revokeObjectURL(a.href)
}
