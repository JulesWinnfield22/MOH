<script setup>
import TableWrapper from '@/components/TableWrapper.vue';
import { watch } from 'vue';
import { getAgeFormDate } from '@/utils/utils'

const props = defineProps({
  filtered: {
    type: Array,
    requried: true
  }
})

console.log(props.filtered)

</script>

<template>
  <TableWrapper
    :headers="{
      head: ['full name', 'gendre', 'age', 'branch', 'agency', 'destination'],
      row: ['fullname', 'gender','a', 'branchName', 'agencyName', 'destination']
    }"
    :rows="filtered.reduce((state, el) => {
      el.fullname = `${el.title} ${el.firstName} ${el.fatherName} ${el.grandFatherName}`
      el.a = getAgeFormDate(el.birthDate)
      console.log(el.age)
      state.push(el)
      return state
    }, [])"
  ></TableWrapper>  
</template>