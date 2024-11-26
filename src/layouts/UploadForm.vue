<script setup lang="ts">
import Button from '@/components/Button.vue'
import FileUpload from '@/components/FileUpload.vue'
import { sendFile } from '@/store/p2p'
</script>

<template>
  <FileUpload />
  <Button @click.prevent="sendFile">send</Button>
</template>
