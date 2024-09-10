<script setup>
import { useNotifications } from '@/store/notifications.js';
const notifications = useNotifications();
</script>
<template>
  <div class="h-full w-full flex flex-col overflow-auto relative">
		{{ console.log(notifications.notifications)}}
		<div v-if="notifications.notifications?.length" class='sticky top-0'>
			<p class="bg-white p-2 mb-0 font-bold text-lg border-b">Notifications</p>
			<button class="w-full bg-primary text-sm p-1 underline text-base-clr">
				Mark all as Read
			</button>
		</div>
		<p v-else class="p-2 text-center text-secondary italic text-base">No Notifications</p>
		<div :key="noti?.message" v-for="noti in notifications.notifications">
			<p class="p-2">- {{ noti?.message }}</p>
		</div>
  </div>
</template>
