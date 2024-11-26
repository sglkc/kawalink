<script setup lang="ts">
import { isConnected } from '@/store/p2p'
import settings from '@/store/settings'
</script>

<template>
  <div
    class="divide-x-2 divide-black b-2 b-base shadow-base rounded grid grid-cols-2 text-center"
    :class="{ 'bg-gray-200': isConnected }"
  >
    <label
      class="p-4 cursor-pointer"
      :class="{ 'bg-green-200': settings.mode === 'sender' }"
    >
      <div>Sender</div>
      <input
        class="hidden"
        v-model="settings.mode"
        type="radio"
        value="sender"
        :disabled="isConnected"
      />
    </label>
    <label
      class="p-4 cursor-pointer"
      :class="{ 'bg-green-200': settings.mode === 'receiver' }"
    >
      <div>Receiver</div>
      <input
        class="hidden"
        v-model="settings.mode"
        type="radio"
        value="receiver"
        :disabled="isConnected"
      />
    </label>
  </div>
</template>
