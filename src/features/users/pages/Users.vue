<script setup>
	import Table from '@com/Table.vue'
	import Button from '@com/Button.vue'
</script>
<template>
	<div class="flex py-2 border-b items-center justify-end">
		<Button @click="$router.push('/users/add')" type="primary">
			Add user
		</Button>
	</div>
	<Table
		
	/>
</template>