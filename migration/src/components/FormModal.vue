<script setup>
  import { ModalParent } from '@modals/'
  import { closeModal } from '@modals';

  defineProps({
    name: {
      type: String,
      requried: true
    }
  })

</script>
<template>
  <Transition name="slide">
    <ModalParent class="h-full w-full inset-0 flex justify-end" v-slot="{ modal }" :name="name">
      <slot :modal="modal" />
      <button @click="closeModal()" class="z-20 shadow-md bg-gray-200 flex justify-center items-center absolute rounded-full top-[5px] right-1 h-10 w-10">
        <icon name="fa-times" />
      </button>
    </ModalParent>
  </Transition>
</template>

<style>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.2s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    opacity: .5;
    transform: translateX(15rem);
  }
</style>