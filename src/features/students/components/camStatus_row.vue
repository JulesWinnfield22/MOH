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
  <div :class="[$style[row?.campusStatus]]" class=" text-black text-center rounded">
    {{ row?.campusStatus }}
  </div>
  
</template>


<style module>
  .Attending {
    background: linear-gradient(135deg, #90ee90, #66cc66);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }

  .Withdrawn {
    background: linear-gradient(135deg, #698bf9, #3d66f0);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }

  .Dissmised {
    background: linear-gradient(135deg, #f0e68c, #d1c76c);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }
  .Suspended {
    background: linear-gradient(135deg, #f0e68c, #d1c76c);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }
  .Dismissed {
    background: linear-gradient(135deg, #e66a6a, #f24965);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }
  .Graduated{
    background: linear-gradient(135deg, #4e514e, #6e706f);
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: #333;
  }
</style>
