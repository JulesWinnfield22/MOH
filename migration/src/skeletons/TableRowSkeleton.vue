<script setup>
  const props = defineProps({
    cols: {
      type: Number
    }
  })
</script>
<template>
  <tr>
    <td v-for="num in cols" :key="num">
      <div class="z-0 h-4 rounded-xl flex-1 bg-gray-200 animate-pulse"></div>
    </td>
  </tr>
</template>