<script setup>
  import { computed, provide, watch } from 'vue';
  import { useApiRequest } from '@composable/useApiRequest'
  import { useTablePagination } from '@/composables/useTablePagination'

  const pageRequest = useApiRequest()
  
  const props = defineProps({
    store: {
      type: Object,
    },
    searchApi: {
      type: Function
    },
    searching: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: Number,
      required: true
    },
    cb: {
      type: Array,
      default: []
    },
    perPageApi: {
      type: Function,
      required: true
    }
  })

  const perPage = computed(() => props.perPage)
  const pagination = useTablePagination(props.perPage)

  watch(perPage, () => {
    console.log(perPage.value)
    if(!props.cb) return 
    for(let i = 0; i < props.cb.length; i++) {
      if(props.cb[i]?.limit?.value != props?.perPage) {
        props.cb[i].limit.value = perPage.value
        pagination.limit.value = perPage.value
        if(!props.searching) {
          props?.store?.reset()
          props?.perPageApi({
            page: 1,
            limit: perPage.value
          })
        }
        break
      }
    }
  })

  function next() {
    if(pageRequest.pending.value) return 
    
    if(props.searching) {
      if(props.cb[0]?.maxPage.value || props.cb[0]?.page.value + 1 <= props.cb[0]?.maxPage.value) {
        props.cb[0].page.value++
        props.searchApi && props.searchApi({
          page: props.cb[0]?.page,
          limit: perPage.value
        })
      }
    } else if(!props.searching) {
      if(!pagination?.maxPage.value || pagination?.page.value + 1 <= pagination?.maxPage.value) {
        pagination.page.value++
        props?.store?.reset()
        props.perPageApi && props.perPageApi({
          page: pagination?.page.value,
          limit: perPage.value
        }, (res) => {
          if(res.success && res.data.length < pagination.limit.value) {
            pagination.maxPage.value = pagination.page.value - 1
          }
        })
      }
    }
  }

  function previous() {
    if(pageRequest.pending.value) return 
    
    if(props.searching) {
      if(props.cb[0]?.page.value > 1) {
        props.cb[0].page.value--
        props.searchApi && props.searchApi({
          page: props.cb[0].page,
          limit: perPage.value
        })
      }
    } else if(!props.searching) {
      if(pagination.page.value > 1) {
        pagination.page.value--
        props?.store?.reset()
        props.perPageApi && props.perPageApi({
          page: pagination?.page.value,
          limit: perPage.value
        })
      }
    }
  }

  provide('next', next)
  provide('previous', previous)
</script>
<template>
  <slot :result="pageRequest.response.value" :next='next' :previous='previous' />
</template>