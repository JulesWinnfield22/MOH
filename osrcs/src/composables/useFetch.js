import axios from 'axios'
import { ref } from 'vue'

export default function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const fetchData = async () => {
    isLoading.value = true
    try {
      const response = await axios.get(url)
      data.value = response.data
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, fetchData }
}
