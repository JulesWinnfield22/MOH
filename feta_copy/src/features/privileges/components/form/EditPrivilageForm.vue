<script setup>
import FormParent from '@/components/FormParent.vue';
import PrivilageForm from './PrivilageForm.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { usePrivilages } from '@/stores/privilages';
import { editPrivilage } from '@privilege/api/privilegesApi'
import { addToast } from '@/toast';

const props = defineProps({
  privilege: {
    type: Object,
    required: true
  }
})

const privlageRequest = useApiRequest()
const privilagesStore = usePrivilages()

function submit(privilage) {
  privlageRequest.send(
    () => editPrivilage(props.privilege?.privilegeUuid, privilage),
    res => {
      if(res.success && res.data.toString()?.includes('object')) {
        console.log(res.data)
        privilagesStore.update(props.privilege?.privilegeUuid, res.data)
        addToast({
          type: 'success',
          message: 'Successfully updated a privilage!'
        })
      } else if(res.data) {
        privlageRequest.error.value = res.data
      }
    }
  )
}

</script>
<template>
  <FormParent :error="privlageRequest.error.value" title="Update Privilege">
    <PrivilageForm
      :privilege="privilege"
      :on-submit="submit"
      btn-text="Update"
    />
  </FormParent>
</template>