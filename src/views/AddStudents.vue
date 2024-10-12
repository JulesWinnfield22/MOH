<script setup>
import UserForm from '../features/users/components/form/StudentForm.vue'
import Button from '@com/Button.vue'
import { useApiRequest } from '@/composables/useApiRequest'
import { allRequest, toasted } from '@/utils/utils'
import { getAllUniversities } from '@/features/university/api/uniApI'
import { createStudent } from '../features/users/api/studentAPi'

const req = useApiRequest()
const uniReq = useApiRequest()

uniReq.send(
	() => getAllUniversities({}),
	res => {
		console.log(res)
	}
)

function add(value, reset) {
	if (req.pending.value) return

	req.send(
		() => createStudent(value),
		res => {
			toasted(res.success, 'Student Successfully Created', res.error)
			if (res.success) {
				reset()
			}
		}

	)
}
</script>
<template>
	<div class="py-2 border-b p-5 mb-2">
		<Button @click="$router.go(-1)" type="primary">go back</Button>
	</div>
	<UserForm v-if="!uniReq.pending.value" :pending="req.pending.value" :onSubmit="add" :universities="uniReq.response.value?.content || []" />
</template>