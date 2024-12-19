<script setup lang="ts">
import ModeSwitch from '@/layouts/ModeSwitch.vue'
import ReceiverForm from '@/layouts/ReceiverForm.vue'
import ReceiverProgress from '@/layouts/ReceiverProgress.vue'
import SenderButton from '@/layouts/SenderButton.vue'
import SenderList from '@/layouts/SenderList.vue'
import UsernameForm from '@/layouts/UsernameForm.vue'
import UploadForm from '@/layouts/UploadForm.vue'
import Toast from '@/components/Toast.vue'
import { isConnected } from '@/store/p2p'
import settings from '@/store/settings'
import { toasts } from '@/store/toast'
</script>

<template>
  <TransitionGroup name="toast">
    <div v-for="toast in toasts" :key="toast.id">
      <Toast v-bind="toast" />
    </div>
  </TransitionGroup>
  <header class="mb-8">
    <h1 class="fw-bold text-4xl">KAWALINK!</h1>
    <h2 class="opacity-50">File sharing without the hassle!</h2>
  </header>
  <form class="grid gap-4" @submit.prevent>
    <div class="grid gap-4">
      <UsernameForm />
      <ModeSwitch />
    </div>
    <div v-if="settings.mode === 'sender'" class="grid gap-4">
      <SenderButton />
      <SenderList v-if="isConnected" />
      <UploadForm v-if="isConnected" />
    </div>
    <div v-else class="grid gap-4">
      <ReceiverForm  />
      <ReceiverProgress />
    </div>
  </form>
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
