<script setup>
import { name } from '@/../package.json'
import { ref, watch } from 'vue'
import IconButton from '@com/IconButton.vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const opened = ref(route.path)

const routes = ref([
  {
    name: "Dashboad",
    path: "/",
    icon: "md-dashboard-outlined",
    privilage: ['super admin']
  },
  {
    name: "Agency Management",
    path: '/agencies',
    icon: 'md-homework-round',
    privilage: ['super admin'],
    children: [
      {
        icon: 'fa-plus',
        path: '/add_agency',
        name: "Add Agency",
      },
      {
        icon: 'md-modeedit-round',
        path: '/agencies/edit',
        name: "Edit Agency",
      },
      {
        icon: 'gi-cancel',
        path: '/agencies/suspend',
        name: "Suspend Agency",
      },
      {
        icon: 'fa-trash-alt',
        path: '/agencies/remove',
        name: 'Remove Agency'
      }
    ]
  },
  // {
  //   name: 'Requested Policies',
  //   path: '/reqeustes',
  //   icon: 'io-git-pull-request-outline',
  //   privilage: ['super admin']
  // },
  {
    name: 'Policy Management',
    path: '/policies',
    icon: 'la-certificate-solid',
    privilage: ['super admin'],
    children: [
      {
        icon: 'md-upcoming-round',
        path: '/policies/issued',
        name: 'New Policies'
      },
      {
        path: '/policies/amend',
        name: 'Issued Policies',
        icon: 'bi-check2'
      },
      {
        path: '/policies/cancel',
        name: 'Cancle Policy',
        icon: 'gi-cancel'
      }
    ]
  },
  {
    name: 'Certificate Management',
    path: '/requested_certificates',
    icon: 'la-certificate-solid',
    privilage: ['super admin'],
    children: [
      {
        path: '/new_certificate',
        name: 'New Certificate',
        icon: 'gi-power-generator'
      },
      {
        icon: 'bi-eye-fill',
        path: '/requested_certificates',
        name: 'Requested Certificates'
      },
      // {
      //   icon: 'bi-check2-all',
      //   path: '/requestes/reviewed',
      //   name: 'Quotations (to be deleted)'
      // },
      {
        icon: 'bi-cash',
        path: '/requested_debit_advice/payed',
        name: 'Payment'
      },
      {
        icon: 'fa-certificate',
        path: '/issued_certificates/issued',
        name: 'Issued Certificates'
      }
    ]
  },
  // {
  //   name: 'Create Certificate',
  //   path: '/certificate',
  //   icon: 'la-certificate-solid',
  //   privilage: ['super admin']
  // },
  {
    path: '/requested_claims',
    name: 'Claims Management',
    icon: 'si-acclaim',
    children: [
      // {
      //   path: '/registered_claims',
      //   name: 'Registered Claims',
      //   icon: 'md-pendingactions'
      // },
      {
        path: '/create_claims',
        name: 'Create Claim',
        icon: 'md-createnewfolder-outlined'
      },
      {
        path: '/saved_claims',
        name: 'Saved Claims',
        icon: 'io-save'
      },
      {
        path: '/requested_claims',
        name: 'Requested Claims',
        icon: 'bi-eye-fill'
      },
      {
        path: '/process_claims',
        name: 'Proccess Claims',
        icon: 'gi-processor'
      },
      {
        path: '/approve_claims',
        name: 'Approve Claims',
        icon: 'bi-check2-all'
      },
      {
        path: '/authorize_claims',
        name: 'Authorize Claims',
        icon: 'bi-check2-all'
      },
      {
        path: '/authorized_claims',
        name: 'Pay Claims',
        icon: 'bi-check2-all'
      },
      // {
      //   path: '/claims_payment',
      //   name: 'Claim Payment',
      //   icon: 'bi-cash'
      // },
      {
        path: '/paid_claims',
        name: 'Paid Claims',
        icon: 'bi-cash'
      },
      {
        path: '/declined_claims',
        name: 'Declined Claims',
        icon: 'gi-cancel'
      },
    ]
  },
  {
    path: '/branch',
    icon: 'oi-git-branch',
    name: 'Branches Management',
    children: [
      {
        icon: 'fa-plus',
        path: '/create_branch',
        name: "Create Branch",
      },
      {
        icon: 'md-modeedit-round',
        path: '/branch/edit',
        name: "Edit Branch",
      },
      {
        icon: 'gi-cancel',
        path: '/branch/suspend',
        name: "Suspend Branch",
      },
      {
        icon: 'fa-trash-alt',
        path: '/branch/remove',
        name: 'Remove Branch'
      }
    ]
  },
  {
    name: 'Roles',
    path: '/roles',
    icon: 'co-open-access',
    privilage: ['super admin'],
    children: [
      {
        icon: 'fa-plus',
        path: '/create_role',
        name: "Create Role",
      },
      {
        icon: 'md-modeedit-round',
        path: '/roles/edit',
        name: "Edit Role",
      },
      {
        icon: 'gi-cancel',
        path: '/roles/suspend',
        name: "Suspend Role",
      },
      {
        icon: 'fa-trash-alt',
        path: '/roles/remove',
        name: 'Remove Role'
      }
    ]
  },
  {
    name: 'Users',
    path: '/users',
    icon: 'pr-user',
    privilage: ['super admin'],
    children: [
      {
        icon: 'fa-plus',
        path: '/create_user',
        name: "Create User",
      },
      {
        icon: 'md-modeedit-round',
        path: '/users/edit',
        name: "Edit User",
      },
      {
        icon: 'gi-cancel',
        path: '/users/suspend',
        name: "Suspend User",
      },
      {
        icon: 'fa-trash-alt',
        path: '/users/remove',
        name: 'Remove User'
      }
    ]
  },
  {
    name: 'Privileges',
    path: '/privileges',
    icon: 'la-certificate-solid',
    privilage: ['super admin'],
    children: [
      {
        icon: 'fa-plus',
        path: '/create_privilege',
        name: "Create Privilege",
      },
      {
        icon: 'md-modeedit-round',
        path: '/privileges/edit',
        name: "Edit Privilege",
      },
      {
        icon: 'gi-cancel',
        path: '/privileges/suspend',
        name: "Suspend Privilege",
      },
      {
        icon: 'fa-trash-alt',
        path: '/privileges/remove',
        name: 'Remove Privilege'
      }
    ]
  },
  {
    path: '/report',
    icon: 'hi-solid-document-report',
    name: 'Report',
    children: [
      {
        path: '/report',
        name: 'Marketing',
        icon: 'gi-chart'
      },
      {
        path: '/report',
        name: 'Underwriting',
        icon: 'md-controlcamera-round'
      },
      {
        path: '/report',
        name: 'Claim',
        icon: 'si-acclaim'
      },
      {
        path: '/report',
        name: 'Finance',
        icon: 'io-cash-outline'
      },
    ]
  }
  // {
  //   name: 'Insurance Documents',
  //   path: '/insurance_documents',
  //   icon: 'oi-package'
  // }
]);

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

