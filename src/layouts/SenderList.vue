<script setup lang="ts">
import type { DataConnection } from 'peerjs'
import Button from '@/components/Button.vue'
import { connections } from '@/store/p2p'

function disconnect(connection: DataConnection) {
  connection.close()
}
</script>

<template>
  <ul class="b-2 b-base divide-y-2 divide-black">
    <li class="p-2 text-center" :hidden="connections.size > 0">
      No connections, yet :(
    </li>
    <li
      v-for="[label, connection] in connections"
      :key="label"
      class="p-2 flex gap-2 items-center"
    >
      <span class="ml-2 grow">{{ label }}</span>
      <Button
        class="p-2"
        icon="i-mci:close-line"
        type="button"
        @click.prevent="disconnect(connection)"
        flat
      />
    </li>
  </ul>
</template>
