import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@layout/Main.vue'
import NotFound from '@pages/NotFound.vue'
import Login from '@pages/Login.vue'
import Forbidden from '@pages/Forbidden.vue'
import { useAuth } from '@store/auth'
import privilages from '@/config/routePrivilages.js'
import Certificate from '../features/certificate/pages/Certificate.vue'
import agencyRouter from './agency.router'
import requestsRouter from './requests.router'
import branchRouter from './branch.router'
import policiesRouter from './policies.router'
import userRouter from './users.router'
import privilegeRouter from './privilege.router'
import rolesRouter from './roles.router'
import claimsRouter from './claims.router'
import reportRouter from './report.router'
import CertificatePdf from '@/features/certificate/pages/CertificatePdf.vue'

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
        ...agencyRouter,
        ...requestsRouter,
        ...branchRouter,
        ...policiesRouter,
        ...userRouter,
        ...privilegeRouter,
        ...rolesRouter,
        ...claimsRouter,
        ...reportRouter,
        {
          path: '/certificate/:id/:agencyId',
          component: () => import('@/features/certificate/pages/CertificatePdf.vue')
        },
        {
          path: '/certificatePdf/:id/:agencyId',
          component: () => import('@/features/certificate/pages/CertificatePdf.vue')
        },
      ]
    },
    {
      path: '/member_detail/certificate/:id/:agencyId',
      component: Certificate
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
    return to.meta.privilages?.includes(privilage)
  })

  if(found)
    return true
  
  return {
    path: '/forbidden',
  } 
})

export default router
