import { defineStore } from "pinia";
import { ref } from "vue";

export const usePrivilages = defineStore("privilagesStore", () => {
  const privilages = ref([])
  const activePrivileges = ref([])

  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function reset() {
    privilages.value = []
    done.value = false
  }

  function setActivePrivilage(privilages) {
    activePrivileges.value = privilages
  }

  function setPrivilages(privis) {
    privilages.value = privis
    activePrivileges.value = privis.filter(pri => pri.status == 'Active')
  }

  function add(privilage) {
    privilages.value.unshift(privilage)
    activePrivileges.value = privilages.value.filter(pri => pri.status == 'Active')
  }

  function update(id, privilage) {
    const idx = privilages.value.findIndex(el => el.id == id)

    if(idx == -1) return

    privilages.value.splice(idx, 1, privilage)
    activePrivileges.value = privilages.value.filter(pri => pri.status == 'Active')
  }
  
  return { privilages, setActivePrivilage, setPrivilages, done, activePrivileges, setDone, reset, add, update }
})