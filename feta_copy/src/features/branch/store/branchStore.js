import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usebranches = defineStore('branchesStore', () => {
  const branches = ref([])
  const done = ref(false)
  
  function add(branch) {
    branches.value.push(branch)
  }

  function setDone(val) {
    done.value = val
  }

  function reset() {
    branches.value = []
    done.value = false
  }

  function add(branch) {
    if(branch instanceof Array) {
      branches.value.push(...branch)
    } else {
      branches.value.unshift(branch)
    }
  }

  function set(agencie) {
    branches.value = agencie
  }

  function update(id, branch) {
    const idx = branches.value.findIndex(el => el.insuranceUuid == id)

    if(idx == -1) return 

    branches.value.splice(idx, 1, branch)
  }

  function remove(id) {
    branches.value = branches.value.filter(el => el.insuranceUuid != id)
  }

  return {
    branches,
    add,
    reset,
    update,
    setDone,
    set,
    remove,
    done
  }
})