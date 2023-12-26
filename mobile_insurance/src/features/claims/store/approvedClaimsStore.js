import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApprovedClaims = defineStore('approvedClaimStore', () => {
  const claims = ref([])
  const done = ref(false)
  
  function add(claim) {
    claims.value.push(claim)
  }

  function setDone(val) {
    done.value = val
  }

  function reset() {
    claims.value = []
    done.value = false
  }

  function add(claim) {
    if(claim instanceof Array) {
      claims.value.push(...claim)
    } else {
      claims.value.unshift(claim)
    }
  }

  function get(id) {
    return claims.value.find(el => el.boughtInsuranceUuid == id)
  }

  function set(claim) {
    claims.value = claim
  }

  function update(id, claim) {
    const idx = claims.value.findIndex(el => el.claimUuid == id)

    if(idx == -1) return 

    claims.value.splice(idx, 1, claim)
  }

  function remove(id) {
    claims.value = claims.value.filter(el => el.claimUuid != id)
  }

  return {
    claims,
    add,
    reset,
    update,
    setDone,
    get,
    set,
    remove,
    done
  }
})