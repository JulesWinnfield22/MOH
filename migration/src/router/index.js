import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@layout/Main.vue'
import NotFound from '@pages/NotFound.vue'
import Users from '@users/pages/Users.vue'
import Roles from '@roles/pages/Roles.vue'
import Privileges from '@privilege/pages/Privileges.vue'
import Login from '@pages/Login.vue'
import Forbidden from '@pages/Forbidden.vue'
import { useAuth } from '@store/auth'
import privilages from '@/config/routePrivilages.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      meta: {
        requiresAuth: true,
        privilages: privilages.home
      },
      children: [
        {
          path: "",
          name: 'home',
          component: HomeView,
        },
        {
          path: 'user_management',
          component: Users,
        },
        {
          path: 'role_management',
          component: Roles,
        },
        {
          path: 'privileges',
          component: Privileges,
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/forbidden',
      component: Forbidden
    },
    {
      path: '/:path()*',
      component: NotFound
    },
  ]
})

router.beforeEach(async (to, from) => {
  const auth = useAuth()
  if(to.path == '/login' && auth.auth?.accessToken) {
    return {
      path: from.path
    }
  }
  
  if(!to.meta.requiresAuth || auth.auth?.user?.privileges?.includes('All Privileges')) return true

  if(!auth.auth?.accessToken) {
    return {
      path: `/login`,
      query: {
        redirect: to.path
      }
    }
  }

  let privileges = auth.auth.user.privileges
  
  const found = privileges?.find(privilage => {
    console.log(privilage, to.meta.privilages?.includes(privilage))
    return to.meta.privilages?.includes(privilage)
  })

  if(found)
    return true
  
  return {
    path: '/forbidden',
  } 
})

export default router
