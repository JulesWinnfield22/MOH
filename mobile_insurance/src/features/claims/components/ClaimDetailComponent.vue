<script setup>
  const props = defineProps({
    label: String,
    value: String
  })

  console.log(props.value)
</script>
<template>
  <div class="text-gray-500 flex-1 flex items-center">
    <p class="px-4 text-sm w-[8rem] max-w-[8rem] self-end">{{label}}</p>
    <div v-if="value && (value?.toLocaleLowerCase() != 'undefined')" class="px-5 h-full flex-1 py-1 bg-gray-100 rounded-md shadow-inner">
      {{ value }}                                      
    </div>
    <div v-else class="animate-pulse p-5 flex-1 bg-gray-100 rounded-md shadow-inner">
    </div>
  </div>
</template>