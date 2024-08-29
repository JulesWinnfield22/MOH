<script setup>
import { openModal } from "@/modal";
import { getColumnValue } from "@/utils/utils";

const props = defineProps({
  rowData: {
    type: Array,
    required: true,
  },
  headKeys: {
    type: Array,
  },
  rowKeys: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["row"]);
console.log(props?.rowData);
</script>

<template>
  <tr
    @click.self="emit('row', row)"
    class="bg-white border-x-[0.2px] border-b-[0.2px] border-t-[0.2px]"
    :key="idx"
    v-for="(row, idx) in rowData"
  >
    <td class="p-3">{{ idx + 1 }}</td>
    <td class="p-3" :key="key" v-for="key in rowKeys">
      <div
        class="w-60 truncate"
        v-if="
          ['productId', 'chiefComplaint', 'dose', 'route', 'price'].includes( key )
        "
      >
        <p v-for="data in row?.prescriptions" :key="data" >
          {{ data?.[key] }}
        </p>
        <!-- row?.prescription -->
      </div>
      <span v-else>
        {{ getColumnValue(key, row) }}
      </span>
    </td>
  </tr>
</template>
