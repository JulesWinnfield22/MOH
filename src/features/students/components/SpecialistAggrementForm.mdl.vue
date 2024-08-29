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
		<Button @click="closeModal(true)" size="lg" type="primary" class="shadow-xl fixed z-10  bottom-2 right-2">
			Submit
		</Button>
	</div>
</template>