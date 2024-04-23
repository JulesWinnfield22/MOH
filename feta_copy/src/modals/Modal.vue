<script setup>
import { useModal } from './store/modal'
import { watch, ref, onMounted, defineAsyncComponent, defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import './style.css'

const { modals, closeModal, loadModal, config } = useModal()

async function load(modules) {
	let names = Object.keys(modules)
		.map(name => {
			return name.split("/").at(-1).split(".").at(0)
		})

	const promise = Object.keys(modules)
		.map(mdl => {
			return defineAsyncComponent({
				loader: modules[mdl]
			})
		})

	const res = await Promise.all(promise)

	res.forEach((el, idx) => {
		loadModal(el, names[idx])
	})
}

function loadAllModals() {
	const modules = import.meta.glob([`/**/*.mdl.vue`, "!./node_modules"]);
	// const asyncModules = import.meta.glob(`/**/*.amdl.vue`, {eager: true});
	let mods = { ...modules }
	load(mods)
}

const { fetchedModals } = storeToRefs(useModal())

const showModal = ref(false)

watch(modals, modals => {
	if (!modals.length) return (showModal.value = false)

	showModal.value = true
})

loadAllModals()
</script>

<template>
	<div @click.self='closeModal()' :class="[showModal ? 'block' : 'hidden']" class='modal-parent'>
		<template v-for='{ id, modal } in fetchedModals' :key='id'>
			<component :is='modal' />
		</template>
	</div>
</template>
