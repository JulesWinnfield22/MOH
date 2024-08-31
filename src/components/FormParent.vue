<script setup>
import { closeModal } from '@/modals';

	const props = defineProps({
		title: String,
		size: {
			type: String,
			default: 'md'
		}
	})
</script>
<template>
	<div class="p-4 bg-black/50 min-h-full grid place-items-center w-full">
		<div :class="[$style[size]]" class="flex flex-col bg-white shadow-lg rounded-lg p-2 overflow-auto">
			<div class="flex justify-between items-center border-b m-2">
				<p class="font-bold text-xl py-2">{{ title }}</p>
				<button class="size-6  bg-gray-300 grid place-items-center rounded-full" @click="closeModal()">
					x
				</button>
			</div>
			<div class="p-2">
				<slot />
			</div>
		</div>
	</div>
</template>

<style module>
	.md {
		width: 35rem;
	}

	.md {
		width: 50rem;
		height: 100%;
		min-height: 20rem;
	}
</style>