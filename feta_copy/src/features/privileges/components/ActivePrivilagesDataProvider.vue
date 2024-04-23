<script setup>
import { getPrivilages } from '@privilege/api/privilegesApi'
import { useApiRequest } from '@composable/useApiRequest';
import { usePrivilages } from '@store/privilages';

const privilaegsStore = usePrivilages()

const request = useApiRequest()

function fetchMore() {
  if (privilaegsStore.activePrivileges.length == 0) {
    request.send(
      () => getPrivilages(),
      (res) => {
        console.log(res)
        if (res.success) {
          privilaegsStore.setActivePrivilage(res.data)
        }
      }
    )
  }
}

fetchMore()
</script>

<template>
  <slot
    :response="privilaegsStore.activePrivileges || []"
    :pending="request.pending.value"
    :error="request.error.value"
  />
</template>