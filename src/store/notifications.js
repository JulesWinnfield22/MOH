import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotifications = defineStore("notification", () => {
	const notifications = ref()

	function setNotifications(message) {
		try {
			const json = JSON.parse(message.body);
			notifications.value = json
		} catch(err) {
			console.error(err.message)
		}
	}

	return {
		notifications,
		setNotifications
	}
})