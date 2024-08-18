import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useContracts = defineStore('contracttsStore', () => {
	const contracts = ref([])
  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function getAll() {
    return contracts.value
  }

  function reset() {
    contracts.value = []
    done.value = false
  }

  function add(contract) {
    contracts.value.unshift(contract)
  }
  
  function set(data) {
		console.log(data)
    contracts.value = data
  }

  function update(id, contract) {
    const idx = contracts.value.findIndex(el => el.id == id)

    if(idx == -1) return 

    contracts.value.splice(idx, 1, contract)
  }
	
	function updateStatus(status, ids) {
		contracts.value.forEach(el => {
			if(ids.includes(el.id)) {
				el.contractStatus = status
			}
		})
	}

  function changeAmount(id, amount) {
    const idx = contracts.value.findIndex(el => el.id == id)

    if(idx > -1) {
      contracts.value[idx].totalAmount = amount
    }
  }
  
  function remove(id) {
    const idx = contracts.value.findIndex(el => el.id == id)

    if(idx > -1) {
      contracts.value.splice(idx, 1)
    } 
  }

  return { updateStatus, contracts, set, remove, getAll, done, setDone, reset, add, update }
})