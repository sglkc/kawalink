<script setup lang="ts">
const { icon, flat } = defineProps<{
  icon?: string
  flat?: boolean
}>()
</script>

<template>
  <button
    class="b-2 b-black flex gap-2 justify-center align-center"
    :class="{ 'p-4 rounded shadow-base': !flat }"
  >
    <span v-if="icon" class="text-xl" :class="icon" />
    <slot />
  </button>
</template>
