<script setup lang="ts">
import Button from '@/components/Button.vue'
import { receiver } from '@/store/p2p'

function disconnect() {
  receiver.value?.close()
}
</script>

<template>
  <div v-if="receiver" class="p-2 b-2 b-base flex gap-2 items-center">
    <span class="ml-2">Connected with:</span>
    <span class="grow">{{ receiver.label }}</span>
    <Button
      class="p-2 bg-red-200"
      icon="i-mci:close-line"
      type="button"
      @click.prevent="disconnect"
      flat
    />
  </div>
</template>
