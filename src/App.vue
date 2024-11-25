<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button.vue'
import Input from './components/Input.vue'
import FileUpload from './components/FileUpload.vue'

const secret = ref(location.hash?.slice(1))
const hasJoined = ref(false)
const file = ref<File>()

function onFormSubmit(e: Event) {
  e.preventDefault()
  hasJoined.value = true
}

function leave() {
  hasJoined.value = false
}

function copyToClipboard() {
  navigator.clipboard.writeText(secret.value)
}

function onReceiverSubmit(e: Event) {
  e.preventDefault()
}
</script>

<template>
  <main class="font-body p-8 mx-auto grid gap-4 max-w-96">
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
    <form class="grid gap-2" @submit="onReceiverSubmit">
      <label for="sender-code">Enter sender secret</label>
      <div class="flex gap-2">
        <Input
          v-model.trim="secret"
          id="sender-code"
        />
        <Button class="bg-green-300" type="submit">CONNECT</Button>
      </div>
    </form>
    <FileUpload v-model="file" />
  </main>
</template>
