<script setup>
import { useSocket } from '@/composables/useSocket';
import { useNotifications } from '@/store/notifications.js';
import { secondDateFormat } from '@/utils/utils';

const notifications = useNotifications();
const socket = useSocket()

function seen(id) {
	socket.send('/app/seen', JSON.stringify([id]))
	notifications.seen(id)
}
</script>
<template>
  <div class="h-full w-full flex flex-col overflow-auto relative">
		{{ console.log(notifications.notifications)}}
		<div v-if="notifications.notifications?.length" class='sticky top-0'>
			<p class="bg-white p-2 mb-0 font-bold text-lg border-b">Notifications</p>
			<button class="w-full mb-2 bg-primary text-sm p-1 underline text-base-clr">
				Mark all as Read
			</button>
		</div>
		<p v-else class="p-2 text-center text-secondary italic text-base">No Notifications</p>
		<div class="flex border-b pl-2 pb-2" :key="noti?.message" v-for="noti in notifications.notifications">
			<p>-</p>
			<div class="flex w-full px-2 flex-col gap-1 justify-start">
				<p class="text-black"> {{ noti?.message }}</p>
				<div class="flex justify-between w-full items-center">
					<p class="text-sm">{{ secondDateFormat(noti?.statusUpdateDate) }}</p>
					<button v-if="!noti?.seen" @click="seen(noti?.notificationUuid)" class="self-start bg-secondary text-sm px-4 text-white rounded">Seen</button>
				</div>
			</div>
		</div>
  </div>
</template>