function logout() {
  localStorage.clear && localStorage.clear()
  location.href = '/login'
}

</script>
<template>
  <div class="relative h-full w-full overflow-y-scroll bg-sidebar-clr z-20">
    <div
      :class="[open ? 'h-[12rem]' : 'z-0 h-topnav-height']"
      class="px-2 z-30 flex-col gap-2 sticky top-0 bg-sidebar-clr flex items-center transition-all duration-500 ease-in-out">
      <div v-if="open" class="w-32 h-32">
        <img src="../assets/logo.png" />
      </div>
      <p v-if="open" class="truncate text-primary uppercase whitespace-nowrap font-bold text-lg overflow-hidden">
        Nyala insurance
      </p>
    </div>
    <div class="relative z-20 bg-sidebar-clr">
      <ul class="h-full">
        <li :key="rt.name" v-for="rt in routes" class="font-medium flex flex-col w-full text-sm">
          <IconButton :title="rt.name" @click="() => {
            router.push(rt.path)
            opened = rt.path
          }" :class="[(route.path == rt.path || rt.children?.find(el => route.path.includes(el.path))) && 'router-link-active']" :icon="rt.icon" :text="rt.name " />
          <div v-if="open && (opened == rt.path || rt.children?.find(el => el.path == opened))" :class="[open ? 'pl-[1.4rem]' : '']" class="transition-all duration-200 ease-linear bg-secondary overflow-hidden" >
            <div :class="[open ? 'border-l border-primary' : '']" class="flex flex-col gap-1">
              <button :class="[open ? 'shadow' : '', route.path == child.path && 'router-link-active']" @click="router.push(child.path)" class="flex items-center p-2 px-4 font-medium h-full text-left" :key="child.name" v-for="child in rt.children">
                <div class="flex items-center justify-center w-8 h-8">
                  <h-icon :name="child.icon" />
                </div>
                <p class="text-sm font-normal truncate">
                  {{ child.name }}
                </p>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <button @click="logout" class="flex items-center justify-center sticky bottom-0 text-white w-full h-10 text-lg z-20 bg-primary">
        <div class="min-w-[3rem] h-12 flex justify-center items-center">
          <h-icon name="hi-logout" />
        </div>
        <span class="truncate">Logout</span>
      </button>
    </div>
  </div>
</template>