<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel<File | null>()
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

  let file

  if ('dataTransfer' in e && e.dataTransfer) {
    file = e.dataTransfer.files?.item(0)
  } else {
    file = (e.currentTarget as HTMLInputElement).files?.item(0)
  }

  isOnTop.value = false

  if (!file) return

  model.value = file
}
</script>

<template>
  <label
    class="px-4 py-8 b-2 b-black shadow-base rounded grid gap-2 justify-center text-center cursor-pointer"
    :class="{ 'bg-green-100': isOnTop, 'b-dashed': !model }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onFileChange"
  >
    <p class="touch-none select-none truncate">
      {{ model ? model.name : 'Click or drag-and-drop a file to send' }}
    </p>
    <div
      class="touch-none select-none text-4xl m-auto"
      :class="{
        'i-mci:upload-line': !model,
        'i-mci:file-line': model,
      }"
    />
    <p class="text-sm text-gray-500">{{ model?.size && sizeFormatter.format(model.size) }}</p>
    <input
      @change="onFileChange"
      class="hidden"
      type="file"
    />
  </label>
</template>
