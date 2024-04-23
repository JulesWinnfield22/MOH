import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAgencies = defineStore('agenciesStore', () => {
  const agencies = ref([])
  const done = ref(false)
  
  function add(agency) {
    agencies.value.push(agency)
  }
  
  function getAll() {
    return agencies.value
  }

  function setDone(val) {
    done.value = val
  }

  function reset() {
    agencies.value = []
    done.value = false
  }

  function add(agency) {
    if(agency instanceof Array) {
      agencies.value.push(...agency)
    } else {
      agencies.value.unshift(agency)
    }
  }

  function set(agencie) {
    agencies.value = agencie
  }

  function update(id, agency) {
    const idx = agencies.value.findIndex(el => el.agencyUuid == id)

    if(idx == -1) return 

    agencies.value.splice(idx, 1, agency)
  }

  function remove(id) {
    agencies.value = agencies.value.filter(el => el.agencyUuid != id)
  }

  return {
    agencies,
    getAll,
    add,
    reset,
    update,
    setDone,
    set,
    remove,
    done
  }
})