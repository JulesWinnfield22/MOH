<script setup>
import TableWrapper from '@/components/TableWrapper.vue';
import { watch } from 'vue';
import { getAgeFormDate } from '@/utils/utils'

const props = defineProps({
  certificates: {
    type: Array,
    requried: true
  }
})

let byAgency = props.certificates.reduce((state, el) => {
  state.add(el.agencyName)
  return state
}, new Set())


byAgency = [...byAgency]
.reduce((state, el) => {
  console.log(el)
  const destinations = props.certificates
  .filter(cer => cer.agencyName == el)
  .map(el => el.destination)
  .reduce((state, el) => {
    console.log(state, el)
    if(state[el]) {
      ++state[el]
    } else {
      state[el] = 1
    }
    return state
  }, {})
  state.push({
    name: el,
    destinations
  })
  return state
}, [])

const res = byAgency.reduce((state, el) => {
  Object.keys(el.destinations)
  .forEach(name => {
    state.push({...el, destination: name, total: el.destinations[name]})
  })
  return state
}, [])

console.log(res)
</script>

<template>
  <TableWrapper
    :showPagination="false"
    :headers="{
      head: ['agency', 'destinations', 'total'],
      row: ['name', 'destination', 'total']
    }"
    :rows="res"
  ></TableWrapper>  
</template>