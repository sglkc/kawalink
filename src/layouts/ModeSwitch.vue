<script setup lang="ts">
import { isConnected } from '@/store/p2p'
import settings from '@/store/settings'

const modes = ['Sender', 'Receiver']
</script>

<template>
  <div
    class="divide-x-2 divide-black b-2 b-base shadow-base rounded grid grid-cols-2 text-center"
    :class="isConnected ? 'bg-gray-200' : 'bg-white'"
  >
    <label
      v-for="mode in modes"
      class="p-4 cursor-pointer transition-background-color,color"
      :class="{ 'color-secondary': settings.mode === mode.toLowerCase() }"
    >
      <div>{{ mode }}</div>
      <input
        class="hidden"
        v-model="settings.mode"
        type="radio"
        :value="mode.toLowerCase()"
        :disabled="isConnected"
      />
    </label>
  </div>
</template>
