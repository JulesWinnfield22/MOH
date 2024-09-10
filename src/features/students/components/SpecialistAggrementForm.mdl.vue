<script setup>
	import SpecialistAggrementFormPdf from '@/features/students/components/SpecialistAgreementForm.pdf.vue'
	import Button from '@/components/Button.vue';
import { closeModal } from '@/modals';

	const props = defineProps({
		data: {
			type: Object,
			required: true
		}
	})

	console.log(props.data)
</script>

<template>
	<div class="w-full h-full bg-black/50">
		<SpecialistAggrementFormPdf
			v-bind="data"
		/>
		<div class='fixed z-10  bottom-2 right-2 flex items-center gap-4'>
			<Button v-if="data?.showBtn ?? true" @click="closeModal(true)" type="primary" class="shadow-xl">
				Submit
			</Button>
			<Button class="bg-red-500" @click="closeModal()">
				Cancel
			</Button>
		</div>
	</div>
</template>