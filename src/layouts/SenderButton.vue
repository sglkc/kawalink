<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import { isConnected, start, stop } from '@/store/p2p'
import settings from '@/store/settings'
import { addToast } from '@/store/toast'

const loading = ref(false)

function onFormSubmit() {
  const username = settings.username

  if (!username) return

  loading.value = true
  start(username).finally(() => loading.value = false)
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
    :class="{ 'bg-green-300': !loading, 'bg-gray-300': loading }"
    type="submit"
    :disabled="loading"
    @click.prevent="onFormSubmit"
  >
    <div :class="{ 'i-mci:loading-line text-2xl animate-spin': loading }">
      JOIN
    </div>
  </Button>
  <div v-if="isConnected" class="flex gap-2">
    <Button class="bg-blue-300" type="button" @click.prevent="copyUrl">
      <div class="i-mci:copy-line text-xl" />
    </Button>
    <Button class="bg-red-300" type="button" @click.prevent="stop">
      <div class="i-mci:close-fill text-xl"></div>
    </Button>
  </div>
</template>
