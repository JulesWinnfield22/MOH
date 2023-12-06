<script setup>
import { getPrivilage } from '@privilege/api/privilegesApi'
import { useApiRequest } from '@composable/useApiRequest';
import { usePrivilages } from '@store/privilages';
import { watch } from 'vue';

const props = defineProps({
  status: {
    String,
    default: 'Active'
  }
})

const privilagesStore = usePrivilages()

const request = useApiRequest()

function fetchMore() {
  if (privilagesStore.privilages.length == 0) {
    request.send(
      () => getPrivilage({
        status: props.status
      }),
      (res) => {
        if (res.success) {
          privilagesStore.setPrivilages(res.data)
        }
      }
    )
  }
}

fetchMore()

watch(props, () => {
  privilagesStore.reset()
  fetchMore()
})
</script>

<template>
  <slot
    :response="privilagesStore.privilages || []"
    :pending="request.pending.value"
    :error="request.error.value"
  />
</template>