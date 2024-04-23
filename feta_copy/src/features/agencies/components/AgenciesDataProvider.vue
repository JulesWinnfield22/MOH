<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getAllAgenncies, searchAgencies, editAgency, removeAgency as removeA } from '@agencies/api/agenciesApi'
  import { useAgencies } from '@agencies/store/agenciesStore'
  import { ref, watch } from 'vue';
  import { addToast } from '@/toast';
  import { useTablePagination } from '@/composables/useTablePagination'
  import PerPage from '@com/PerPage.vue'
  import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
  import SearchWithPagination from '@/components/SearchWithPagination.vue';
  import { Status } from '@/utils/enums';

  const props = defineProps({
    status: {
      type: String,
      default: Status.ACTIVE  
    }  
  })

  const agenciesRequest = useApiRequest()
  const deleteRequest = useApiRequest()
  const agenciesStore = useAgencies()

  function removeAgency(id) {
    if(deleteRequest.pending.value) return
    
    deleteRequest.send(
      () => removeA(id),
      res => {
        if(res.success) {
          agenciesStore.remove(id)
          addToast({
            type: 'success',
            message: "Suuccessfully Deleted the agency."
          })
        } else {
          addToast({
            type: 'error',
            message: "Couldn't Delete the agency try again!"
          })
        }
      }
    )
  }
  
  function suspend(id, data) {
    if(deleteRequest.pending.value) return

    deleteRequest.send(
      () => editAgency(id, data),
      res => {
        if(res.success) {
          agenciesStore.remove(id)
          addToast({
            type: 'success',
            message: "Successfully Suspended the agency."
          })
        } else {
          addToast({
            type: 'error',
            message: "Couldn't Suspended the agency try again!"
          })
        }
      }
    )
  }
  
  function activateAgency(id, data) {
    if(deleteRequest.pending.value) return

    deleteRequest.send(
      () => editAgency(id, data),
      res => {
        if(res.success) {
          agenciesStore.remove(id)
          addToast({
            type: 'success',
            message: "Successfully Suspended the agency."
          })
        } else {
          addToast({
            type: 'error',
            message: "Couldn't Activate the agency try again!"
          })
        }
      }
    )
  }

</script>
<template>
  <SearchWithPagination
    :cb="(data, config) => getAllAgenncies({...data, status: props.status}, config)"
    :store="agenciesStore"
    v-slot="{ data, pending }"
  >
    <slot
      :agencies="data"
      :pending="pending"
      :removeAgency="removeAgency"
      :suspend="suspend"
      :activate='activateAgency'
    />
  </SearchWithPagination>
</template>