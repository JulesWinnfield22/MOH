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

  refreshRequest.send(
    () => refreshAccessToken(),
    res => {
      if(res.success) {
        authStore.setAuth({
          user: res.data?.userDetail,
          accessToken: res.data?.userDetail?.accessToken
        })

        if(route.query.redirect && route.query?.from == 'other')
          location.href = route.query.redirect
        else if(route.query.redirect)
          router.replace(route.query.redirect)
        else
          router.replace('/')
      }
    },
    false,
    route.query?.from == 'other'
  )

  function submitLogin({ values }) {
    loginRequest.send(
      () => login(values),
      res => { 
        console.log(res)          
        if(res.success) {
          authStore.setAuth({
            user: {
              privileges: ['All Privileges'],
              ...res.data?.userDetail
            },
            accessToken: res.data?.userDetail?.accessToken
          })

          if(route.query.redirect)
            router.replace(route.query.redirect)
          else
            router.replace('/')
        }
      }
    )
  }
</script>
<template>
  <div class="w-full h-full grid place-items-center">
    <div v-if="!refreshRequest.pending.value" class="shadow-md w-96 p-3 bg-table-clr rounded-md flex flex-col gap-4">
      <p class="text-center m-2 text-2xl uppercase border-b p-2 font-semibold">
        Login
      </p>
      <Form v-slot="{ submit }" class="flex flex-col gap-3">
        <Input
          name="username"
          validation="required"
          label="username"
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
    <p v-else class="text-3xl font-bold">Loading...</p>
  </div>
</template>