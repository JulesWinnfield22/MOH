<script setup>
import { useApiRequest } from '@/composables/useApiRequest';
import { createContract } from '@/features/resident/components/form/api/contractApi';
import ResidentForm from '@/features/resident/components/form/ResidentForm.vue';
import { getFormData } from '@/utils/utils';
import { computed, ref, watch } from 'vue'


const rows = ref([
  { selected: false, col1: 'Row 1, p1', col2: 'pending' },
  { selected: false, col1: 'Row 2, Col 1', col2: 'pending' },
  // Add more rows as needed
])

function selectRow(index) {
  // Toggle selection of the row
  rows.value[index].selected = !rows.value[index].selected
}

function confirmSelection() {
  rows.value.forEach((row) => {
    if (row.selected && row.col2 === 'pending')
      row.col2 = 'approve'
  })
}

function rejectSelection() {
  rows.value.forEach((row) => {
    if (row.selected && row.col2 === 'pending')
      row.col2 = 'rejected'
  })
}

const married = ref('Single')
const req = useApiRequest()

const isSingle = computed(() => {
  return married.value != 'Married'
})

const filter = ref({
  agent_file: !isSingle.value,
})

watch(isSingle, () => {
  filter.value = {
    agent_file: !isSingle.value,
  }
})

function submit(values) {
  if(req.pending.value) return

  const agent_file = !isSingle.value ? {agent_file: values['agent_file']} : {}
  
  const fd = getFormData({
    identity_file: values.identity_file,
    marriage_file: values.marriage_file,
    ...agent_file
  })

  delete values.identity_file,
  delete values.marriage_file,
  delete values.agent_file,

  req.send(
    () => createContract({...values, martialStatus: married.value}, fd),
    res => {
      console.log(res)
    }
  )
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="border-b">
      <p class="font-semibold ">Martial Status</p>
      <div class="py-2 gap-2 flex items-center w-1/2">
        <div :class="[married == 'Single' && 'bg-primary text-white']" class="gap-2 rounded px-2 flex items-center flex-1 h-10 border">
          <input value="Single" @change="married = $event.target.value" :checked="married == 'Single'" type="checkbox" />
          <p>Single</p>
        </div>
        <div :class="[married == 'Married' && 'bg-primary text-white']" class="rounded px-2 flex items-center gap-2 flex-1 h-10 border">
          <input value="Married" @change="married = $event.target.value" :checked="married == 'Married'" type="checkbox" />
          Married
        </div>
        <div :class="[married == 'Divorced' && 'bg-primary text-white']" class="rounded px-2 flex items-center gap-2 flex-1 h-10 border">
          <input value="Divorced" @change="married = $event.target.value" :checked="married == 'Divorced'" type="checkbox" />
          Divorced
        </div>
        <div :class="[married == 'Widow' && 'bg-primary text-white']" class="rounded px-2 flex items-center gap-2 flex-1 h-10 border">
          <input value="Widow" @change="married = $event.target.value" :checked="married == 'Widow'" type="checkbox" />
          Widow(er)
        </div>
      </div>
    </div>
    <ResidentForm
      :filter="filter"
      :on-submit="submit"
    />
  </div>
</template>

<style scoped>
.bg-blue-200 {
  background-color: #bfdbfe; /* Tailwind CSS color class for bg-blue-200 */
}
</style>
