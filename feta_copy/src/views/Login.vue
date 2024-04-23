<script setup>
  import FormSubmitButton from '@/components/FormSubmitButton.vue';
  import { Input, Form, InputPassword } from '@com/form_elements'
  import { useApiRequest } from '@/composables/useApiRequest';
  import { login, refreshAccessToken } from '@auth/auth.js'
  import { useAuth } from '@store/auth'
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter()
  const route = useRoute()

  const authStore = useAuth()
  const loginRequest = useApiRequest()
  const refreshRequest = useApiRequest()
  
  let detiail = localStorage.getItem('userDetail')

  function reRoute() {
    if(route.query.redirect && route.query?.from == 'other')
      location.href = route.query.redirect
    else if(route.query.redirect)
      router.replace(route.query.redirect)
    else
      router.replace('/')
  }

  if(detiail) {
    detiail = JSON.parse(detiail)
    authStore.setAuth({
      user: detiail,
      accessToken: detiail.token
    })
    reRoute()
  } else {
    refreshRequest.send(
      () => refreshAccessToken(false),
      res => {
        if(res.success) {
          authStore.setAuth({
            user: res.data?.userDetail,
            accessToken: res.data?.userDetail.token
          })
          localStorage.setItem('userDetail', JSON.stringify(res.data?.userDetail))
          reRoute()
        }
      },
      false,
      route.query?.from == 'other'
    )
  }
  

  function submitLogin({ values }) {
    loginRequest.send(
      () => login(values),
      res => { 
        console.log(res)          
        if(res.success) {
          authStore.setAuth({
            user: {
              privileges: ['All Privileges'],
              ...res.data
            },
            accessToken: res.data?.token
          })

          localStorage.setItem('userDetail', JSON.stringify(res.data))
          reRoute()
        }
      }
    )
  }
</script>
<template>
  <div class="w-full h-full flex place-items-center">
    <div :style="{
    }" class="relative bg-gradient-to-br from-yellow-500 bg-blue-600 h-full flex flex-col items-center flex-[2]">
      <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] bg-transparent " src="/src/assets/logo.png" />
      <div class="flex flex-col items-center gap-0 grayscale brightness-0 invert">
        <!-- <img class="h-[8rem] w-[8rem] object-cover" src="../assets/letter-logo.png" /> -->
        <div class="h-[8rem] w-[8rem] object-cover" />
      </div>
      <div class="flex flex-col items-center gap-2 select-none">
        <h1 class="text-5xl text-red-800 font-semibold">
          FETA<p class="inline text-[#004aad]">|</p>P <span class="font-light">&trade;</span>
        </h1>
        <h1 class="text-3xl text-black">Foreign Employment Term Assurance Platform</h1>
      </div>
    </div>
    <div
      :style="{
        // backgroundColor: 'rgb(216 76 34)'
      }"
    v-if="!refreshRequest.pending.value" class="flex-1 bg-white h-full shadow-md w-96 p-3 rounded-md flex justify-center flex-col gap-4">
    <p class="text-left  text-5xl uppercase border-b  font-semibold">
      Branch
      <p class="text-xl font-normal">
        login
      </p>
    </p>
      <p class="fixed top-2 left-2 font-bold italic text-4xl text-orange-800">NYALA INSURANCE</p>
      <Form v-slot="{ submit }" class="flex flex-col gap-3">
        <Input
          name="email"
          validation="required|email"
          label="Email"
          placeholder="username"
        />
        <InputPassword
          name="password"
          validation="required"
          label="Password"
          placeholder="password"
        />
        <p class="px-1 text-xs text-primary italic cursor-pointer hover:underline">forgot password</p>
        <FormSubmitButton
          :pending="loginRequest.pending.value"
          @click.prevent="submit(submitLogin)"
          btn-text="Login"
        />
      </Form>
    </div>
    <p v-else class="flex-1 text-3xl font-bold">Loading...</p>
  </div>
</template>