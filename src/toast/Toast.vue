<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from "./store/toast.js";
//import { mdiClose } from '@mdi/js'
import BaseIcon from '@/components/components/base/BaseIcon.vue';
const { removeToast } = useToast()
const props = defineProps({
  toast: {
    type: Object
  },
  id: String
})

const t = ref()

let timeout: any

function removeT() {
  clearTimeout(timeout)
  if(t.value) {
    t.value.classList.remove('enter')
    t.value.classList.add('leave')
    t.value.onanimationend = (() => {
      props?.id && removeToast(props?.id)
    })
  } else {
    props?.id && removeToast(props?.id)
  }
}

onMounted(() => {
  timeout = setTimeout(() => props.id && removeT(), 6000)
})

onMounted(() => {
  if(t.value) {
    t.value.style.setProperty("--height", t.value.offsetHeight + 'px')
    t.value.classList.add('enter')
  }
})

function stay() {
  clearTimeout(timeout)
}

function out() {
  timeout = setTimeout(() => props.id && removeT(), 6000)
}
</script>

<template>
  <div @mouseout="out" @mouseover="stay" ref="t" @click="removeT" :class="[$style[toast?.type || 'error']]"
    class="relative rounded-md inline-flex text-base shadow-md min-w-72">
    <p class="capitalize flex-inline px-4 max-w-[50rem] text-sm p-2 flex-1 min-h-10">{{ toast?.message }}</p>
    <div class="min-w-10 min-h-10"></div>
    <button class="absolute right-0 top-0 w-10 h-10 flex items-center justify-center self-start">
      <!--<BaseIcon :path="mdiClose" />-->
    </button>
  </div>
</template>

<style module>
/* .toast-item {
  --color: 
} */
.error {
  @apply bg-yellow-200  border-l-4 border-red-500;
}

.success {
  @apply bg-green-500 text-white;
}
</style>

<style>

.leave {
  animation: leave .2s linear;
  animation: "leave" .2s linear;
}

.enter {
  animation: enter .2s linear;
  animation: "enter" .2s linear normal;
}

@keyframes enter {
  0% {
    opacity: 0;
    height: 0;
    transform: translateX(-13rem);
    overflow: hidden;
  }

  100% {
    opacity: 1;
    height: var(--height);
    transform: translateX(0rem);
  }
}

@keyframes leave {
  0% {
    opacity: 1;
    height: var(--height);
    transform: translateX(0rem);
  }

  100% {
    opacity: 0;
    height: 0;
    transform: translateX(-13rem);
    overflow: hidden;
  }
}
</style>