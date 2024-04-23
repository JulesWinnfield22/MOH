<script setup>
import FormParent from '@/components/FormParent.vue';
import UserForm from './UserForm.vue';
import { useApiRequest } from '@composable/useApiRequest';
import { addUser } from '@users/api/userApi'
import { useUsers } from '@store/users'
import { addToast } from '@/toast';
import RoelsDataProvider from '@roles/components/RoelsDataProvider.vue'
import AgenciesDataProvider from '@agencies/components/AgenciesDataProvider.vue'
import InsurancesDataProvider from '@/features/branch/components/InsurancesDataProvider.vue';
import FormLoading from '@/components/FormLoading.vue';

const userStore = useUsers()

const userRequest = useApiRequest()

function submit(user, reset) {
  userRequest.send(
    () => addUser(user),
    (res) => {
      if(res.success && Object.keys(res.data)?.length) {
        console.log(res)
        userStore.add(res.data)
        addToast({
          type: 'success',
          message: 'Successfully created a new user!'
        })
        reset()
      }
    }
  )
}

</script>
<template>
  <FormParent class="w-full" :error="userRequest.error.value" title="Add User">
    <AgenciesDataProvider v-slot="{ agencies, pending: pendingAgencies }">
      <RoelsDataProvider status="Active" v-slot="{ roles, pending }">
        <InsurancesDataProvider v-slot="{ insurances, pending: pendingInsu }"> 
          <UserForm
            v-if="!pending && !pendingAgencies && !pendingInsu"
            :on-submit="submit"
            :branches-options="insurances?.length ? insurances.map(el => ({label: el.branch, value: el.insuranceUuid})) : []"
            btn-text="Add"
            :pending="userRequest.pending.value"
            :agencies-option="agencies.map(a => ({label: a.agencyName, value: a.agencyUuid}))"
            :role-options="roles.map(r => ({label: r.roleName, value: r.id}))"
          ></UserForm>
          <FormLoading v-else />
        </InsurancesDataProvider>
      </RoelsDataProvider>
    </AgenciesDataProvider>
  </FormParent>
</template>