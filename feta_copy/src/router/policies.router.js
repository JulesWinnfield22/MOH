export default [
  {
    path: "/policies/:type(issued?)?",
    component: () => import("@/features/policies/pages/Policies.vue"),
  },
  {
    path: "/policies/:type(amend|cancel)",
    component: () => import("@/features/policies/pages/AmendPolicies.vue"),
  },
  {
    path: "/policy_wording/:id",
    component: () => import("@/features/policies/pages/PolicyWording.vue"),
  },
];
