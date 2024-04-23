import { defineStore } from "pinia";
import { ref } from "vue";

export const reqeusteqeuests = defineStore("reqeuestStore", () => {
  const reqeuests = ref([])
  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function reset() {
    reqeuests.value = []
    done.value = false
  }

  function add(reqeust) {
    reqeuests.value.unshift(reqeust)
  }

  function update(id, reqeust) {
    console.log(id, reqeust)
    const idx = reqeuests.value.findIndex(el => el.reqeustUuid == id)

    if(idx == -1) return 

    reqeuests.value.splice(idx, 1, reqeust)
  }

  return { reqeuests, done, setDone, reset, add, update }
})