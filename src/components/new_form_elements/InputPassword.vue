<script setup>
  import { ref } from 'vue';
  import Input from './Input.vue'
import icons from '@/utils/icons';

  const props = defineProps({
    attributes: {
      type: Object,
    }
  })

  const text = ref(props.attributes?.type == 'text' ? true : false)

  function toggleType() {
    text.value = !text.value
  }

</script>

<template>
  <Input :attributes="{
    ...attributes,
    type: text ? 'text' : 'password'
  }" >
    <template #left>
      <div class="h-full w-12 grid place-items-center border-r">
        <i v-html="icons.eye"/>
        <!--<Icon
          @click="toggleType"
          :name="text ? 'solar:eye-linear' : 'solar:eye-closed-outline'"
        />-->
      </div>
      <!-- <h-icon  :name="text ? 'bi-eye-fill': 'bi-eye-slash'" /> -->
    </template>
  </Input>
</template>