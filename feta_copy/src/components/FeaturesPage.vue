<script setup>
  import { Form, Input, Select } from '@com/form_elements/'
  import { ref } from 'vue';
import { useRoute } from 'vue-router';
  
  const props = defineProps({
    onAdd: {
      type: Function,
      default: f => f
    },
    statusOptions: {
      type: Array,
      default: ['Active', 'Pending', 'Disabled']
    },
    btnText: {
      type: String
    }
  })

  const perPageConfig = import.meta.env?.v_PAGINATION_START

  const search = ref('')
  const perPage = ref(perPageConfig)

  const status = ref('Active')
  const statusOptions = ref(props.statusOptions)

  const perPageOptions = [perPageConfig, 50, 100]

  const route = useRoute()
</script>
<template>
  <div class="h-full flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <button
        class="w-10 h-10 rounded-full bg-white"
        @click="$router.go(-1)"
      >
        <h-icon name='fa-long-arrow-alt-left' />
      </button>
      <p class="font-semibold text-primary uppercase text-2xl">{{ route.path.split('/')?.[1].replace(/_/g, " ") }}</p>
    </div>
    <div class="flex gap-2 items-center p-2 min-h-[4rem] rounded-md bg-table-clr">
      <Form @keydown.prevent.enter="() => {}">
        <Input v-model="search" placeholder="Search">
          <template #right>
            <div class="w-10 flex justify-center items-center">
              <h-icon name="bi-search" />
            </div>
          </template>
        </Input>
      </Form>

      <div class="flex flex-col leading-none">
        <select v-model="perPage" class="h-6 text-xs rounded-md">
          <option v-for="option in perPageOptions" :key="option" >{{option}}</option>
        </select>
        <small class="text-[10px] text-right">per page</small>
      </div>

      <slot name="action">
        
      </slot>
    </div>
    <slot :perPage="parseInt(perPage)" :search="search" :status="status" />
  </div>
</template>