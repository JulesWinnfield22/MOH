<script setup>
import EditUserForm from './form/EditUserForm.vue';
import UserForm from './form/UserForm.vue';

const props = defineProps({
	data: Object
})


</script>
<template>
	<div class="p-4 bg-black/50">
		<EditUserForm
			v-bind="data"
		/>
	</div>
</template>