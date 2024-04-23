<script setup>
import { useRoute, useRouter } from 'vue-router';
import FeaturesPage from '@/components/FeaturesPage.vue';
import { useApiRequest } from '@composable/useApiRequest'
import { getInsuredRequest, reviewed } from '@/features/branch/api/branchesApi'
import TableWrapper from '@/components/TableWrapper.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { openModal } from '@/modals';
import { addToast } from '@/toast';
import { pay as payMoney, approve as appPay } from '@agencies/api/agenciesApi'
  
const route = useRoute()

  const props = defineProps({
    selected: {
      type: Array
    },
    request: {
      type: Object,
      reqruired: true
    },
    index: {
      type: Number,
      reqruired: true
    },
    select: {
      type: Function
    }
  })

  const req = useApiRequest()
const reviewReq = useApiRequest()
const payReq = useApiRequest()
const approveReq = useApiRequest()

const router = useRouter()

const id = route.params.id
const status = route.params.status

function confirm(id) {
  openModal("Confirmation", {
    message: "Are you sure you have reviewed?"
  }, (res) => {
    if (res) {
      reviewReq.send(
        () => reviewed(id),
        res => {
          if (res.success) {
            req.response.value = req.response.value.filter(el => el.insuredUuid != id)
            console.log(req.response.value)
            addToast({
              type: 'success',
              message: 'Successfully Reviewd!'
            })
          } else {
            addToast({
              type: 'error',
              message: 'Couldnt Review. Try Again!'
            })
          }
        }
      )
    }
  })
}

function pay(id) {
  openModal("Pay", null, (res) => {
    if (res) {
      payReq.send(
        () => payMoney(id, res),
        res => {
          if (res.success) {
            req.response.value = req.response.value.filter(el => el.insuredUuid != id)
            console.log(req.response.value)
            addToast({
              type: 'success',
              message: 'Successfully Payed!'
            })
          } else {
            addToast({
              type: 'error',
              message: 'Couldnt Pay. Try Again!'
            })
          }
        }
      )
    }
  })
}

function approve(id) {
  openModal('Confirmation', {
    message: 'Are you sure you want to issue a certificate?'
  }, res => {
    if (res) {
      approveReq.send(
        () => appPay(id),
        res => {
          if (res.success) {
            req.response.value = req.response.value.filter(el => el.insuredUuid != id)
            console.log(req.response.value)
            addToast({
              type: 'success',
              message: 'Successfully approved!'
            })
          } else {
            addToast({
              type: 'error',
              message: 'Couldnt Approve. Try Again!'
            })
          }
        }

      )
    }
  })
}

function viewDetail(insuredUuid) {
  openModal('AttachementCertificate', {
    insuredUuid: insuredUuid
  })
}

</script>
<template>
  <tr class="z-0 cursor-pointer">
    <td>{{ index + 1 }}</td>
    <td>
      {{ request.fullname }}
    </td>
    <td>
      {{ request.gender }}
    </td>
    <!-- <td>
      {{ request.phone }}
    </td> -->
    <td>
      {{ request.passportNumber }}
    </td>
    <td>
      {{ request.address }}
    </td>
    <td>
      {{ request.countryOfDestination }}
    </td>
    <td>
      {{ request.effectiveDate }}
    </td>
    <td v-if="route.path.startsWith('/requested_certificates')">
      <div class="text-blue-500">
        <input @change="select(request?.insuredUuid)" :checked="selected.includes(request.insuredUuid)" type="checkbox" />
      </div>
    </td>
    <td>
      <div @click.stop="() => { }" class="flex justify-start gap-2">
        <button @click="viewDetail(request?.insuredUuid)" v-if="route.path.startsWith('/requested_certificates')" class="text-blue-500">
          view
        </button>        
        <button v-if="route.path.startsWith('/reviewed')" class="text-blue-500"
          @click.prevent="() => pay(request.insuredUuid)">
          <input type="checkbox" class="w-4 h-4" />
        </button>
        <button v-if="route.path.startsWith('/payed')" class="text-blue-500"
          @click.prevent="() => approve(request.insuredUuid)">
          Approve
        </button>
        <button v-if="route.path.startsWith('/approved')" class="text-blue-500"
          @click.prevent="() => router.push(`/certificate/${request.insuredUuid}`)">
          View
        </button>
      </div>
    </td>
  </tr>
</template>