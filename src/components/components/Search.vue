<script setup>
	import { ref, watch } from 'vue';

	const props = defineProps({
		modelValue: {
			type: String,
		}
	})
	const emit = defineEmits(['update:modelValue'])
	const search = ref(props.modelValue)

	watch(search, () => emit('update:modelValue', search.value))
</script>
<template>
  <div class="flex flex-col items-center flex-1">
    <div
      class="bg-accent focus-within:ring-2 ring-primary flex h-10 rounded-full w-full"
    >
      <div class="flex-1">
        <input
					v-model="search"
          placeholder="Search Pharmacy"
          class="text-sm border-none bg-transparent focus:shadow-none w-full focus:ring-0 focus:outline-none max-w-full h-full flex-1"
        />
      </div>
      <div class="w-12 grid place-items-center">
        <img class="object-cover h-4 w-4" src="@/assets/img/search.png" />
      </div>
    </div>
  </div>
</template>
