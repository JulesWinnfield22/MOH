import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './store/auth.js'
import Dashboard from './views/Dashboard.vue'
import University from './views/University.vue'
import Login from './views/Login.vue'
import MoHLegal from './views/MoHLegal.vue'
import HRDI from './views/HRDI.vue'
import Resident from './views/Resident.vue'
import Students from '@/features/students/pages/Students.vue'
import Users from './features/users/pages/Users.vue'
import UsersIndex from './features/users/pages/UsersIndex.vue'
import AddUsers from './features/users/pages/AddUsers.vue'
import Signup from './views/signup.vue'
import Profile from './views/Profile.vue'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
    meta: { layout: 'empty' },
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/University',
    name: 'University',
    component: University,
    meta: {
      requiresAuth: true,
      privileges: ['HRDI',]
    }
  },
  {
    path: '/students',
    name: 'students',
    component: Students,
    meta: {
      requiresAuth: true,
      privileges: ['University',]
    }
  },
  {
    path: '/students/:uniId',
    name: 'University Students',
    component: Students,
    meta: {
      requiresAuth: true,
      privileges: ['HRDI',]
    }
  },
  {
    path: '/MoHLegal',
    name: 'MoHLegal',
    component: MoHLegal,
    meta: {
      requiresAuth: true,
      privileges: ['LegalOffice']
    }
  },
  {
    path: '/HRDI',
    name: 'HRDI',
    component: HRDI,
    meta: {
      requiresAuth: true,
      privileges: ['HRDI']
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersIndex,
    meta: {
      requiresAuth: true,
      privileges: ['HRDI']
    },
    children: [
      {
        path: '',
        name: 'Users',
        component: Users
      },
      {
        path: 'add',
        name: 'Add User',
        component: AddUsers
      }
    ]
  },
  {
    path: '/Resident',
    name: 'Resident',
    component: Resident,
    meta: {
      requiresAuth: true,
      privileges: ['Student']
    }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const auth = useAuth();
  
  if(!auth.auth?.accessToken) {
    let detiail = localStorage.getItem("userDetail");
    if (detiail) {
      detiail = JSON.parse(detiail);
      auth.setAuth({
        user: detiail,
        accessToken: detiail?.token,
      });
    }
  }

  if (to.path == "/login" && auth.auth?.accessToken) {
    return {
      path: from.path,
    };
  }

  if (
    !to.meta?.requiresAuth ||
    auth.auth?.user?.privileges?.includes("All Privileges") ||
    auth.auth?.user?.roleName === "Super Admin"
  ) {
    let detiail = localStorage.getItem("userDetail");
    if (detiail) {
      detiail = JSON.parse(detiail);
      auth.setAuth({
        user: detiail,
        accessToken: detiail?.token,
      });
    }
    return true;
  }

  if (!auth.auth?.accessToken) {
    return {
      path: `/login`,
      query: {
        redirect: to.path,
      },
    };
  }

  if (
    (auth.auth?.user?.roleName && to.meta?.role && (auth.auth?.user?.roleName == to.meta?.role)) ||
    (!to.meta?.role && !to.meta?.privileges && to.meta?.requiresAuth)
  ) {
    return true;
  }

  let privileges = auth.auth.user?.privileges;

  const found = (to.meta?.privileges || []).find((privilage) => {
    return privileges?.includes(`ROLE_${privilage}`);
  });

  if (found) return true;

  return {
    path: "/forbidden",
  };
});
export default router
