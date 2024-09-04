<script setup>
import { computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useSocket } from './composables/useSocket';
const defaultLayout = 'default';

const { currentRoute } = useRouter();

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);

const socket = useSocket()
watchEffect(async (cleanUp) => {
  try {
    let sock = await socket.connect()
    socket.subscribe('/topic/notification', (messgae) => {
      console.log(messgae)
    })
    socket.subscribe('/topic/notification', (messgae) => {
      console.log(messgae)
    })
  } catch(err) {
    console.log(err.messgae)
  }

  return cleanUp(async () => {
    await socket.unSub()
  })
}); 
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
