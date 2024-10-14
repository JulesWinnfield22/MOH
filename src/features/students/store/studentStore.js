import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudent = defineStore('studentStore', () => {
	const student = ref({})
	const contract = ref({})

  function setDone(val) {
    done.value = val
  }

  function getAll() {
    return student.value
  }

  function reset() {
    student.value = {}
    contract.value = {}
  }

  function add(student) {
    student.value.unshift(student)
  }
  
  function set(data) {
    student.value = data
  }

	function setContract(data) {
    contract.value = data
  }

  function update(id, student) {
    const idx = student.value.findIndex(el => el.userUuid == id)

    if(idx == -1) return 

    student.value.splice(idx, 1, student)
  }
	
  function updateStatus(status, rejectionReason, ids) {
    // Update registration status
    student.value.forEach(el => {
      if (ids.includes(el.ernpId)) {
        el.registrationStatus = status;
        el.rejectionReason = rejectionReason;
      }
    });
  
    // Return the updated student array and other relevant data
    return {
      updatedStudent: student.value,
      status: 'success' // or any other data you want to return
    };
  }

  function changeAmount(id, amount) {
    const idx = student.value.findIndex(el => el.ernpId == id)

    if(idx > -1) {
      student.value[idx].totalAmount = amount
    }
  }
  
  function remove(id) {
    const idx = student.value.findIndex(el => el.userUuid == id)

    if(idx > -1) {
      student.value.splice(idx, 1)
    } 
  }

  return { setContract, contract, updateStatus, student, set, remove, getAll, setDone, reset, add, update }
})