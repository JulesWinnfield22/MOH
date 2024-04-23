<script setup>
import FormParent from '@/components/FormParent.vue';
import UserForm from './UserForm.vue';
import { useApiRequest } from '@composable/useApiRequest';
import { editUser } from '@users/api/userApi'
import { useUsers } from '@store/users'
import { addToast } from '@/toast';
import RoelsDataProvider from '@roles/components/RoelsDataProvider.vue'
import AgenciesDataProvider from '@agencies/components/AgenciesDataProvider.vue'
import InsurancesDataProvider from '@/features/branch/components/InsurancesDataProvider.vue';
import FormLoading from '@/components/FormLoading.vue';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const userStore = useUsers()

const userRequest = useApiRequest()

function submit(user) {
  userRequest.send(
    () => editUser(props?.user?.userUuid, {...user, roleId: parseInt(user.roleId)}),
    (res) => {
      console.log(res)
      if(res.success && Object.keys(res.data)?.length) {
        userStore.update(props?.user?.userUuid, res.data)
        addToast({
          type: 'success',
          message: 'Successfully created a new user!'
        })
      }
    }
  )
}

</script>
<template>
  <FormParent :error="userRequest.error.value" title="Update User">
    <AgenciesDataProvider v-slot="{ agencies, pending: pendingAgencies }">
      <RoelsDataProvider status="Active" v-slot="{ roles, pending }">
        <InsurancesDataProvider v-slot="{ pending: insurancePen, insurances }">
          <UserForm
            v-if="!pending && !insurancePen && !pendingAgencies"
            :on-submit="submit"
            :filter="{
              password: false
            }"
            :branches-options="insurances?.length ? insurances.map(el => ({label: el.branch, value: el.insuranceUuid})) : []"
            :user="user"
            btn-text="Update"
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