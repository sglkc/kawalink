<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import settings from '@/store/settings';

const hasJoined = ref(false)

function onFormSubmit(e: Event) {
  e.preventDefault()
  hasJoined.value = true
}

function leave() {
  hasJoined.value = false
}

function copyToClipboard() {
  if (!settings.username) return
  navigator.clipboard.writeText(settings.username)
}
</script>

<template>
  <form class="grid gap-2" @submit="onFormSubmit">
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
      <Button v-if="!hasJoined" class="bg-green-300" type="submit">JOIN</Button>
      <Button v-if="hasJoined" class="bg-blue-300" @click="copyToClipboard">
        COPY
      </Button>
      <Button v-if="hasJoined" class="bg-red-300" @click="leave">
        <div class="i-mci:close-fill"></div>
      </Button>
    </div>
  </form>
</template>
