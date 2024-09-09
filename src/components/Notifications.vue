<script setup>
import { useNotifications } from '@/store/notifications.js';
const notifications = useNotifications();
</script>
<template>
  <div class="h-full w-full flex flex-col">
		{{ console.log(notifications.notifications)}}
    <p class="m-2 p-2 mb-0 font-bold text-lg border-b">Notifications</p>
		<button v-if="notifications.notifications?.length > 0" class="bg-primary text-sm p-1 underline text-base-clr">
			Mark all as Read
		</button>
		<p v-else class="p-2 text-center text-secondary italic text-base">No Notifications</p>
		<div :key="noti?.message" v-for="noti in notifications.notifications">
			<p class="p-2">- {{ noti?.message }}</p>
		</div>
  </div>
</template>
