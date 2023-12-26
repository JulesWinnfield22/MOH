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
    name: 'Package Management',
    icon: 'oi-package',
    path: '/packages',
    children: [
      {
        path: '/add_package',
        name: 'Add Package',
        icon: 'fa-plus'
      },
      {
        path: '/edit_packages',
        name: 'Edit Package',
        icon: 'md-modeedit-round'
      },
      {
        path: '/canche_packages',
        name: 'Cancel Package',
        icon: 'gi-cancel'
      },
      {
        path: '/cancel_packages',
        name: 'Remove Package',
        icon: 'fa-trash-alt'
      }
    ]
  },
  {
    name: 'Insured Persons',
    icon: 'co-healing',
    path: '/insured_persons',
    children: []
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
    path: '/insurance_term_policy',
    icon: 'md-corporatefare',
    name: 'Insurance Term Policy'
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
        Life And Medical insurance
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