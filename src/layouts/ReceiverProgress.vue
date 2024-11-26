<script setup lang="ts">
import Button from '@/components/Button.vue'
import { downloadFile, fileProgress, fileMetadata } from '@/store/p2p';

const sizeFormatter = new Intl.NumberFormat([], {
  style: 'unit',
  unit: 'byte',
  notation: 'compact',
  unitDisplay: 'narrow'
})
</script>

<template>
  <div
    v-if="fileMetadata"
    class="p-8 b-2 b-black shadow-base rounded grid gap-2 justify-center text-center"
  >
    <p class="touch-none select-none truncate">
      {{ fileMetadata.name }}
    </p>
    <div class="touch-none select-none text-4xl m-auto i-mci:file-line" />
    <p class="text-sm text-gray-500">
      {{ sizeFormatter.format(fileMetadata.size) }}
    </p>
    <div class="mx-auto mt-2 relative">
      <div
        class="absolute inset-0 bg-green-300 -z-1"
        :style="{ right: `${100 - fileProgress * 100}%` }"
      />
      <Button
        class="p-2"
        @click.prevent="downloadFile"
        :disabled="fileProgress < 1"
        flat
      >
        Download
      </Button>
    </div>
  </div>
</template>

