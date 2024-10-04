import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from './store/auth.js';
import Dashboard from './views/Dashboard.vue';
import University from './views/University.vue';
import Contract from './views/Contract.vue';
import Login from './views/Login.vue';
import MoHLegal from './views/MoHLegal.vue';
import AllStudent from './features/allStudent/pages/AllStudent.vue';
import StudentIndex from './features/allStudent/pages/StudentIndex.vue';
import HRDI from './views/HRDI.vue';
import SigninDocuments from './views/SigninDocuments.vue';
import Requirements from './views/Requirements.vue';
import Requirement from './views/Requirement.vue';
import Sponsorship from './views/Sponsorship.vue';
import Status from './views/Status.vue';
import Students from '@/features/students/pages/Students.vue';
import StudentActions from '@/features/students/pages/StudentActions.vue';
import Contracts from '@/features/students/pages/Contracts.vue';
import Batches from '@/features/students/pages/batchTable.vue';
import ContractsApproved from '@/features/students/pages/contractsApp.vue';
import ContractsDeclined from '@/features/students/pages/contractsDec.vue';
import Users from './features/users/pages/Users.vue';
import UsersIndex from './features/users/pages/UsersIndex.vue';
import AddUsers from './features/users/pages/AddUsers.vue';
import AddStudents from './views/AddStudents.vue';

import Profile from './views/Profile.vue';
import Verification from './features/verification/pages/Verification.vue';
import VerificationReset from './features/verification/pages/VerificationReset.vue';
import Privileges from './features/privilege/pages/Privlege.vue';
import ContractFile from './features/students/pages/ContractFile.vue';
import EditContractForm from './views/EditContractForm.vue';
import MainLayout from './layout/MainLayout.vue';
import PrivilegeIndex from './features/privilege/pages/PrivilegeIndex.vue';
import AddPrivilege from './features/privilege/pages/AddPrivilege.vue';
import Role from './features/roles/pages/Role.vue';
import AddRole from './features/roles/pages/AddRole.vue';
import RoleIndex from './features/roles/pages/RoleIndex.vue';
import UpdatePrivilege from './features/privilege/pages/UpdatePrivilege.vue';
import UpdateRole from './features/roles/pages/UpdateRole.vue';

