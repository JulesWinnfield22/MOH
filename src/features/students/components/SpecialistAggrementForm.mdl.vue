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
		<SpecialistAggrementFormPdf
		v-bind="data"
		/>
		<div class='fixed z-10 bottom-2 right-2 flex items-center gap-4'>
		<p class="fixed top-4 my-12 right-4 text-white bg-primary p-4  rounded-md shadow-lg">Download or print this document to sign.</p>
		<h1 
      class="notification font-bold fixed bottom-4 my-[136px] mx-2 text-black bg-yellow-300 p-2 rounded-md shadow-lg transition-transform duration-300 hover:scale-105" 
      style="text-decoration: underline;">
    Note!
		</h1>

		<p 
      class="notification fixed bottom-2 my-16 mx-2  text-black bg-yellow-300 p-2 rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
    >
	Please download this PDF, sign it after printing, and don’t forget to re-upload the signed document to the system.
    </p>
			
	<Button 
    v-if="data?.showBtn ?? true" 
    @click="goToNext" 
    type="primary" 
    class="shadow-xl border border-white">
    Upload Signed Document
</Button>

			<Button class="bg-yellow-500 shadow-xl border border-white" @click="closeModal()">
				Re-enter Details
			</Button>
		</div>
	</div>
</template>