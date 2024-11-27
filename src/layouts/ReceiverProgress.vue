<script setup lang="ts">
import Button from '@/components/Button.vue'
import { downloadFile, fileProgress, fileMetadata, isConnected } from '@/store/p2p';

const sizeFormatter = new Intl.NumberFormat([], {
  style: 'unit',
  unit: 'byte',
  notation: 'compact',
  unitDisplay: 'narrow'
})
</script>

<template>
  <div
    v-show="isConnected"
    class="p-8 b-2 b-black shadow-base rounded grid gap-2 justify-center text-center"
  >
    <p class="touch-none select-none truncate">
      {{ fileMetadata ? fileMetadata.name : 'No file sent yet :(' }}
    </p>
    <div class="touch-none select-none text-4xl m-auto i-mci:file-line" />
    <p class="text-sm text-gray-500">
      {{ fileMetadata
        ? sizeFormatter.format(fileMetadata.size)
        : 'Waiting for other user'
      }}
    </p>
  </div>
  <div v-show="fileProgress" class="relative">
    <div
      class="absolute inset-0 bg-green-300 -z-1"
      :style="{ right: `${100 - fileProgress * 100}%` }"
    />
    <Button
      class="w-full fw-bold"
      :class="{ 'bg-green-300': fileProgress == 1, 'text-gray-500': fileProgress < 1 }"
      @click.prevent="downloadFile"
      :disabled="fileProgress < 1"
    >
      {{ fileProgress < 1 ? `${Math.round(fileProgress * 100)}%` : 'Download!' }}
    </Button>
  </div>
</template>

