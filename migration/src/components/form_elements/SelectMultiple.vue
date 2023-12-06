<script setup>
  import {InputParent} from '@/form_builder'
  import InputLayout from './InputLayout.vue'
  import { nextTick, ref } from 'vue';
  import { OnClickOutside } from '@vueuse/components'

  const props = defineProps({
    label: {
      type: String,
    },
    options: {
      type: Array,
      default: []
    },
    value: {
      type: Array,
    }
  })

  const selected = ref(props.value || [])

  function add(option, emit) {
    if(!selected.value.find(sel => sel == option)) {
      selected.value.push(option)
      nextTick(() => {
        emit(selected.value)
      })
    }
  }

  function remove(option, emit) {
    selected.value = selected.value.filter(el => el != option)
    emit(selected.value)
  }

  const open = ref(false)
</script>

<template>
  <InputParent v-model="selected" v-slot="{ setRef, error, attrs, emit }">

    <InputLayout :class="attrs.class" class="h-auto overflow-visible"  :label="label" :error="error">

      <div @keydown.enter="open = !open" tabindex="0" @click="open = !open" class="relative w-full flex" :ref="setRef">
        <p v-if="!selected.length" class="h-full p-2">{{ $attrs.placeholder ? $attrs.placeholder : 'select multiple options' }}</p>
        <div v-else class="p-2 w-full h-full flex-wrap gap-2 flex items-center">
          <div class="h-6 flex-shrink-0 overflow-hidden text-xs flex items-center rounded-md bg-primary/30" :key="selecte" v-for="selecte in selected">
            <p class="p-2">{{ selecte }}</p>
            <button @click.prevent="() => {
              remove(selecte, emit)
            }" class="bg-gray-700 text-white h-full w-6">
              <icon name="fa-times" scale=".7" />
            </button>
          </div>
        </div>
        <slot name="right" />
        <OnClickOutside :class="[open ? 'block' : 'hidden']" @trigger="open = false">
          <div class="absolute left-0 top-[110%] border rounded-md cursor-pointer w-full z-20 bg-white p-2 ">
            <div @keydown.enter.prevent="() => add(option, emit)" class="focus:border focus:border-primary" tabindex="0" @click.prevent.stop="() => {
              add(option, emit)
            }" :value="option" v-for="option in options">
              {{ option }}
            </div>
          </div>
        </OnClickOutside>
      </div>
    </InputLayout>
    
  </InputParent>
</template>