<script setup>
  import FormParent from '@com/FormParent.vue'
  import AgencyForm from './AgencyForm.vue';
  import { useApiRequest } from '@composable/useApiRequest'
  import { addAgency } from '@agencies/api/agenciesApi'
  import { useAgencies } from '@agencies/store/agenciesStore'
  import { addToast } from '@/toast';

  const agencyRequest = useApiRequest()
  const agenciesStore = useAgencies()

  function submit(agency) {
    agencyRequest.send(
      () => addAgency(agency),
      res => {
        if(res.success) {
          agenciesStore.add(res.data)
          addToast({
            type: 'success',
            message: 'Created An Agency Successfully!'
          })
        }
      }
    )
  }
</script>
<template>
  <FormParent class="w-full" :error="agencyRequest.error.value" title="Add Agency">
    <AgencyForm
      :on-submit="submit"
      btn-text="Add"
    ></AgencyForm>
  </FormParent>
</template>