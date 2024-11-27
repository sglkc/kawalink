<script setup lang="ts">
import { ref } from 'vue'
import { file, fileProgress } from '@/store/p2p'

const isOnTop = ref(false)
const sizeFormatter = new Intl.NumberFormat([], {
  style: 'unit',
  unit: 'byte',
  notation: 'compact',
  unitDisplay: 'narrow'
})

function onDragOver(e: DragEvent) {
  e.preventDefault()
  isOnTop.value = true
}

function onDragLeave() {
  isOnTop.value = false
}

function onFileChange(e: Event | DragEvent) {
  e.preventDefault()

  let uploadedFile

  if ('dataTransfer' in e && e.dataTransfer) {
    uploadedFile = e.dataTransfer.files?.item(0)
  } else {
    uploadedFile = (e.currentTarget as HTMLInputElement).files?.item(0)
  }

  if (!uploadedFile) return

  file.value = uploadedFile
  fileProgress.value = 0
  isOnTop.value = false
}
</script>

<template>
  <label
    class="p-8 b-2 b-black shadow-base rounded grid gap-2 justify-center text-center cursor-pointer"
    :class="{ 'bg-green-100': isOnTop, 'b-dashed': !file }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onFileChange"
  >
    <p class="touch-none select-none truncate">
      {{ file ? file.name : 'Click or drop a file here to send' }}
    </p>
    <div
      class="touch-none select-none text-4xl m-auto"
      :class="{
        'i-mci:upload-line': !file,
        'i-mci:file-line': file,
      }"
    />
    <p class="text-sm text-gray-500">
      {{ file?.size && sizeFormatter.format(file.size) }}
    </p>
    <input @change="onFileChange" class="hidden" type="file" />
  </label>
</template>
