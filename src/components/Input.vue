<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <input
    class="p-4 b-2 b-base rounded shadow-base"
    :class="($attrs.readonly || $attrs.disabled) && 'bg-white'"
    v-model="model"
  />
</template>
