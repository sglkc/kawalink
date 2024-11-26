<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import * as p2p from '@/store/p2p'
import settings from '@/store/settings'

const loading = ref(false)

function onFormSubmit() {
  if (!settings.username) return

  loading.value = true
  p2p.start(settings.username)
    .finally(() => loading.value = false)
}

function leave() {
  p2p.stop()
}

function copyUrl() {
  if (!settings.username) return

  const url = new URL(location.href)
  url.hash = settings.username

  navigator.clipboard.writeText(url.toString())
}
</script>

<template>
  <form class="grid gap-2" @submit.prevent="onFormSubmit">
    <label for="id-input">Enter your username</label>
    <div class="flex gap-2">
      <Input
        v-model.trim="settings.username"
        id="id-input"
        placeholder="Only alphanumerics"
        pattern="[\w\d]{1,32}"
        autocomplete="off"
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
      <Button v-if="p2p.isConnected.value" class="bg-blue-300" type="button" @click.prevent="copyUrl">
        COPY
      </Button>
      <Button v-if="p2p.isConnected.value" class="bg-red-300" type="button" @click.prevent="leave">
        <div class="i-mci:close-fill"></div>
      </Button>
    </div>
  </form>
</template>
