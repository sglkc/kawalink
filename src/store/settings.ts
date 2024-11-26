import { shallowReactive, watchEffect } from 'vue'

interface Settings {
  username: string
  sender: string
  mode: 'sender' | 'receiver'
}

const settings = shallowReactive<Settings>({
  username: localStorage.getItem('p2share-username') ?? Date.now().toString(),
  sender: location.hash.slice(1) ?? '',
  mode: location.hash.slice(1) ? 'receiver' : 'sender'
})

watchEffect(() => {
  localStorage.setItem('p2share-username', settings.username)
})

export default settings
