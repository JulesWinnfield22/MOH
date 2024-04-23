<script setup>
import { addToast } from '@/toast';
import { useApiRequest } from '@composable/useApiRequest';
import { getRoles, deleteRole, searchRole } from '@roles/api/roleAPi'
import { useRoles } from '@store/roles'
import { nextTick } from 'vue';
import { ref, watch } from 'vue';
import { useTablePagination } from '@/composables/useTablePagination'
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';

const props = defineProps({
  status: {
    type: String
  },
})

const rolesStore = useRoles()
const roleDeleteStore = useApiRequest()
const roleRequest = useApiRequest()

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  if (roleRequest.pending.value || rolesStore.done) return
  console.log("roles")
  roleRequest.send(
    () => getRoles(pagination, {
      params: {
        status: props.status
      }
    }),
    ({ success, data }) => {
      if (success && !rolesStore.done) {
        if (data.length == 0) {
          rolesStore.setDone(true)
        } else {
          // data.reduce((roles, role) => {
          //   // if(!role?.privileges?.[0].toString()?.includes('object')) {
          //   //   role.privileges = [
          //   //     {
          //   //       privilege: role?.privileges?.[0],
          //   //       actions: []
          //   //     }
          //   //   ]
          //   // } 
          //   roles.push(role)
          //   return roles
          // }, [])
          rolesStore.roles.push(...data)
          rolesStore.setDone(true)
        }
      }
      cb({success, data})
    }
  )
}

fetchMore()

function remove(id) {
  if(roleDeleteStore.pending.value) return

  roleDeleteStore.send(
    () => deleteRole(id),
    res => {
      if(res.success) {
        rolesStore.remove(id)
        addToast({
          type: 'success',
          message: 'Successfully deleted a role'
        })
      } else {
        addToast({
          type: 'error',
          message: 'Couldnt deleted a role. try again!'
        })
      }
    }
  )
}

</script>
<template>
  <PaginationWithSearch
    :perPageApi="fetchMore"
    :search-api="(query, config) => getRoles(query, {
      ...config,
      params: {
        status: props.status
      }
    })"
    :store="rolesStore"
    v-slot="{ next, previous, searchPending, searching, result }"
  >
    <slot
      v-bind="{ next, previous }"
      :roles="searching ? result || [] : rolesStore.roles"
      :pending="searchPending || roleRequest.pending.value"
      :error="roleRequest.error.value"
      :remove="remove"
    />    
  </PaginationWithSearch>
</template>