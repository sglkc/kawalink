<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import * as p2p from '@/store/p2p'
import settings from '@/store/settings'
import { addToast } from '@/store/toast'

const loading = ref(false)

function onFormSubmit() {
  const username = settings.username

  if (!username) return

  loading.value = true
  p2p.start(username)
    .finally(() => loading.value = false)
}

function leave() {
  p2p.stop()
}

function copyUrl() {
  const url = location.origin + '/#' + settings.username

  navigator.clipboard.writeText(url)
  addToast({ type: 'success', text: 'Share link copied' })
}
</script>

<template>
  <form class="grid gap-2" @submit.prevent="onFormSubmit">
    <label for="id-input">Enter your username</label>
    <div class="flex gap-2">
      <Input
        v-model.trim="settings.username"
        id="id-input"
        :class="{ 'bg-gray-100': p2p.isConnected.value }"
        placeholder="Only alphanumerics"
        pattern="[\w\d]{1,32}"
        autocomplete="off"
        :readonly="p2p.isConnected.value"
        required
      />
      <Button
        v-if="!p2p.isConnected.value"
        :class="{ 'bg-green-300': !loading, 'bg-gray-300': loading }"
        type="submit"
        :disabled="loading"
      >
        <div :class="{ 'i-mci:loading-line text-2xl animate-spin': loading }">
          JOIN
        </div>
      </Button>
      <div v-if="p2p.isConnected.value" class="flex gap-2">
        <Button class="bg-blue-300" type="button" @click.prevent="copyUrl">
          <div class="i-mci:copy-line text-xl" />
        </Button>
        <Button class="bg-red-300" type="button" @click.prevent="leave">
          <div class="i-mci:close-fill text-xl"></div>
        </Button>
      </div>
    </div>
  </form>
</template>
