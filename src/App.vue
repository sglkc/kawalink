<script setup lang="ts">
import ReceiverForm from '@/layouts/ReceiverForm.vue'
import SenderForm from '@/layouts/SenderForm.vue'
import UploadForm from '@/layouts/UploadForm.vue'
import Toast from '@/components/Toast.vue'
import { addToast, toasts } from '@/store/toast'
</script>

<template>
  <TransitionGroup name="toast">
    <div v-for="toast in toasts" :key="toast.id">
      <Toast v-bind="toast" />
    </div>
  </TransitionGroup>
  <main class="font-body p-8 mx-auto grid gap-4 max-w-96">
    <SenderForm />
    <ReceiverForm />
    <UploadForm />
  </main>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition-property: opacity, transform;
  transition: 0.25s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.toast-leave-to {
  opacity: 0;
}
</style>
