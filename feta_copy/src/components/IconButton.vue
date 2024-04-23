
<script setup>
  const props = defineProps(['icon', 'text'])
</script>
<template>
  <button :data-title="text" class="hover:bg-bg-clr hover:text-text-clr relative sidebar-item cursor-pointer w-full h-12">
    <div class="h-full flex items-center">
      <div class="w-12 h-full flex justify-center items-center">
        <h-icon :name="icon" />
      </div>
      <span class="truncate flex-1 text-left">
        {{text}}
      </span>
    </div>
  </button>
</template>