const routes = [
  {
    path: '',
    component: MainLayout,
    name: 'Dashboard',
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/Profile',
        name: 'Profile',
        component: Profile,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/University',
        name: 'University',
        component: University,
        meta: {
          requiresAuth: true,
          privileges: ['HRDI'],
        },
      },
      {
        path: '/Contract',
        name: 'Contract',
        component: Contract,
        meta: {
          requiresAuth: true,
          privileges: ['HRDI'],
        },
      },
      {
        path: '/StudentActions',
        name: 'studentActions',
        component: StudentActions,
        meta: {
          requiresAuth: true,
          privileges: ['University'],
        },
      },
      {
        path: '/students',
        name: 'students',
        component: Students,
        meta: {
          requiresAuth: true,
          privileges: ['University'],
        },
      },
      {
        path: '/contracts',
        name: 'contracts',
        component: Contracts,
        meta: {
          requiresAuth: true,
          privileges: ['LegalOffice'],
        },
      },
      {
        path: '/hrdi/student-batch/:batchId',
        name: 'student batch',
        component: Batches,
        meta: {
          requiresAuth: true,
          privileges: ['HRDI'],
        },
      },

      {
        path: '/contractsApp',
        name: 'contractsApproved',
        component: ContractsApproved,
        meta: {
          requiresAuth: true,
          privileges: ['LegalOffice'],
        },
      },
      {
        path: '/contractsDec',
        name: 'contractsDeclined',
        component: ContractsDeclined,
        meta: {
          requiresAuth: true,
          privileges: ['LegalOffice'],
        },
      },
      {
        path: '/contract-file/:contractId',
        name: 'contracts file',
        component: ContractFile,
        meta: {
          requiresAuth: true,
          privileges: ['LegalOffice'],
        },
      },
      {
        path: '/university/students/:uniId',
        name: 'University Students',
        component: Students,
        meta: {
          requiresAuth: true,
          privileges: ['HRDI'],
        },
      },
      {
        path: '/MoHLegal',
        name: 'MoHLegal',
        component: MoHLegal,
        meta: {
          requiresAuth: true,
          privileges: ['LegalOffice'],
        },
      },
      {
        path: '/HRDI',
        name: 'HRDI',
        component: HRDI,
        meta: {
          requiresAuth: true,
          privileges: ['HRDI'],
        },
      },
      {
        path: '/users',
        name: 'Users',
        component: UsersIndex,
        meta: {
          requiresAuth: true,
          privileges: ['HRDI'],
        },
        children: [
          {
            path: '',
            name: 'Users',
            component: Users,
          },
          {
            path: 'add',
            name: 'Add User',
            component: AddUsers,
          },
        ],
      },
      {
        path: '/AddStudents/:batchId',
        name: 'Add Student',
        component: AddStudents,
      },
      {
        path: '/Status',
        name: 'Status',
        component: Status,
        meta: {
          requiresAuth: true,
          privileges: ['Student'],
        },
      },
      {
        path: '/Requirements',
        name: 'Requirements',
        component: Requirements,
        meta: {
          requiresAuth: true,
          privileges: ['Student'],
        },
      },
      {
        path: '/Requirement',
        name: 'Requirement',
        component: Requirement,
        meta: {
          requiresAuth: true,
          privileges: ['Student'],
        },
      },
      {
        path: '/Sponsorship',
        name: 'Sponsorship',
        component: Sponsorship,
        meta: {
          requiresAuth: true,
          privileges: ['Student', 'HRDI'],
        },
      },
      {
        path: '/allStudents',
        name: 'Students',
        component: StudentIndex,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: '',
            name: 'Students',
            component: AllStudent,
          },
        ],
      },
      {
        path: '/SigninDocuments',
        name: 'SigninDocuments',
        component: SigninDocuments,
        meta: {
          requiresAuth: true,
          privileges: ['Student'],
          status: 'registered',
        },
      },
      {
        path: '/privileges',
        name: 'Privileges',
        component: PrivilegeIndex,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: '',
            name: 'Privileges',
            component: Privileges,
          },
          {
            path: 'add_privilege',
            name: 'Add Privileges',
            component: AddPrivilege,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: 'update_privilege/:privilegeUuid',
            name: 'Update Privileges',
            component: UpdatePrivilege,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },

      {
        path: '/roles',
        name: 'Roles',
        component: RoleIndex,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: '',
            name: 'Roles',
            component: Role,
          },
          {
            path: 'add_role',
            name: 'Add Role',
            component: AddRole,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: '/update_role/:roleUuid',
            name: 'Upadet Role',
            component: UpdateRole,
            meta: {
              requiresAuth: true,
              permissions: [],
            },
          },
        ],
      },

      {
        path: '/editsignindocuments',
        name: 'EditSigninDocuments',
        component: EditContractForm,
        meta: {
          requiresAuth: true,
          privileges: ['Student'],
          status: 'registered',
        },
      },
    ],
  },
  {
    path: '/verification',
    name: 'verification',
    component: Verification,
    meta: { layout: 'empty' },
  },
  {
    path: '/',
    redirect: '/login', // Redirect from root path to /login
  },
  {
    path: '/verificationReset',
    name: 'verificationReset',
    component: VerificationReset,
    meta: { layout: 'empty' },
  },
  {
    path: '/',
    redirect: '/login', // Redirect from root path to /login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const auth = useAuth();

  if (!auth.auth?.accessToken) {
    let detiail = localStorage.getItem('userDetail');
    if (detiail) {
      detiail = JSON.parse(detiail);
      auth.setAuth({
        user: detiail,
        accessToken: detiail?.token,
      });
    }
  }

  if (to.path == '/login' && auth.auth?.accessToken) {
    return {
      path: from.path,
    };
  }

  if (
    !to.meta?.requiresAuth ||
    auth.auth?.user?.privileges?.includes('All Privileges') ||
    auth.auth?.user?.roleName === 'Super Admin'
  ) {
    let detiail = localStorage.getItem('userDetail');
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
    (auth.auth?.user?.roleName &&
      to.meta?.role &&
      auth.auth?.user?.roleName == to.meta?.role) ||
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
    path: '/forbidden',
  };
});
export default router;
