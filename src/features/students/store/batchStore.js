import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBatchs = defineStore('BatchStore', () => {
	const batches = ref([])
  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function getAll() {
    return batches.value
  }

  function reset() {
    batches.value = []
    done.value = false
  }

  function add(batche) {
    students.value.unshift(batche)
  }
  
  function set(data) {
		
    batches.value = Array.isArray(data) ? data : (data.batches || [])
  }

  function update(id, student) {
    const idx = batches.value.findIndex(el => el.ernpId == id)

    if(idx == -1) return 

    batches.value.splice(idx, 1, student)
  }
	
  function remove(id) {
    const idx = batches.value.findIndex(el => el.ernpId == id)

    if(idx > -1) {
      batches.value.splice(idx, 1)
    } 
  }

  return {  batches, set, remove, getAll, done, setDone, reset, add, update }
})