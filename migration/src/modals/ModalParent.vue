<script setup>
import { closeModal } from '.';
import { useModal } from './store/modal.js'
import { watch, ref } from 'vue'

const props = defineProps(['name'])
const { modals, getModal } = useModal()

const modal = ref(getModal(props.name))

watch(modals, (modals) => {
	modal.value = getModal(props.name)
})
</script>
<template>
	<div @click.self="closeModal()" v-if='modal' :class='[!modal?.active ? "inactive" : "active"]' class='modal'>
		<slot :modal='modal'></slot>
	</div>
</template>