<script setup>
import { Status } from '@/utils/enums';
import AgenciesDataProvider from '../components/AgenciesDataProvider.vue';
import { useRoute } from 'vue-router';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { openModal } from '@/modals';
import TableWrapper from '@/components/TableWrapper.vue';

const props = defineProps({
  status: {
    type: String,
    required: true
  },
  search: {
    type: String,
  },
  activate: {
    type: Boolean,
    default: false
  },
  suspend: {
    type: Boolean,
    default: false
  },
  remove: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()

function removeAgency(id, remove) {
    openModal('Confirmation', {
      message: 'Are you sure you want to delete this agency?'
    }, res => {
      if(res) remove(id)
    })
  }

  function suspendAgency(id, data, suspend) {
    openModal('Confirmation', {
      message: 'Are you sure you want to suspend this agency?'
    }, res => {
      if(res) suspend(id, data)
    })
  }
  
  function activateAgency(id, data, suspend) {
    openModal('Confirmation', {
      message: 'Are you sure you want to Activate this agency?'
    }, res => {
      if(res) suspend(id, data)
    })
  }
</script>
<template>
  <AgenciesDataProvider :status="props.status" :per-page="25" :search="search"
    v-slot="{ agencies, pending, removeAgency: remv, suspend: sus, activate: act }"
  >
    <TableWrapper
      :pending="pending"
      :Fallback="TableRowSkeleton"
      @action:delete="(row) => removeAgency(row.agencyUuid, remove)"
      @action:edit="row => openModal('EditAgencyForm', {agency: row})"
      :headers="{
        head: ['name', 'address', 'description', 'phone', 'status', 'modify'],
        row: ['agencyName', 'address', 'description', 'telephone', 'status']
      }"
      :rows="agencies?.length ? agencies.reduce((state, payload) => {
        payload.address = `${payload?.address1} - ${payload?.address2} - ${payload?.address3}`
        state.push(payload)
        return state
      }, []) : []" 
    >
      <template #button="{ row }">
        <button v-if="suspend" @click="suspendAgency(row.agencyUuid, {...row, status: Status.DISABLED}, sus)" class="text-red-500">
          Suspend
        </button>
        <button v-if="activate" @click="activateAgency(row.agencyUuid, {...row, status: Status.ACTIVE}, act)" class="text-green-500">Activate</button>
        <button v-if="remove" @click="removeAgency(row.agencyUuid, {...row, status: Status.ACTIVE}, remv)" class="text-red-500">Delete</button>
      </template>
    </TableWrapper>
  </AgenciesDataProvider>
</template>