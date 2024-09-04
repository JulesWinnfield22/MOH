<script setup>
	import UserForm from '../components/form/UserForm.vue'
	import Button from '@com/Button.vue'
	import { useApiRequest } from '@/composables/useApiRequest'
	import { allRequest, toasted } from '@/utils/utils'
	import {getAllUniversities} from '@/features/university/api/uniApI'
	import {createUser} from '../api/usersAPi.js'

	const req = useApiRequest()
	const createReq = useApiRequest()

	req.send(
		() => getAllUniversities({})
	)

	function add(value) {
		if(createReq.pending.value || req.pending.value) return

		createReq.send(
			() => createUser(value),
			res => {
				toasted(res.success, 'Successfully Created', res.error)
			}

		)
	}
</script>
<template>
	<!-- <div class="py-2 border-b mb-2">
		<Button @click="$router.go(-1)" type="primary">go back</Button>
	</div> -->
	<UserForm
		:pending="req.pending.value"
		:onSubmit="add"
		:universities="req.response.value || []"
	/>
</template>