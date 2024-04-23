<script setup>
  import { computed, ref, watch } from 'vue';
  import { useTablePagination } from '@/composables/useTablePagination'
  import PerPage from './PerPage.vue';
  import { useApiRequest } from '@composable/useApiRequest'

  const searchRequest = useApiRequest()

  const props = defineProps({
    search: {
      type: String
    },
    searchApi: {
      type: Function
    },
    perPage: {
      type: Number,
      required: true
    }
  })

  const searching = ref(false)

  let searchController
  function searchReq(search) {
    console.log(searching.value)
    if(searchController) searchController.abort()
    searchController = new AbortController()

    searchRequest.send(
      () => props?.searchApi({
        search,
        page: searchPagination.page.value,
        limit: props.perPage,
      }, {
        signal: searchController.signal
      }),
      res => {
        console.log(res)
        // searching.value = false
      },
      searching.value
    )
  }

  const searchPagination = useTablePagination(props.perPage)
  const perPage = computed(() => props.perPage)
  const search = computed(() => props.search)

  watch(search, () => {
    if(props.search) {
      searching.value = true
      searchPagination.reset()
      searchReq(props.search)
    } else {
      searching.value = false
    }
  })
  
  watch(perPage, () => {
    if(props.search) {
      searchPagination.limit.value = props.perPage
      searchReq(props.search)
    }
  })
</script>
<template>
  <PerPage :perPage="perPage" :searching="searching" :searchApi="searchApi" v-slot="page" :cb="[searchPagination]">
    <slot
      v-bind="page"
      :result="searchRequest.response.value"
      :searchPending="searchRequest.pending.value"
      :searching="searching"
      :searchResult="searchRequest.response.value"
    />
  </PerPage>
</template>