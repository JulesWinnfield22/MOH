<script setup>
	import UserForm from '../features/users/components/form/StudentForm.vue'
	import Button from '@com/Button.vue'
	import { useApiRequest } from '@/composables/useApiRequest'
	import { allRequest, toasted } from '@/utils/utils'
	import {getAllUniversities} from '@/features/university/api/uniApI'
	import { createStudent } from '../features/users/api/studentAPi'

	const req = useApiRequest()

	

req.send(
	() => getAllUniversities({})
)


	function add(value) {
		if(req.pending.value) return

		req.send(
			() => createStudent(value),
			res => {
				toasted(res.success, 'Student Successfully Created', res.error)
			}
		)
	}
</script>
<template>
	<div class="py-2 border-b mb-2">
		<Button @click="$router.go(-1)" type="primary">go back</Button>
	</div>
	<UserForm
		:pending="req.pending.value"
		:onSubmit="add"
		:universities="req.response.value || []"
	/>
</template>