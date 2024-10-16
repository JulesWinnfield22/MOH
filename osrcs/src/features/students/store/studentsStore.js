import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudents = defineStore('studenttsStore', () => {
	const students = ref([])
  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function getAll() {
    return students.value
  }

  function reset() {
    students.value = []
    done.value = false
  }

  function add(student) {
    students.value.unshift(student)
  }
  
  function set(data) {
		console.log(data)
    students.value = data
  }

  function update(id, student) {
    const idx = students.value.findIndex(el => el.ernpId == id)

    if(idx == -1) return 

    students.value.splice(idx, 1, student)
  }
	
	function updateStatus(status, ids) {
		students.value.forEach(el => {
			if(ids.includes(el.ernpId)) {
				el.registrationStatus = status
			}
		})
	}

  function changeAmount(id, amount) {
    const idx = students.value.findIndex(el => el.ernpId == id)

    if(idx > -1) {
      students.value[idx].totalAmount = amount
    }
  }
  
  function remove(id) {
    const idx = students.value.findIndex(el => el.ernpId == id)

    if(idx > -1) {
      students.value.splice(idx, 1)
    } 
  }

  return { updateStatus, students, set, remove, getAll, done, setDone, reset, add, update }
})