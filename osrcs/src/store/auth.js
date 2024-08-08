import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuth = defineStore('authStore', () => {
  const auth = ref()

  function setAuth(val) {
    auth.value = val
  }

  function setToken(tokens) {
    auth.value.accessToken = tokens?.newToken
    auth.value.user.refreshToken = tokens?.refreshToken
  }

  return { auth, setAuth, setToken }
})
