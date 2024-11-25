<script setup lang="ts">
import ReceiverForm from '@/layouts/ReceiverForm.vue'
import SenderForm from '@/layouts/SenderForm.vue'
import UploadForm from '@/layouts/UploadForm.vue';
</script>

<template>
  <main class="font-body p-8 mx-auto grid gap-4 max-w-96">
    <SenderForm />
    <ReceiverForm />
    <UploadForm />
  </main>
</template>
