<script setup>
import FormParent from '@com/FormParent.vue';
import { useApiRequest } from '@composable/useApiRequest';
import RoleFrom from './RoleFrom.vue';
import { useRoles } from '@store/roles'
import { addRole } from '@roles/api/roleAPi'
import { addToast } from '@/toast';
import ActivePrivilagesDataProvider from '@privilege/components/ActivePrivilagesDataProvider.vue'


const roleStore = useRoles()
const roleRequest = useApiRequest()

function submit(role) {
  roleRequest.send(
    () => addRole(role),
    res => {
      if(res.success) {
        roleStore.add(res.data)
        addToast({
          type: 'success',
          message: 'Succssfuly created a role'
        })
      }
    }
  )
}

</script>
<template>
  <FormParent :error="roleRequest.error.value" title="Add Role">
    <ActivePrivilagesDataProvider v-slot="{ pending, response }">
      <RoleFrom
        :pending="roleRequest.pending.value"
        v-if="!pending"
        :privilageoptions="response || []"
        :filter="{
          privilages: false
        }"
        :on-submit="submit"
        btn-text="Add"
      />
      <div v-else class="h-full flex-1 flex justify-center items-center">
        <icon name="fa-spinner" class="animate-spin" scale="1.4" />
      </div>      
    </ActivePrivilagesDataProvider>
  </FormParent>
</template>