import { provide, ref } from 'vue'

export function useTablePagination(responseLimit = 25) {
  const page = ref(0)
  const totalPages = ref(0)
  const limit = ref(responseLimit)
  const maxPage = ref()

  provide('page', page)
  provide('limit', limit)
  provide('totalPages', totalPages)

  const done = ref(false)

  function reset() {
    page.value = 1
    limit.value = responseLimit
    done.value = false
  }

  return {
    reset,
    page,
    limit,
    done,
    totalPages,
    maxPage,
  }
}
