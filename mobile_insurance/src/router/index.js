import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@pages/Home.vue'
import MainLayout from '@layout/Main.vue'
import NotFound from '@pages/NotFound.vue'
import Login from '@pages/Login.vue'
import Forbidden from '@pages/Forbidden.vue'
import { useAuth } from '@store/auth'
import privilages from '@/config/routePrivilages.js'
import InsuranceTermPolicy from '@/features/insurance_term_policy/pages/InsuranceTermPolicy.vue'
import claimsRouter from './claims.router'
import insuredRouter from './insured.router'
import packagesRouter from './packages.router'
import reportRouter from './report.router'

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
          path: '/insurance_term_policy',
          component: InsuranceTermPolicy
        },
        ...reportRouter,
        ...claimsRouter,
        ...insuredRouter,
        ...packagesRouter
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
  return true
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
    return to.meta.privilages?.includes(privilage)
  })

  if(found)
    return true
  
  return {
    path: '/forbidden',
  } 
})

export default router
