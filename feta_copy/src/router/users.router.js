export default [
  {
    path: "/users/:type?",
    component: () => import("@users/pages/Users.vue"),
  },
  {
    path: "/create_user",
    component: () =>
      import("@/features/user_management/components/forms/AddUserForm.vue"),
  },
];
