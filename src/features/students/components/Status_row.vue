<script setup>
// import { openModal } from "@customizer/modal-x";
import { getColumnValue, toasted } from '@/utils/utils';
const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <div :class="[$style[row?.registrationStatus]]" class=" text-black text-center rounded">
    {{ row?.registrationStatus }}
  </div>
  
</template>

<style module>
  .waiting {
    background: linear-gradient(135deg, #f0e68c, #d1c76c);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }

  .rejected {
    background: linear-gradient(135deg, #ffcccb, #ff9999);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }

  .registered {
    background: linear-gradient(135deg, #90ee90, #66cc66);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }
  .transferred {
    background: linear-gradient(135deg, #6fb6ef, #317394);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }
</style>
