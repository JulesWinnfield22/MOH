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
    const idx = roles.value.findIndex(el => el.roleUuid == id)

    if(idx == -1) return 

    roles.value.splice(idx, 1, role)
  }

  function remove(id) {
    roles.value = roles.value.filter(el => el.roleUuid != id)
  }

  return { roles, remove, done, setDone, reset, add, update }
})