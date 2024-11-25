<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button.vue'
import Input from './components/Input.vue'

const secret = ref(location.hash?.slice(1))
const hasJoined = ref(false)

function onFormSubmit(e: Event) {
  e.preventDefault()

  if (hasJoined.value) return

  hasJoined.value = true
}

function leave() {
  hasJoined.value = false
}

function copyToClipboard() {
  navigator.clipboard.writeText(secret.value)
}
</script>

<template>
  <main class="font-body p-8 grid justify-center gap-4">
    <form class="grid gap-2" @submit="onFormSubmit">
      <label for="id-input">Enter your secret name</label>
      <div class="flex gap-2">
        <Input
          v-model.trim="secret"
          id="id-input"
          placeholder="secret_name"
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
  </main>
</template>
