<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApiRequest } from '../composables/useApiRequest'
import { login } from '../auth/authapi'
import { useAuth } from '../store/auth'

const auth = useAuth()
// Reactive state
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loginReq = useApiRequest()
const router = useRouter()

// Toggle password visibility
function togglePassword() {
  showPassword.value = !showPassword.value
}

// Login user
async function loginUser() {
  if (loginReq.pending.value)
    return

  try {
    const res = await login({ email: email.value, password: password.value })
    if (res.success) {
      // Handle successful authentication
      auth.setAuth({
        user: res.data,
        accessToken: res.data?.token,
      })
      localStorage.setItem('userDetail', JSON.stringify(res.data))

      // Redirect to dashboard
      router.push('/dashboard')
    }
    else {
      // Handle login failure
      alert('Login failed. Please check your credentials and try again.')
    }
  }
  catch (error) {
    // Handle error
    console.error('An error occurred:', error)
    alert('An error occurred. Please try again later.')
  }
}
</script>

<template>
  <div class="grid grid-cols-2 h-screen">
    <div class="h-screen flex flex-row justify-center items-center bg-[#21618C]">
      <div class="flex flex-row items-center gap-4">
        <img class="w-full" src="../assets/Login.png">
      </div>
    </div>

    <div class="w-2/7 bg-white rounded-r-md shadow-md p-16 flex items-center justify-center">
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center justify-center mb-4 font-dm-sans">
          <img src="https://www.moh.gov.et/sites/default/files/inline-images/moh_1.png" alt="Ministry of Health - Ethiopia" class="mb-4 w-60">
          <h2 class="text-lg font-bold text-gray-800 font-dm-sans">
            Welcome
          </h2>
          <p class="text-gray-700 mt-2 font-dm-sans">
            Sign in to apply to get the resident contract here.
          </p>
        </div>
        <form @submit.prevent="loginUser">
          <div class="mb-4 font-dm-sans">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input id="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Enter your email" required>
          </div>
          <div class="mb-6 font-dm-sans relative">
            <label class="block text-gray-700 font-bold mb-2" for="password">
              Password
            </label>
            <div class="relative">
              <input id="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" required>
              <button type="button" class="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700 focus:outline-none" @click="togglePassword">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between mb-6">
            <label class="inline-flex items-center">
              <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-500 rounded font-dm-sans">
              <span class="ml-2 text-gray-700 font-dm-sans">Remember me</span>
            </label>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 font-dm-sans" href="#">
              Forgot Password?
            </a>
          </div>
          <div class="flex items-center justify-between font-dm-sans">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
              Log in
            </button>
          </div>
          <div class="flex mt-4 items-center font-dm-sans">
            <span class="text-gray-700">Don't have an account yet?</span>
            <a href="/verification" class="text-blue-500 hover:text-blue-700 text-sm font-bold"> Sign up </a>
            <span class="text-gray-700">now to join our community.</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped CSS if necessary */
</style>
