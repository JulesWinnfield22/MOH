<script setup>
  import FormParent from '@com/FormParent.vue'
  import AgencyForm from './AgencyForm.vue';
  import { useApiRequest } from '@composable/useApiRequest'
  import { editAgency } from '@agencies/api/agenciesApi'
  import { useAgencies } from '@agencies/store/agenciesStore'
import { addToast } from '@/toast';

  const props = defineProps({
    agency: {
      type: Object,
      required: true
    },
    filter: {
      type: Object
    }
  })

  const agencyRequest = useApiRequest()
  const agenciesStore = useAgencies()

  function submit(agency) {
    agencyRequest.send(
      () => editAgency(props.agency?.agencyUuid, agency),
      res => {
        if(res.success) {
          agenciesStore.update(props.agency?.agencyUuid, {...props.agency, ...agency})
          addToast({
            type: 'success',
            message: 'Updated An Agency Successfully!'
          })
        }
      }
    )
  }
</script>
<template>
  <FormParent class="w-[55rem]" :error="agencyRequest.error.value" title="Update Agency">
    <AgencyForm
      :filter="filter"
      :agency="agency"
      :on-submit="submit"
      btn-text="update"
    ></AgencyForm>
  </FormParent>
</template>