import { defineStore } from "pinia";
import { ref } from "vue";

export const useUniversity = defineStore("universityStore", () => {
  const university = ref([])
  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function getAll() {
    return university.value
  }

  function reset() {
    university.value = []
    done.value = false
  }

  function add(uni) {
    university.value.unshift(uni)
  }
  
  function set(allCertificate) {
    university.value = allCertificate
  }

  function update(id, uni) {
    const idx = university.value.findIndex(el => el.uniUuid == id)

    if(idx == -1) return 

    university.value.splice(idx, 1, uni)
  }

  function changeAmount(id, amount) {
    const idx = university.value.findIndex(el => el.uniUuid == id)

    if(idx > -1) {
      university.value[idx].totalAmount = amount
    }
  }
  
  function remove(id) {
    const idx = university.value.findIndex(el => el.uniUuid == id)

    if(idx > -1) {
      university.value.splice(idx, 1)
    } 
  }

  return { university, set, remove, getAll, done, setDone, reset, add, update }
})