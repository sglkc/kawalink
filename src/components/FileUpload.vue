<script setup lang="ts">
const model = defineModel<File | null>()

function onChange(e: Event) {
  const { files } = (e.currentTarget as HTMLInputElement)
  const file = files?.item(0)

  model.value = file
}
</script>

<template>
  <label :class="[
    'px-4 py-8 b-2 b-black b-dashed shadow-base rounded grid gap-2 justify-center',
    'cursor-pointer'
  ]">
    <div>{{ model ? model.name : 'Click or drag-and-drop a file to send' }}</div>
    <div
      class="text-4xl m-auto"
      :class="{ 'i-mci:upload-line': !model, 'i-mci:file-line': model }"
    />
    <input
      @change="onChange"
      class="hidden"
      type="file"
    />
  </label>
</template>
