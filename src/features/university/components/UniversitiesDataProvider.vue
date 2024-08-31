<script setup>
import { usePagination } from '@/composables/usePagination';
import { getAllUniversities } from '../api/uniApI';
import { useUniversity } from '../store/uniStore';
import { useApiRequest } from '@/composables/useApiRequest';

	const universities = useUniversity()
	const req = useApiRequest()

	console.log(universities.university.length == 0)
	if(universities.university.length == 0) {
		req.send(
			() => getAllUniversities({}),
			res => {
				if(res.success) {
					universities.set(res.data)
				}
			}
		)
	}
</script>
<template>
	<slot
		:universities="universities.university"
		:pending="req.pending.value"
		:error="req.error.value"
	/>
</template>