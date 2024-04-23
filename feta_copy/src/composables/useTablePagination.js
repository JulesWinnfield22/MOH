import { onMounted, ref, watch } from "vue";

export function useTablePagination(responseLimit = 25) {
  const page = ref(0);
  const limit = ref(responseLimit);
  const maxPage = ref();

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
    maxPage
  }
}
