<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { authorizeClaim, getClaimService, getClaimAttachements, getClaimDetail, registerClaim } from '@/features/claims/api/claimsApi'
  import { approveClaim, denyClaim, reviewClaim } from '@/features/claims/api/claimsApi'
  import { allRequest, toasted } from '@/utils/utils';
  import { updateClaimPayment } from '@/features/claims/api/claimsApi'
  import { getClaimLog } from '../api/claimLogApi';

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  
  const detailReq = useApiRequest()
  const statusRequest = useApiRequest()

  function getDetail() {
    detailReq.send(
      () => allRequest({
        attachements: getClaimAttachements(props.id),
        services: getClaimService(props.id),
        details: getClaimDetail(props.id),
        logs: getClaimLog(props.id),
      })
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