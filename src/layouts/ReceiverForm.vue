<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import settings from '@/store/settings'
import * as p2p from '@/store/p2p';
import { addToast } from '@/store/toast';

const loading = ref(false)

async function onReceiverSubmit() {
  if (!settings.sender) return

  let peer = p2p.peer.value
  loading.value = true

  if (!peer) await p2p.start(settings.username)

  p2p.connect(settings.sender)
    .then(() => addToast({ type: 'success', text: 'Connected' }))
    .catch(() => addToast({ type: 'error', text: 'Failed connecting to' }))
    .finally(() => (loading.value = false))
}
</script>

<template>
  <form class="grid gap-2" @submit.prevent="onReceiverSubmit">
    <label for="sender-code">Enter sender username</label>
    <div class="flex gap-2">
      <Input
        v-model.trim="settings.sender"
        id="sender-code"
        :class="{ 'bg-gray-200': p2p.connections.has(settings.sender) }"
        placeholder="Must be alphanumeric"
        pattern="[\w\d]{1,32}"
        minlength="1"
        maxlength="32"
        autocomplete="off"
        :readonly="p2p.connections.has(settings.sender)"
      />
      <Button
        :class="{ 'bg-green-300': !loading, 'bg-gray-300': loading }"
        type="submit"
        :disabled="loading"
      >
        <div :class="{ 'i-mci:loading-line text-2xl animate-spin': loading }">
          CONNECT
        </div>
      </Button>
    </div>
  </form>
</template>
