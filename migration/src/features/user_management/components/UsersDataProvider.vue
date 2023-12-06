<script setup>
  import { getUsers } from '@users/api/userApi'
  import { useApiRequest,  } from '@composable/useApiRequest';
  import { useTablePagination  } from '@composable/useTablePagination';
  import { useUsers } from '@store/users'
  import { computed, nextTick, ref, watch } from 'vue';

  const usersRequest = useApiRequest(false)
  const usersStore = useUsers()

  const props = defineProps({
    search: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      requried: true
    },
    perPage: {
      type: Number,
      default: 25
    }
  })

const pagination = useTablePagination(props.perPage)
const searchPagination = useTablePagination(props.perPage)

const searching = ref(false)

let controller

function fetchMore() {
  if(usersRequest.pending.value || usersStore.done) return
  
  if(controller) controller.abort()
  controller = new AbortController()

  console.log("SDf")
  usersRequest.send(
    () => getUsers({
      limit:  pagination.limit.value, 
      page: pagination.page.value++,
      status: props.status,
    },{  
      signal: controller.signal
    }),
    ({success, data}) => {
      if(success && !usersStore.done) {
        if (data.results.length == 0 ) {
          usersStore.setDone(true)
        } else {
          usersStore.users.push(...data.results)
        }
        
        if(data.results.length < pagination.limit.value) {
          usersStore.setDone(true)
        }
      }
    }
  )
}

function getSearchResult(search) {
  if(searchPagination.done.value) return
  
  if(controller) controller.abort()
  controller = new AbortController()

  usersRequest.send(
    () => getUsers({
      search,
      status: props.status,
      limit:  searchPagination.limit.value, 
      page: searchPagination.page.value++
    }, {
      signal: controller.signal
    }),
    ({success, data}) => {
      if(success && data.results.length == 0) {
        searchPagination.done.value = true
      }
    },
    searching.value
  )
}

fetchMore()

watch(props, () => {
  pagination.limit.value = props.perPage
  searchPagination.limit.value = props.perPage
  if(props.search) {
    searchPagination.reset()
    searching.value = true
    getSearchResult(props.search)
  } else {
    searching.value = false
    fetchMore(props.search)
  }
})

const status = computed(() => props.status)
watch(status, () => {
  pagination.reset()
  usersStore.reset()
  nextTick(() => {
    console.log("fet")
    fetchMore()
  })
})

</script>
<template>
  <slot
    :users="searching ? usersRequest.response.value?.results || [] : usersStore.users"
    :pending="usersRequest.pending.value"
    :error="usersRequest.error.value"
    :getMore="fetchMore"
  />
</template>