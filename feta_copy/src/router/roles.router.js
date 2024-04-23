export default [
  {
    path: "/roles/:type?",
    component: () => import("@roles/pages/Roles.vue"),
  },
  {
    path: "/create_role",
    component: () => import("@roles/components/form/AddRoleForm.vue"),
  },
];
