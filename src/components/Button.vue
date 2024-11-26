<script setup lang="ts">
const { icon } = defineProps<{ icon?: string }>()
</script>

<template>
  <button class="p-4 rounded b-2 b-black shadow-base flex gap-2 justify-center align-center">
    <span v-if="icon" class="text-xl" :class="icon" />
    <slot />
  </button>
</template>
