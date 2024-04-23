<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import { useRoute, useRouter } from 'vue-router';
import { useApiRequest } from '@composable/useApiRequest'
import { getInsuredRequest, reviewed } from '@/features/branch/api/branchesApi'
import TableWrapper from '@/components/TableWrapper.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { openModal } from '@/modals';
import { addToast } from '@/toast';
import RequestsTableRow from '../components/RequestsTableRow.vue';
import { ref, watch } from 'vue';
import { createDebitNote } from '@/features/reqeusts/api/requestsApi'
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';

const req = useApiRequest()
const debitNoterequest = useApiRequest()
const payReq = useApiRequest()
const approveReq = useApiRequest()

const route = useRoute()
const router = useRouter()

const id = route.params.id
const status = route.params.status

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, config = {}, cb = f => f) {
  req.send(
    () => getInsuredRequest(id, {
      ...pagination,
      status
    }, config),
    res => {
      cb(res)
    },
    true
  )
}

fetchMore()

async function searchMore(query, config, cb = f => f) {
  const res = await getInsuredRequest(id, {
    ...query,
    status
  }, config)

  cb(res)
  return res
}

const selected = ref([])
const selectAll = ref(false)

function select(id) {
  const found = selected.value.find(el => el == id)
  if(!found) {
    selected.value.push(id)
  } else {
    selected.value = selected.value.filter(el => el != id)
  }
  if(selected.value.length != req.response.value?.length) {
    selectAll.value = false
  } else {
    selectAll.value = true
  }
}

function toggle(ev) {
  if(ev.target.checked) {
    selectAll.value = true
    selected.value = req.response.value.map(el => el.insuredUuid)
  } else {
    selectAll.value = false
    selected.value = []
  }
}

watch(selected, () => {
  console.log(selected.value.length)
  if(selected.value.length == req.response.value.length) {
    selectAll.value = true
  } else {
    // selectAll.value = false
  }
})

function createDebit() {
  openModal('Confirmation', {
    message: 'Are you sure you Want to Create a Debit Note For The Selected Persons?',
    title: 'Create Debit Note',
  }, res => {
    if(res) {
      debitNoterequest.send(
        () => createDebitNote(selected.value),
        res => {
          if(res.success) {
            req.response.value = req.response.value.filter(el => !selected.value.includes(el.insuredUuid))
            selected.value = []
            addToast({
              type: 'success',
              message: 'Successfully Created A Debit Note.'
            })
            router.push('/requested_debit_advice/payed')
          } else {
            addToast({
              type: 'error',
              message: 'Couldnt Created A Debit Note. Try Again.'
            })
          }
        }
      )
    }
  })
}

function getData(data) {
  return data ? data.reduce((state, payload) => {
    payload.fullname = `${payload.firstName} ${payload.fatherName} ${payload.grandFatherName}`
    payload.address = `${payload.address1} ${payload.address2}`
    payload.effectiveDate = `${payload.beginDate} to ${payload.endDate}`

    state.push(payload)
    return state
  }, []) : []
}
</script>
<template>
  <FeaturesPage>
    <template #action>
      <div class="ml-auto p-2 flex items-center gap-2">
        <button
          :disabled="!selected.length"
          @click.prevent="createDebit"
          :class="[selected.length ? 'bg-green-400' : 'bg-gray-300']"
          class="rounded-md px-4 h-8 flex justify-center items-center text-white shadow-lg bottom-6 right-6 z-20">
          Create Debit Note
        </button>
        <button>Select All</button>
        <input @change="toggle" v-model="selectAll" class="h-5 w-5 rounded-md" type="checkbox">
      </div>
    </template>
    <template v-slot="{ search, perPage }">
      <PaginationWithSearch
        :search="search"
        :perPage="perPage"
        :searchApi="searchMore"
        :perPageApi="fetchMore"
        v-slot="{ next, previous, searchPending, searching, result }"
      >
        <TableWrapper
          :pending="!!searchPending || req.pending.value"
          :Fallback="TableRowSkeleton"
          :headers="{
            head: ['fullname', 'gender', 'passport Number', 'address', 'Destination', 'effectiveDate', '', 'modify'],
          }"
        >
          <template #row>
            <RequestsTableRow
              :selected="selected"
              :select="select"
              :key="row.id"
              :request="row"
              :index="index"
              v-for="(row, index) in (searching ? getData(result) : getData(req.response.value))" />
          </template>
        </TableWrapper>
      </PaginationWithSearch>
    </template>
  </FeaturesPage>
</template>