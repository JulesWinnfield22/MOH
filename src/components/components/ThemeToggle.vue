<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	darkMode: {
		type: Boolean,
		default: false,
	}
})

const emit = defineEmits(['update:modelValue']);
const darkMode = ref(props.darkMode);
function toggle() {
  darkMode.value = !darkMode.value;
}

watch(darkMode, (value) => {
  emit('update:modelValue', value);
})

watch(() => props.darkMode, () => {
	darkMode.value = props.darkMode
})
</script>
<template>
  <div
    tabindex="0"
    @keydown.enter="toggle"
    @click="toggle"
    :class="[darkMode ? 'bg-primary' : 'bg-text-clr']"
    class="transition-all duration-200 ease-in-out *:transition-all *:duration-300 *:ease-in-out cursor-pointer relative h-[1.6875rem] overflow-hidden gap-1 w-[4.75rem] rounded-full flex items-center px-1"
  >
    <div
      :class="darkMode ? 'left-[70%] bg-text-clr ' : 'left-1 bg-white'"
      class="z-30 absolute size-[1.2rem] shadow-md rounded-full"
    ></div>
    <p
      :class="darkMode ? 'top-full' : 'top-1'"
      class="right-2 z-10 absolute text-white text-sm font-bold"
    >
      Night
    </p>
    <p
      :class="!darkMode ? '-top-full' : 'top-1'"
      class="left-2 z-10 absolute text-white text-sm font-bold"
    >
      Day
    </p>
  </div>
</template>
