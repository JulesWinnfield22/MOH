import { ref } from 'vue'

export function useBlobToUrl(blob) {
  const url = ref('')
  const base64 = ref('')
  const reader = new FileReader()

  const createUrl = () => {
    url.value = window.URL.createObjectURL(new Blob([blob]))
  }

  const createBase64 = () => {
    reader.onloadend = () => {
      base64.value = reader.result
    }
    reader.readAsDataURL(new Blob([blob]))
    console.log('this is reader', new Blob([blob]))
    console.log('this is reader result', reader.result)
  }

  return { url, base64, createUrl, createBase64 }
}
