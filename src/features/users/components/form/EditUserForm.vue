<script setup>
import UniversitiesDataProvider from '@/features/university/components/UniversitiesDataProvider.vue';
import UserForm from './UserForm.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { updateUser } from '@/features/university/api/userApi';
import { toasted } from '@/utils/utils';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const req = useApiRequest()
function edit(values) {
	req.send(
		() => updateUser(props.user?.userUuid, values),
		res => {
			toasted(res.success, 'Successfully Updated', res.error)
		}
	)
}
</script>

<template>
	<UniversitiesDataProvider v-slot="{pending, universities}">
		{{console.log(pending)}}
		<UserForm
			v-if="!pending"
			:pending="req.pending.value"
			:universities="universities"
			v-bind="props"
			:onSubmit="edit"
		/>
		<p v-else>Loading...</p>
	</UniversitiesDataProvider>
</template>
