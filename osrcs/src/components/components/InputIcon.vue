<script setup>
import BaseIcon from './base/BaseIcon.vue';

const props = defineProps({
	icon: {
		type: String
	}
})
</script>
<template>
	<div class="min-w-8 grid justify-end place-content-center h-full">
		<BaseIcon :size="20" :path="icon" />
	</div>
</template>