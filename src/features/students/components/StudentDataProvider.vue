<script setup>
import { useAuth } from '@/store/auth';
import { getStudentbuId } from '../api/studentApi';
import { useApiRequest } from '@/composables/useApiRequest';
import { useStudent } from '@/features/students/store/studentStore'
import { computed } from 'vue';
import { allRequest } from '@/utils/utils';
import { getUserContract } from '../api/contractApi';

const props = defineProps({
	contract: {
		type: Boolean,
		default: false
	}
})

const student = useStudent()

const auth = useAuth()
const req = useApiRequest()
if(Object.keys(student.student).length == 0) {
	req.send(
		() => allRequest({
			contract: getUserContract(auth.auth.user?.userUuid),
			user: getStudentbuId(auth.auth.user?.userUuid)
		}),
		res => {
			console.log(res)
			if(res.success) {
				student.set(res.data?.user)
				student.setContract(res.data?.contract)
			}
		}
	)
}

const status = computed(() => {
	return student.student?.registrationStatus == 'registered'
})
</script>
<template>
	<slot
		:student="student.student"
		:pending="req.pending.value"
		:error="req.error.value"
		:status="status"
	/>
</template>