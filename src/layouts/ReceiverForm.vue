<script setup lang="ts">
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import settings from '@/store/settings'

function onReceiverSubmit(e: Event) {
  e.preventDefault()

}
</script>

<template>
  <form class="grid gap-2" @submit="onReceiverSubmit">
    <label for="sender-code">Enter sender username</label>
    <div class="flex gap-2">
      <Input
        v-model.trim="settings.sender"
        id="sender-code"
        autocomplete="off"
      />
      <Button class="bg-green-300" type="submit">CONNECT</Button>
    </div>
  </form>
</template>
