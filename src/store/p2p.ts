import { ref } from 'vue'
import Peer, { PeerError, type DataConnection } from 'peerjs'
import { addToast } from './toast'

const ID_PREFIX = 'p2share-'

export const peer = ref<Peer>()
export const receiver = ref<DataConnection>()
export const isConnected = ref(false)

export async function start(id: string) {
  return new Promise<Peer>((resolve, reject) => {
    if (peer.value) return resolve(peer.value)

    const newPeer = new Peer(ID_PREFIX + id, { secure: true, debug: 3 })

    newPeer
      .on('open', () => {
        isConnected.value = true
        resolve(newPeer)
      })
      .on('connection', (connection) => {
        const id = connection.label

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
  receiver.value?.close()
  receiver.value = undefined
  peer.value?.destroy()
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

    const connection = peer.value.connect(ID_PREFIX + id, { reliable: true, label: id })

    connection.once('open', () => {
      addToast({ type: 'success', text: `Connected to ${id}` })
      resolve()
    })

    connection.once('close', () => {
      addToast({ type: 'error', text: 'Disconnected from sender' })
      stop()
    })
  })
}
