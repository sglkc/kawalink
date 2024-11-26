<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import { isConnected, connect, start, stop } from '@/store/p2p'
import settings from '@/store/settings'

const loading = ref(false)

async function onReceiverSubmit() {
  if (!settings.sender) return

  try {
    loading.value = true
    location.replace('#' + settings.sender)
    await start(settings.username)
    await connect(settings.sender)
  } catch {
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex gap-2">
    <Input
      v-model.trim="settings.sender"
      id="sender-code"
      class="grow"
      :class="{ 'bg-gray-100': isConnected }"
      placeholder="Enter sender username"
      pattern="[\w\d]{1,32}"
      minlength="1"
      maxlength="32"
      autocomplete="off"
      required
      :readonly="isConnected"
    />
    <Button
      v-if="!isConnected"
      :class="{ 'bg-green-300': !loading, 'bg-gray-300': loading }"
      type="submit"
      :disabled="loading"
      @click.prevent="onReceiverSubmit"
    >
      <div :class="{ 'i-mci:loading-line text-2xl animate-spin': loading }">
        CONNECT
      </div>
    </Button>
    <Button v-else class="bg-red-300" icon="i-mci:close-line" @click.prevent="stop">
      Disconnect
    </Button>
  </div>
</template>
