<script setup lang="ts">
import Input from '@/components/Input.vue'
import settings from '@/store/settings'
import { isConnected } from '@/store/p2p'
</script>

<template>
  <div class="grid gap-2">
    <label for="id-input">
      Enter your username<span class="text-red">*</span>
    </label>
    <Input
      v-model.trim="settings.username"
      id="id-input"
      class="grow"
      :class="{ 'bg-gray-200!': isConnected }"
      placeholder="Must be alphanumeric"
      pattern="[\w\d]{1,32}"
      minlength="1"
      maxlength="32"
      autocomplete="off"
      :readonly="isConnected"
      required
    />
  </div>
</template>
