import { onMounted, ref, watch } from "vue";
import { useApiRequest } from '@composable/useApiRequest'

export function useTablePagination(responseLimit = 25) {
  const page = ref(1);
  const limit = ref(responseLimit);

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
    done
  }
}
