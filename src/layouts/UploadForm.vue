<script setup lang="ts">
import { ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'

const file = ref<File>()
</script>

<template>
  <FileUpload v-model="file" />
</template>
