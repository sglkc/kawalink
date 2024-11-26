<script setup lang="ts">
import ModeSwitch from '@/layouts/ModeSwitch.vue'
import ReceiverForm from '@/layouts/ReceiverForm.vue'
import SenderButton from '@/layouts/SenderButton.vue'
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
  <form class="font-body md:p-8 p-4 mx-auto grid gap-4 max-w-128">
    <UsernameForm />
    <ModeSwitch />
    <ReceiverForm v-if="settings.mode === 'receiver'" />
    <SenderButton v-if="settings.mode === 'sender'"/>
    <UploadForm v-if="(settings.mode === 'sender') && isConnected" />
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
