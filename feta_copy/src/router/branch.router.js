export default [
  {
    path: "/branch/:type?",
    component: () => import("@/features/branch/pages/Insurances.vue"),
  },
  {
    path: "/create_branch",
    component: () => import("@/features/branch/components/form/AddBranchForm.vue"),
  },
];
