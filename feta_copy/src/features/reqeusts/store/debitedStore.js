import { defineStore } from "pinia";
import { ref } from "vue";

export const debitedStore = defineStore("debitedStore", () => {
  const debited = ref([])
  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function reset() {
    debited.value = []
    done.value = false
  }

  function add(debit) {
    debited.value.unshift(debit)
  }

  function update(id, debit) {
    console.log(id, debit)
    const idx = debited.value.findIndex(el => el.debitUuid == id)

    if(idx == -1) return 

    debited.value.splice(idx, 1, debit)
  }

  return { debited, done, setDone, reset, add, update }
})