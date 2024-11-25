import { shallowReactive, watchEffect } from 'vue'

interface Settings {
  username?: string
  sender?: string
  file?: File
}

const local = JSON.parse(localStorage.getItem('storage') ?? '{}') as Settings

const settings = shallowReactive<Settings>({
  username: local.username ?? Date.now().toString(),
  sender: local.sender ?? location.hash.slice(1)
})

watchEffect(() => {
  localStorage.setItem('storage', JSON.stringify(settings))
})

export default settings
