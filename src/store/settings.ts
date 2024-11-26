import { shallowReactive, watchEffect } from 'vue'

interface Settings {
  username: string
  sender: string
  file?: File
}

const settings = shallowReactive<Settings>({
  username: localStorage.getItem('p2share-username') ?? Date.now().toString(),
  sender: location.hash.slice(1) ?? ''
})

watchEffect(() => {
  localStorage.setItem('p2share-username', settings.username)
})

watchEffect(() => {
  location.replace('#' + settings.sender)
})

export default settings
