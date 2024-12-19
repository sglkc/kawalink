<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import { isConnected, start, stop } from '@/store/p2p'
import settings from '@/store/settings'
import { addToast } from '@/store/toast'

const loading = ref(false)

async function onFormSubmit() {
  const username = settings.username

  if (!username) return

  try {
    loading.value = true
    await start(username)
  } catch {
  } finally {
    loading.value = false
  }
}

function copyUrl() {
  const url = location.origin + '/#' + settings.username

  navigator.clipboard.writeText(url)
  addToast({ type: 'success', text: 'Share link copied' })
}
</script>

<template>
  <Button
    v-if="!isConnected"
    :class="{ 'color-primary': !loading, 'bg-gray-300': loading }"
    type="submit"
    :disabled="loading"
    @click.prevent="onFormSubmit"
  >
    <div class="m-auto fw-medium" :class="{ 'i-mci:loading-line text-2xl animate-spin': loading }">
      START SHARING!
    </div>
  </Button>
  <div v-if="isConnected" class="grid grid-cols-2 gap-2">
    <Button class="color-primary" type="button" icon="i-mci:copy-line" @click.prevent="copyUrl">
      Copy link
    </Button>
    <Button class="color-accent" type="button" icon="i-mci:exit-line" @click.prevent="stop">
      Disconnect
    </Button>
  </div>
</template>
