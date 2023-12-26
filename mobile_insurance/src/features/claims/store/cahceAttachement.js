import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAttachementCache = defineStore('CacheAttachementStore', () => {
  const cache = ref({})
  
  return {
    cache
  }
})