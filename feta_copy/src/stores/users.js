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
    console.log(id, user)
    const idx = users.value.findIndex(el => el.userUuid == id)

    if(idx == -1) return 

    users.value.splice(idx, 1, user)
  }

  function remove(id) {
    users.value = users.value.filter(el => el.userUuid != id)
  }

  return { users, remove, done, setDone, reset, add, update }
})