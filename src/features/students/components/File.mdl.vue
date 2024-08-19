<script setup>
import { watch } from 'vue';
import { ref, onMounted } from 'vue';

	const props = defineProps({
		file: {
			type: Blob,
			required: true
		},
		closeFile: Function
	})

const fileDoc = ref()
watch(props, () => {
	fileDoc.value.src = URL.createObjectURL(props.file)
})

onMounted(() => {
	console.log(props.file.type)
	fileDoc.value.src = URL.createObjectURL(props.file)
})
</script>
<template>
	<div :key="file.name" @click="closeFile" class="fixed inset-0 flex z-30 bg-black/50">
		<div class="w-[16rem]"></div>
		<div class="realtive p-2">
			<button @click="closeFile" class="z-50 w-8 h-8 rounded-full shadow-lg bg-white absolute top-2 right-2">
				X
			</button>
			<div class="">
				<embed :type="file.type" ref="fileDoc" class="object-cover max-w-full"  />
			</div>
		</div>
	</div>
</template>