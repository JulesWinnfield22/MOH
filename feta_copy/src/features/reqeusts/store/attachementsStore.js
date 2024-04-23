import { defineStore } from "pinia";
import { ref } from "vue";

export const useAttachemtns = defineStore("attachemtsStore", () => {
  const attachments = ref([])
  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function reset() {
    attachments.value = []
    done.value = false
  }

  function add(debit) {
    attachments.value.unshift(debit)
  }

  function update(id, debit) {
    console.log(id, debit)
    const idx = attachments.value.findIndex(el => el.debitUuid == id)

    if(idx == -1) return 

    attachments.value.splice(idx, 1, debit)
  }

  return { attachments, done, setDone, reset, add, update }
})