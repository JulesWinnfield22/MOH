<script setup>
  import { getRequestedPerson } from '@/features/reqeusts/api/requestsApi' 
  import { getAgencyById } from '@/features/agencies/api/agenciesApi'
  import { useApiRequest } from '@/composables/useApiRequest';

  const props = defineProps({
    userId: {
      type: String,
      required: true
    },
    agencyId: {
      type: String,
      required: true
    }
  })

  const req = useApiRequest()

  const response = {
    data: '',
    success: true,
  }

  async function getCertificateData() {
    let res = await Promise.all([getRequestedPerson(props.userId), getAgencyById(props.agencyId)])

    response.data = {
      insured: res[0]?.data,
      agency: res[1]?.data,
    }
    response.success = true
    return response
  }

  req.send(
    () => getCertificateData(),
    res => {
      console.log(res)
    }
  )
</script>

<template>
  {{ console.log(req.response.value) }}
  <slot
    :insured="req.response.value?.insured"
    :agency="req.response.value?.agency"
    :pending="req.pending.value"
  />
</template>