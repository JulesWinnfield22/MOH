<script setup>
import UniversitiesDataProvider from '@/features/university/components/UniversitiesDataProvider.vue';
import UserForm from './UserForm.vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

function edit(values) {}
</script>

<template>
	<UniversitiesDataProvider v-slot="{pending, universities}">
		{{console.log(pending)}}
		<UserForm
			v-if="!pending"
			:universities="universities"
			v-bind="props"
			:onSubmit="edit"
		/>
		<p v-else>Loading...</p>
	</UniversitiesDataProvider>
</template>
