<script setup lang="ts">
export interface ToastProps {
  type: 'success' | 'error' | 'info'
  text?: string
}

const { type, text } = defineProps<ToastProps>()
</script>

<template>
  <div
    class="fixed top-4 right-4 p-4 b-2 b-base shadow-base"
    :class="{
      'bg-green-200': type === 'success',
      'bg-red-200': type === 'error',
      'bg-blue-200': type === 'info',
    }"
  >
    <slot>
      <p>{{ text }}</p>
    </slot>
  </div>
</template>
