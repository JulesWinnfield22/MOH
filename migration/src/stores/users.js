import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsers = defineStore("userStore", () => {
  const users = ref([])
  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function reset() {
    users.value = []
    done.value = false
  }

  function add(user) {
    users.value.unshift(user)
  }

  function update(id, user) {
    const idx = users.value.findIndex(el => el.id == id)

    if(!idx) return idx

    users.value.splice(idx, 1, {...users.value, ...user})
  }

  return { users, done, setDone, reset, add, update }
})