<script setup>
import FormParent from '@/components/FormParent.vue';
import UserForm from './UserForm.vue';
import { useApiRequest } from '@composable/useApiRequest';
import { addUser } from '@users/api/userApi'
import { useUsers } from '@store/users'
import { addToast } from '@/toast';
import RoelsDataProvider from '@roles/components/RoelsDataProvider.vue'

const userStore = useUsers()

const userRequest = useApiRequest()

function submit(user) {
  userRequest.send(
    () => addUser(user),
    (res) => {
      if(res.success && Object.keys(res.data)?.length) {
        console.log(res)
        userStore.add(res.data)
        addToast({
          type: 'success',
          message: 'successfuly created a new user!'
        })
      } else {
        userRequest.error.value = res.data
      }
    }
  )
}

</script>
<template>
  <FormParent :error="userRequest.error.value" title="Add User">
    <RoelsDataProvider status="Active" v-slot="{ roles, pending }">
      <UserForm
        v-if="!pending"
        :on-submit="submit"
        btn-text="Add"
        :pending="userRequest.pending.value"
        :role-options="roles.map(r => r.role)"
      ></UserForm>
      <div v-else class="h-full flex-1 flex justify-center items-center">
        <icon name="fa-spinner" class="animate-spin" scale="1.4" />
      </div>
    </RoelsDataProvider>
  </FormParent>
</template>