<script setup>
  import { InputParent } from '@/form_builder'
  import { computed, ref } from 'vue'
  import { InputError } from '@/components/form_elements'
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    previlages: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  })

  const selected = ref(props.value || [])

  const filtered = computed(() => {
    return props.previlages.reduce((state, el) => {
      if(state[el.privilegeCategory]) {
        state[el.privilegeCategory].push(el)
      } else {
        state[el.privilegeCategory] = [el]
      }
      return state
    }, {})
  })

  function toggle(val, emit) {
    const idx = selected.value.findIndex(sel => sel == val)
    if(idx > -1) {
      selected.value.splice(idx, 1)
    } else {
      selected.value.push(val)
    }
    emit(selected.value)
  }

  const thisSelected = computed(() => (id) => selected.value?.find(el => el == id))
</script>
<template>
  <InputParent :name="name" v-model="selected" v-slot="{ setRef, attrs, error, emit }">
    <div :class="attrs?.class">
      <div class="flex gap-2 items-center">
        <p class="text-sm capitalize font-medium px-1" v-if="label">{{ label }}</p>
        <InputError :error="error" />
      </div>
      <div class="previlages-grid px-1 gap-4" :ref="setRef">
        <div :key="name" v-for="name in Object.keys(filtered)" class="flex flex-col gap-2">
          <p class="text-lg font-semibold capitalize">{{ name }}</p>
          <div :key="previlage.privilegeUuid" v-for="previlage in filtered[name]" class="flex gap-2">
            <div :class="[thisSelected(previlage.privilegeUuid) ? 'bg-primary text-white' : '']" class="cursor-pointer grid place-items-center self-start min-w-[1rem] min-h-[1rem]  border border-gray-700 rounded" @click="toggle(previlage.privilegeUuid, emit)">
              <h-icon scale=".7" name="fa-check" v-if="thisSelected(previlage.privilegeUuid)" />
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-sm">{{ previlage.privilegeName }}</p>
              <p class="text-xs italic text-gray-600">{{ previlage.privilegeDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </InputParent>
</template>

<style>
  .previlages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
</style>