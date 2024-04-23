export default [
  {
    path: "/privileges/:type?",
    component: () => import("@privilege/pages/Privileges.vue"),
  },
  {
    path: "/create_privilege",
    component: () => import("@privilege/components/form/AddPrivilagForm.vue"),
  },
];
