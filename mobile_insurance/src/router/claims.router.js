import RegisteredClaims from '@/features/claims/pages/RegisteredClaims.vue'
import RequestedClaims from '@/features/claims/pages/RequestedClaims.vue'
import ReviewedClaims from '@/features/claims/pages/ReviewedClaims.vue'
import ApprovededClaims from '@/features/claims/pages/ApprovedClaims.vue'
import DeclinedClaims from '@/features/claims/pages/DeclinedClaims.vue'
import AuthorizeClaim from '@/features/claims/pages/AuthorizeClaim.vue'
import ApproveClaimDetail from '@/features/claims/pages/ApproveClaimDetail.vue'
import ClaimPayment from '@/features/claims/pages/ClaimPayment.vue'
import PaidClaims from '@/features/claims/pages/PaidClaims.vue'
import AddClaimForm from '@/features/claims/components/form/AddClaimForm.vue'
import AuthorizedClaim from '@/features/claims/pages/AuthorizedClaim.vue'
import ClaimDetail from '@/features/claims/components/ClaimDetail.vue'
import DetailClaim from '@/features/claims/components/DetailClaim.vue'
import RequestedClaimDetail from '@/features/claims/pages/RequestedClaimDetail.vue'
import AuthorizeClaimDetail from '@/features/claims/pages/AuthorizeClaimDetail.vue'

export default [
  {
    path: "/registered_claims",
    component: RegisteredClaims
  },
  {
    path: "/requested_claims",
    component: RequestedClaims
  },
  {
    path: "/process_claims",
    component: ReviewedClaims
  },
  {
    path: "/approve_claims",
    component: ApprovededClaims
  },
  {
    path: "/declined_claims",
    component: DeclinedClaims
  },
  {
    path: "/claims_payment",
    component: ClaimPayment
  },
  {
    path: "/create_claims",
    component: AddClaimForm
  },
  {
    path: "/authorize_claims",
    component: AuthorizeClaim
  },
  {
    path: "/paid_claims",
    component: PaidClaims
  },
  {
    path: "/authorized_claims",
    component: AuthorizedClaim
  },
  {
    path: "/claim_detail/:id",
    component: ClaimDetail
  },
  {
    path: "/approve_claim_detail/:id",
    component: ApproveClaimDetail
  },
  {
    path: "/authorize_claim_detail/:id",
    component: AuthorizeClaimDetail
  },
  {
    path: "/requested_claim_detail/:id",
    component: RequestedClaimDetail
  },
  {
    path: "/decliened_claim_detail/:id",
    component: DetailClaim
  }
]