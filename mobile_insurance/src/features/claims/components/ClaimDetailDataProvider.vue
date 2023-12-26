<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { authorizeClaim, getClaimService, getClaimAttachements, getClaimDetail, registerClaim } from '@/features/claims/api/claimsApi'
  import { approveClaim, denyClaim, reviewClaim } from '@/features/claims/api/claimsApi'
  import { toasted } from '@/utils/utils';
  import { updateClaimPayment } from '@/features/claims/api/claimsApi'

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  
  const detailReq = useApiRequest()
  const statusRequest = useApiRequest()

  const response = {
    success: true,
    data: '',
    status: 200,
    error: ''
  }

  async function fetchDetail() {
    const res = await Promise.all([getClaimService(props.id), getClaimDetail(props.id), getClaimAttachements(props.id)])

    const formated = res.reduce((responses, res, idx) => {
      if(!res.success) {
        response.success = false
        response.status = res.status
      }
      if(idx == 0) {
        responses.services = res.data
      } else if(idx == 1) {
        responses.details = res.data
      } else if(idx == 2) {
        responses.attachements = res.data
      }

      return responses
    }, {
      attachements: [],
      services: [],
      details: {}
    })

    response.data = formated

    return response
  }

  function getDetail() {
    detailReq.send(
      () => fetchDetail()
    ),
    res => {
    }
  }

  getDetail()

  function review(id) {
  if(statusRequest.pending.value) return 

  statusRequest.send(
    () => reviewClaim(id),
    res => {
      if(res.success) {
        detailReq.response.value.details.reviewedByStatus = 'Reviewed'
      }
      toasted(res.success, 'Reviewed successfully', 'couldnt approve try again.')
    }
  )
}

function deny(data) {
  console.log(data)
  if(statusRequest.pending.value) return 

  statusRequest.send(
    () => denyClaim(data),
    res => {
      toasted(res.success, 'Denied successfully', 'unable to deny claim. try again.')
    }
  )
}

function approve(data) {
  if(statusRequest.pending.value) return 

  statusRequest.send(
    () => approveClaim(data),
    res => {
      if(res.success) {
        detailReq.response.value.details.approvedByStatus = 'Approved'
      }
      toasted(res.success, 'approved successfully', 'couldnt approve try again.')
    }
  )
}

function authorize(id) {
  if(statusRequest.pending.value) return 

  statusRequest.send(
    () => authorizeClaim(id),
    res => {
      if(res.success) {
        detailReq.response.value.details.authorizedByStatus = 'Authorized'
      }
      toasted(res.success, 'authorized successfully', 'couldnt authorize try again.')
    }
  )
}

function register(id) {
  if(statusRequest.pending.value) return 

  statusRequest.send(
    () => registerClaim(id),
    res => {
      if(res.success) {
        detailReq.response.value.details.claimNumber = true
      }
      toasted(res.success, 'registered successfully', 'couldnt register try again.')
    }
  )
}

function updatePayment(value) {
  console.log(value)
  if(value.amount) {
    statusRequest.send(
      () => updateClaimPayment(value),
      res => {
        if(res.success) {
          let idx = detailReq.response.value.services.findIndex(el => {
            if(el.benefitProvidedUuid == value.benefitProvidedUuid) {
              return true
            }
            return false
          })

          if(idx != -1) {
            console.log('thi si shit')
            detailReq.response.value.services[idx].amount = value.amount
          }

        }
        toasted(res.success, 'updated successfully', 'couldnt update. try again.')
      }
    )
  }
}
</script>
<template>
  <slot
    :updatePayment="updatePayment"
    :review="review"
    :approve="approve"
    :deny="deny"
    :authorize="authorize"
    :register="register"
    :details="detailReq.response.value || {}"
    :pending="detailReq.pending.value"
    :error="detailReq.error.value"
  />
</template>