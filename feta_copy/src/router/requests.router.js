export default [
  {
    path: "/requested_certificates",
    component: () => import("../features/reqeusts/pages/Requets.vue"),
  },
  {
    path: "/requestes/approved",
    component: () => import("../features/reqeusts/pages/Requets.vue"),
  },
  {
    path: "/requestes/reviewed",
    component: () => import("../features/reqeusts/pages/Requets.vue"),
  },
  {
    path: "/requestes/reviewed",
    component: () => import("../features/reqeusts/pages/Reviewed.vue"),
  },
  {
    path: "/requested_debit_advice/payed",
    component: () => import("../features/reqeusts/pages/Payed.vue"),
  },
  {
    path: "/requested_certificates/detail/:id/:status",
    component: () =>
      import("../features/reqeusts/pages/ViewDetailRequests.vue"),
  },
  {
    path: "/reviewed/detail/:id/:status",
    component: () =>
      import("../features/reqeusts/pages/ViewDetailRequests.vue"),
  },
  {
    path: "/approved/detail/:id/:status",
    component: () =>
      import("../features/reqeusts/pages/ViewDetailRequests.vue"),
  },
  {
    path: "/debited_advice/detail/:id/:status",
    component: () => import("../features/reqeusts/pages/Debited.vue"),
  },
  {
    path: "/issued_certificate_detail/detail/:id/:status",
    component: () => import("../features/reqeusts/pages/Debited.vue"),
  },
  {
    path: "/debit_advice/:id",
    component: () => import("../features/reqeusts/pages/DebitAdvicePdf.vue"),
  },
  {
    path: "/advice/:id",
    component: () => import("../features/reqeusts/pages/DebitAdvicePdf.vue"),
  },
  {
    path: "/issued_certificates/issued",
    component: () =>
      import("../features/reqeusts/pages/IssuedCertificates.vue"),
  },
  {
    path: "/issued_voucher_certificate_detail/:id",
    component: () => import("@/features/reqeusts/pages/VoucherPdf.vue"),
  },
  {
    path: "/voucher/:id",
    component: () => import("@/features/reqeusts/pages/VoucherPdf.vue"),
  },
  {
    path: "/new_certificate",
    component: () => import("@/features/certificate/pages/NewCertificate.vue"),
  },
];
