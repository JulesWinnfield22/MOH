import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePolicies = defineStore('policiesStore', () => {
  const policies = ref([])
  const done = ref(false)
  
  function add(policy) {
    policies.value.push(policy)
  }

  function setDone(val) {
    done.value = val
  }

  function reset() {
    policies.value = []
    done.value = false
  }

  function add(policy) {
    if(policy instanceof Array) {
      policies.value.push(...policy)
    } else {
      policies.value.unshift(policy)
    }
  }

  function set(policy) {
    policies.value = policy
  }

  function update(id, policy) {
    const idx = policies.value.findIndex(el => el.agencyUuid == id)

    if(idx == -1) return 

    policies.value.splice(idx, 1, policy)
  }

  function remove(id) {
    policies.value = policies.value.filter(el => el.agencyUuid != id)
  }

  return {
    policies,
    add,
    reset,
    update,
    setDone,
    set,
    remove,
    done
  }
})