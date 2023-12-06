<script setup>
import FormParent from '@/components/FormParent.vue';
import PrivilageForm from './PrivilageForm.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { usePrivilages } from '@/stores/privilages';
import { addPrivilage } from '@privilege/api/privilegesApi'
import { addToast } from '@/toast';

const privlageRequest = useApiRequest()
const privilagesStore = usePrivilages()

function submit(privilage) {
  privlageRequest.send(
    () => addPrivilage(privilage),
    res => {
      if(res.success && res.data.toString()?.includes('object')) {
        console.log(res.data)
        privilagesStore.add(res.data)
        addToast({
          type: 'success',
          message: 'Successfuly created a privilage!'
        })
      } else if(res.data) {
        privlageRequest.error.value = res.data
      }
    }
  )
}

</script>
<template>
  <FormParent :error="privlageRequest.error.value" title="Add Privilege">
    <PrivilageForm
      :on-submit="submit"
      btn-text="Add"
    />
  </FormParent>
</template>