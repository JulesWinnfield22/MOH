<script setup>
import FormParent from '@com/FormParent.vue';
import { useApiRequest } from '@composable/useApiRequest';
import RoleFrom from './RoleFrom.vue';
import { useRoles } from '@store/roles'
import { editRole } from '@roles/api/roleAPi'
import { addToast } from '@/toast';
import ActivePrivilagesDataProvider from '@privilege/components/ActivePrivilagesDataProvider.vue'

const props = defineProps({
  role: {
    type: Object,
    required: true
  }
})

const roleStore = useRoles()
const roleRequest = useApiRequest()

function submit(role) {
  console.log(role)
  
  roleRequest.send(
    () => editRole({id: props.role?.id, ...role}),
    res => {
      if(res.success) {
        roleStore.update(props.role?.id, res.data)
        addToast({
          type: 'success',
          message: 'Succssfuly updated a role'
        })
      }
    }
  )
}
</script>
<template>
  <FormParent :error="roleRequest.error.value" title="Update Role">
    <ActivePrivilagesDataProvider v-slot="{ pending, response }">
      <RoleFrom
        :pending="roleRequest.pending.value"
        v-if="!pending"
        :privilageoptions="response || []"
        :filter="{
          privilages: false
        }"
        :role="role"
        :on-submit="submit"
        btn-text="update"
      />
      <div v-else class="h-full flex-1 flex justify-center items-center">
        <icon name="fa-spinner" class="animate-spin" scale="1.4" />
      </div>      
    </ActivePrivilagesDataProvider>
  </FormParent>
</template>