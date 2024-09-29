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
	download.value.href = fileDoc.value.src
})

const download = ref()
</script>
<template>
	<div 
  :key="file.name" 
  @click="closeFile" 
  class="fixed inset-0 flex items-center justify-center z-30 bg-black/50 p-11"
>
		<div class="w-[16rem]"></div>
		<div class="realtive p-2">
			<div class="absolute top-2 right-2 flex gap-2 items-center">
				<a download class="bg-primary px-4 py-1 rounded text-white" ref="download" >Download</a>
				<button @click="closeFile" class="z-50 w-8 h-8 rounded-full shadow-lg bg-white">
					X
				</button>
			</div>
			<div class="">
				<embed :type="file.type" ref="fileDoc" class="object-cover max-w-full"  />
			</div>
		</div>
	</div>
</template>