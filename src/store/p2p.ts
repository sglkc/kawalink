import { ref, shallowReactive } from 'vue'
import Peer, { type DataConnection } from 'peerjs'
import { addToast } from './toast'

const ID_PREFIX = 'p2share-'

export const peer = ref<Peer>()

export const isConnected = ref(false)

export const connections = shallowReactive(new Map<string, DataConnection>())

export async function start(id: string) {
  return new Promise((resolve) => {
    const newPeer = new Peer(ID_PREFIX + id, { secure: true, debug: 3 })

    newPeer
      .on('open', () => {
        isConnected.value = true
        resolve(newPeer)
      })
      .on<any>('error', stop)
      .on('disconnected', () => {
        addToast({ type: 'error', text: 'Disconnected from network' })
      })
      .on('connection', (connection) => {
        connections.set(connection.peer, connection)
      })

    peer.value = newPeer
  })
}

export function stop(reason?: string) {
  if (!peer.value) return

  if (reason) {
    addToast({ type: 'error', text: `Error connecting to peer: ${reason}` })
  }

  connections.clear()
  peer.value.destroy()
  peer.value = undefined
  isConnected.value = false
}

export async function connect(id: string) {
  return new Promise((resolve, reject) => {
    if (!peer.value) return reject('Not connected')
    if (connections.has(id)) return resolve(connections.get(id))

    const connection = peer.value.connect(ID_PREFIX + id, { reliable: true, label: id })

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
