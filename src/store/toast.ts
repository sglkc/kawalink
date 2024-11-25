import { ref } from 'vue'
import type { ToastProps } from '@/components/Toast.vue'

interface Toast extends ToastProps {
  id: number
}

export const toasts = ref<Toast[]>([])

export function addToast(props: ToastProps, timeout = 3) {
  const id = Date.now()

  toasts.value.push({ id, ...props })

  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, timeout * 1000)
}
