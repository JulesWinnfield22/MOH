<script setup>
import { usePagination } from '@/composables/usePagination';
import { getAllUniversities } from '../api/uniApI';
import { useUniversity } from '../store/uniStore';
import { useApiRequest } from '@/composables/useApiRequest';
import { watch } from 'vue';

const props = defineProps({
	search: String
})
	const universities = useUniversity()
	const pagination = usePagination({
		store: universities,
		auto: false,
		cb: (data) => getAllUniversities({...data, search: props.search})
	})

	const req = useApiRequest()

	if(universities.university.length == 0) {
		pagination.send()
	}

	watch(() => props.search, () => {
		pagination.send()
	})
</script>
<template>
	<slot
		:universities="universities.university"
		:pending="pagination.pending.value"
		:error="pagination.error.value"
	/>
</template>