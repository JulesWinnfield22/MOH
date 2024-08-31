<script setup>
import FormParent from '@/components/FormParent.vue';
import EditUserForm from './form/EditUserForm.vue';
import UserForm from './form/UserForm.vue';

const props = defineProps({
	data: Object
})

console.log(props.data)
</script>
<template>
	<FormParent title="Edit User Form">
		<EditUserForm
			v-bind="data"
		/>
	</FormParent>
</template>