<script setup>
import { useRouter } from 'vue-router'; // Import useRouter
import SpecialistAggrementFormPdf from '@/features/students/components/SpecialistAgreementForm.pdf.vue';
import Button from '@/components/Button.vue';
import { closeModal } from '@/modals';

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
});

const router = useRouter(); // Get the router instance

console.log(props.data);

// Method to navigate and close modal
const goToNext = () => {
	closeModal(true); // Close the modal
	router.push('/signNow'); // Navigate to the next page
};
</script>

<template>
	<div class="w-full h-full bg-black/50">
		<p class="fixed top-4 left-4 text-white bg-primary p-4  rounded-md shadow-lg">Dont Forget to Download this PDF</p>
		<SpecialistAggrementFormPdf
		v-bind="data"
		/>
		<div class='fixed z-10 bottom-2 right-2 flex items-center gap-4'>
			<Button v-if="data?.showBtn ?? true" @click="goToNext" type="primary" class="shadow-xl">
				Next
			</Button>
			<Button class="bg-red-500" @click="closeModal()">
				Cancel
			</Button>
		</div>
	</div>
</template>