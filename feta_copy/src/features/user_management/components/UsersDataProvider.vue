<script setup>
  import { getUsers, searchUser, deletehUser } from '@users/api/userApi'
  import { useApiRequest,  } from '@composable/useApiRequest';
  import { useTablePagination  } from '@composable/useTablePagination';
  import { useUsers } from '@store/users'
  import { computed, nextTick, ref, watch } from 'vue';
  import { addToast } from '@/toast';
  import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
  import { UserType, Status } from '@/utils/enums'

  const usersRequest = useApiRequest(false)
  const usersDeleteRequest = useApiRequest(false)
  const usersStore = useUsers()

  const props = defineProps({
    userType: {
      type: String,
      default: UserType.INSURANCE
    },
    userStatus: {
      type: String,
      default: Status.ACTIVE  
    }
  })

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  if(usersRequest.pending.value || usersStore.done) return
  console.log("SDf")
  usersRequest.send(
    () => getUsers({...pagination, userStatus: props.userStatus, usertype: props.userType}),
    ({success, data}) => {
      console.log(data)
      if(success && !usersStore.done) {
        if (data.length == 0 ) {
          usersStore.setDone(true)
        } else {
          usersStore.users = data
        }
        
        if(data.length < pagination.limit.value) {
          usersStore.setDone(true)
        }
      }
      cb({ success, data })
    }
  )
}

fetchMore()

function remove(id) {
  if(usersDeleteRequest.pending.value) return

  usersDeleteRequest.send(
    () => deletehUser(id),
    res => {
      if(res.success) {
        usersStore.remove(id)
        addToast({
          type: 'success',
          message: 'Successfully deleted a user'
        })
      } else {
        addToast({
          type: 'error',
          message: 'couldnt deleted a user. try again!'
        })
      }
    }
  )
}
</script>
<template>
  <PaginationWithSearch
    :store="usersStore"
    :searchApi="getUsers"
    :perPageApi="fetchMore"
    v-slot="{ next, previous, result, searchPending, searching }"
  >
    <slot
      v-bind="{ next, previous }"
      :users="searching ? result || [] : usersStore.users"
      :pending="searchPending || usersRequest.pending.value"
      :error="usersRequest.error.value"
      :getMore="fetchMore"
      :remove="remove"
    />
  </PaginationWithSearch>
</template>