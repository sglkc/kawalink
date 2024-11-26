import { ref, shallowReactive } from 'vue'
import Peer, { PeerError, type DataConnection } from 'peerjs'
import { addToast } from './toast'

const ID_PREFIX = 'p2share-'

export const peer = ref<Peer>()

export const isConnected = ref(false)

export const connections = shallowReactive(new Map<string, DataConnection>())

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
          connections.delete(id)
          addToast({ type: 'error', text: `${id} left` })
        })

        connections.set(id, connection)
        addToast({ type: 'success', text: `${id} joined` })
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
  if (!peer.value) return

  connections.clear()
  peer.value.destroy()
  peer.value = undefined
  isConnected.value = false
}

export async function connect(id: string) {
  return new Promise<void>((resolve, reject) => {
    if (!peer.value) return reject(new Error('Peer not started'))
    if (connections.has(id)) return resolve()

    const connectionHandler = () => {
      connection.off('open', connectionHandler)
      resolve()
    }

    const connectionErrorHandler = (error: PeerError<string>) => {
      if (error.type !== 'unavailable-id' && !error.message.includes(id)) return

      connection.off('error', connectionErrorHandler)
      reject()
    }

    const connection = peer.value.connect(ID_PREFIX + id, { reliable: true, label: id })

    connection.on('open', connectionHandler)
    connection.on('error', connectionErrorHandler)
    connection.on('close', () => {
      addToast({ type: 'error', text: 'Disconnected from sender' })
      stop()
    })
  })
}
