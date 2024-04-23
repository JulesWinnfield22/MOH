export default [
  {
    path: "/registered_claims",
    component: () => import("@/features/claims/pages/RegisteredClaims.vue"),
  },
  {
    path: "/requested_claims",
    component: () => import("@/features/claims/pages/RequestedClaims.vue"),
  },
  {
    path: "/process_claims",
    component: () => import("@/features/claims/pages/ReviewedClaims.vue"),
  },
  {
    path: "/approve_claims",
    component: () => import("@/features/claims/pages/ApprovedClaims.vue"),
  },
  {
    path: "/declined_claims",
    component: () => import("@/features/claims/pages/DeclinedClaims.vue"),
  },
  {
    path: "/authorize_claims",
    component: () => import("@/features/claims/pages/AuthorizeClaim.vue"),
  },
  {
    path: "/approve_claim_detail/:id",
    component: () => import("@/features/claims/pages/ApproveClaimDetail.vue"),
  },
  {
    path: "/claims_payment",
    component: () => import("@/features/claims/pages/ClaimPayment.vue"),
  },
  {
    path: "/paid_claims",
    component: () => import("@/features/claims/pages/PaidClaims.vue"),
  },
  {
    path: "/create_claims",
    component: () => import("@/features/claims/pages/CreateClaim.vue"),
  },
  {
    path: "/saved_claims",
    component: () => import("@/features/claims/pages/SavedClaims.vue"),
  },
  {
    path: "/authorized_claims",
    component: () => import("@/features/claims/pages/AuthorizedClaim.vue"),
  },
  {
    path: "/claim_detail/:id",
    component: () => import("@/features/claims/components/ClaimDetail.vue"),
  },
  {
    path: "/payment_order/:insuredId/:claimId",
    component: () => import("@/features/claims/components/PaymentOrder.vue"),
  },
  {
    path: "/decliened_claim_detail/:id",
    component: () => import("@/features/claims/components/DetailClaim.vue"),
  },
  {
    path: "/requested_claim_detail/:id",
    component: () => import("@/features/claims/pages/RequestedClaimDetail.vue"),
  },
  {
    path: "/authorize_claim_detail/:id",
    component: () => import("@/features/claims/pages/AuthorizeClaimDetail.vue"),
  },
  {
    path: "/payment_order_voucher/:insuredId/:claimId",
    component: () => import("@/features/claims/pages/ClaimPaymentVoucherPdf.vue"),
  },
];
