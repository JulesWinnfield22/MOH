<script setup>
import { useApiRequest } from '@composable/useApiRequest';
import { getRoles } from '@roles/api/roleAPi'
import { useRoles } from '@store/roles'
import { nextTick, watch } from 'vue';

const props = defineProps({
  status: {
    type: String
  }
})

const rolesStore = useRoles()
const roleRequest = useApiRequest()

let controller

function fetchMore() {
  if (roleRequest.pending.value || rolesStore.done) return

  if (controller) controller.abort()
  controller = new AbortController()

  console.log("roles")
  roleRequest.send(
    () => getRoles({
      signal: controller.signal,
      params: {
        status: props.status
      }
    }),
    ({ success, data }) => {
      if (success && !rolesStore.done) {
        if (data.length == 0) {
          rolesStore.setDone(true)
        } else {
          data.reduce((roles, role) => {
            if(!role?.privileges?.[0].toString()?.includes('object')) {
              role.privileges = [
                {
                  privilege: role?.privileges?.[0],
                  actions: []
                }
              ]
            } 
            roles.push(role)
            return roles
          }, [])
          rolesStore.roles.push(...data)
          rolesStore.setDone(true)
        }
      }
    }
  )
}

fetchMore()

watch(props, () => {
  rolesStore.reset()
  nextTick(() => {
    fetchMore()
  })
})
</script>
<template>
  <slot
    :roles="rolesStore.roles"
    :pending="roleRequest.pending.value"
    :error="roleRequest.error.value"
  />
</template>