import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCertificaets = defineStore('certificatesStore', () => {
  const certificates = ref([])
  const done = ref(false)
  
  function add(certificate) {
    certificates.value.push(certificate)
  }

  function setDone(val) {
    done.value = val
  }

  function reset() {
    certificates.value = []
    done.value = false
  }

  function add(certificate) {
    if(certificate instanceof Array) {
      certificates.value.push(...certificate)
    } else {
      certificates.value.unshift(certificate)
    }
  }

  function get(id) {
    return certificates.value.find(el => el.boughtInsuranceUuid == id)
  }

  function set(certificate) {
    certificates.value = certificate
  }

  function update(id, certificate) {
    const idx = certificates.value.findIndex(el => el.agencyUuid == id)

    if(idx == -1) return 

    certificates.value.splice(idx, 1, certificate)
  }

  function remove(id) {
    certificates.value = certificates.value.filter(el => el.agencyUuid != id)
  }

  return {
    certificates,
    add,
    reset,
    update,
    setDone,
    get,
    set,
    remove,
    done
  }
})