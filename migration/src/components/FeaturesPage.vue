<script setup>
  import { Form, Input, Select } from '@com/form_elements/'
  import { ref } from 'vue';
  
  const props = defineProps({
    onAdd: {
      type: Function,
      default: f => f
    },
    statusOptions: {
      type: Array,
      default: ['Active', 'Pending', 'Disabled']
    }
  })

  const search = ref('')
  const perPage = ref(25)

  const status = ref('Active')
  const statusOptions = ref(props.statusOptions)

  const perPageOptions = [25, 50, 100]
</script>
<template>
  <div class="h-full flex flex-col gap-2">
    <div class="flex gap-2 items-center p-2 min-h-[4rem] rounded-md bg-table-clr">
      <Form @keydown.prevent.enter="() => {}">
        <Input v-model="search" placeholder="Search">
          <template #right>
            <div class="w-10 flex justify-center items-center">
              <icon name="bi-search" />
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
      <button @click="onAdd" class="ml-auto flex items-center gap-2 h-8 border rounded-md px-2">
        <icon scale=".9" name="fa-plus" />
        add
      </button>
    </div>
    <slot :perPage="perPage" :search="search" :status="status" />
  </div>
</template>