<script setup lang="ts">
import Button from '@/components/Button.vue'
import FileUpload from '@/components/FileUpload.vue'
import { file, fileProgress, receiver, sendFile } from '@/store/p2p'

function resetFile() {
  fileProgress.value = 0
}
</script>

<template>
  <FileUpload @change="resetFile" />
  <div class="relative">
    <div
      class="absolute inset-0 color-primary -z-1"
      :style="{ right: `${100 - fileProgress * 100}%` }"
    />
    <Button
      v-show="file && receiver"
      class="w-full fw-bold"
      :class="{ 'color-primary': !fileProgress, 'text-gray-500': fileProgress }"
      @click.prevent="sendFile"
      :disabled="fileProgress"
    >
      {{ fileProgress ? `${Math.round(fileProgress * 100)}%` : 'Send!' }}
    </Button>
  </div>
</template>
