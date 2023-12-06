import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoles = defineStore("roleStore", () => {
  const roles = ref([])

  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function reset() {
    roles.value = []
    done.value = false
  }

  function add(user) {
    roles.value.unshift(user)
  }

  function update(id, role) {
    const idx = roles.value.findIndex(el => el.id == id)

    if(idx == -1) return 

    roles.value.splice(idx, 1, role)
  }

  return { roles, done, setDone, reset, add, update }
})