import { ref, shallowReactive } from 'vue'
import Peer, { PeerError, type DataConnection } from 'peerjs'
import { addToast } from './toast'

const ID_PREFIX = 'p2share-'

export const peer = ref<Peer>()

export const isConnected = ref(false)

export const connections = shallowReactive(new Map<string, DataConnection>())

export async function start(id: string) {
  return new Promise((resolve) => {
    const newPeer = new Peer(ID_PREFIX + id, { secure: true, debug: 2 })

    newPeer
      .on('open', () => {
        isConnected.value = true
        resolve(newPeer)
      })
      .on('error', (error) => {
        addToast({ type: 'error', text: error.message })
        stop()
      })
      .on('connection', (connection) => {
        const id = connection.peer.slice(ID_PREFIX.length)

        connections.set(id, connection)
        addToast({ type: 'success', text: 'Connected to ' + id })
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
  return new Promise<DataConnection>((resolve, reject) => {
    if (!peer.value) return reject(new Error('Peer not started'))
    if (connections.has(id)) return resolve(connections.get(id)!)

    const connectErrorHandler = (error: PeerError<string>) => {
      if (error.type !== 'peer-unavailable' && !error.message.includes(id)) return

      peer.value?.off('error', connectErrorHandler)
      reject()
    }

    const connection = peer.value.connect(ID_PREFIX + id, { reliable: true, label: id })

    peer.value.on('error', connectErrorHandler)

    connection
      .on('open', () => {
        connections.set(id, connection)
        resolve(connection)
      })
      .on('error', () => {
        connections.delete(id)
      })
  })
}
