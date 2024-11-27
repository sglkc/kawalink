<script setup lang="ts">
import Button from '@/components/Button.vue'
import { ID_PREFIX, receiver } from '@/store/p2p'

function disconnect() {
  receiver.value?.close()
}
</script>

<template>
  <div class="p-4 b-2 b-base flex gap-2 items-center">
    <span class="grow">
      {{ receiver
        ? 'Sharing with ' + receiver.peer.replace(ID_PREFIX, '')
        : 'No one connected yet :('
      }}
    </span>
    <Button
      v-show="receiver"
      class="p-2 bg-red-200"
      icon="i-mci:close-line"
      type="button"
      @click.prevent="disconnect"
      flat
    />
  </div>
</template>
