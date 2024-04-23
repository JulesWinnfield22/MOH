export default [
  {
    path: "/agencies/suspend",
    component: () => import("@agencies/pages/SuspendedAgencies.vue"),
  },
  {
    path: "/agencies/remove",
    component: () => import("@agencies/pages/RemoveAgency.vue"),
  },
  {
    path: "/agencies/:type?",
    component: () => import("@agencies/pages/Agencies.vue"),
  },
  {
    path: "/add_agency",
    component: () => import("@agencies/components/form/AddAgencyForm.vue"),
  },
];
