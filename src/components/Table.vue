<script setup>
import DataTable from './DataTable.vue';
import { inject, ref, useAttrs, watch } from 'vue';
import GenericTableRow from './GenericTableRow.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';

const emit = defineEmits([
  'row',
  'action:certificate',
  'action:delete',
  'action:review',
  'action:suspend',
  'action:edit',
  'bottom',
]);

const props = defineProps({
  showPagination: {
    type: Boolean,
    default: true,
  },
  rowCom: Object,
  actionHide: String,
  headers: [Array, Object],
  rows: {
    type: Array,
    default: [],
  },
  firstCol: { type: Boolean, default: false },
  placeholder: String,
  photoRow: Object,
  cells: Object,
  actions: Array,
  exceptions: Array,
  length: Number,
  Fallback: {
    type: Object,
    default: TableRowSkeleton
  },
  pending: Boolean,
});

function toUpper(str) {
  let words = str.split(' ');
  if (words.length == 0) return str;

  for (let i = 1; i < words.length; i++) {
    words[0] += words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }

  return words[0];
}

const spec = ref({ head: [], row: [] });

function format() {
  if (Array.isArray(props.headers)) {
    spec.value.head = props.headers;

    const res = props.headers.reduce((state, el) => {
      const temp = el.toLowerCase();
      state.push(toUpper(temp));
      return state;
    }, []);

    spec.value.row = res.filter((el) => el != 'modify');
  } else {
    spec.value.head = props.headers?.head || [];
    spec.value.row = props.headers?.row || [];
  }
}

format();

function getUrl(blob) {
  if (blob.toString().includes('File')) {
    const url = URL.createObjectURL(blob);
    return url;
  }

  return blob;
}

watch(props, () => {
  format();
});

const nextPage = inject('next', () => {});
const previousPage = inject('previous', () => {});
const page = inject("page", 1);
const totalPages = inject("totalPages", 1);
</script>
<template>
  <div class="h-full Table-header">
    <DataTable
      :firstCol="props.firstCol"
      class="bg-table-clr border border-white/10"
      :headers="spec.head"
    >
      <template v-if="firstCol" #headerFirst>
        <slot name="headerFirst" />
      </template>
      <slot name="row">
        <template v-if="rowCom">
          <component
            :is="rowCom"
            v-bind="{
              cells: cells,
              headKeys: spec.head,
              rowData: rows,
              rowKeys: spec.row,
            }"
          />
        </template>

        <template v-else>
          <GenericTableRow
            @row="(row) => emit('row', row)"
            :firstCol="props.firstCol"
            :head-keys="spec.head"
            :row-data="rows"
            :row-keys="spec.row"
            :cells="cells"
          >
            <template v-if="firstCol" #select="{ row }">
              <slot name="select" :row="row" />
            </template>
            <template #actions="{ row }">
              <slot name="actions" :row="row" />
            </template>
            <template #reason="{ row }">
              <slot name="reason" :row="row" />
            </template>
          </GenericTableRow>
          <tr v-if="!rows?.length && !pending">
            <td :colspan="spec.head.length + 1">
              <p class="text-center p-2 font-bold text-lg">
                {{ placeholder ? placeholder : 'No Data Found' }}
              </p>
            </td>
          </tr>
        </template>
      </slot>
      <template v-if="pending">
        <component
          :cols="spec.head.length + 1"
          :key="num"
          v-for="num in 25"
          :is="Fallback"
        />
      </template>
    </DataTable>
    <div v-if="showPagination && totalPages > 1" class="flex items-center justify-between">
      <button @click="previousPage" class="text-center px-4 py-2 rounded border">Previous</button>
      <p>
        Page {{ page }} of {{ totalPages }}
      </p>
      <button @click="nextPage" class="text-center px-4 py-2 rounded border">Next</button>
    </div>
  </div>
</template>
<style scoped>
.Table-header {
  font-family: 'DM Sans';
  text-align: left;

  padding-top: 0.5rem; /* 2 units in Tailwind are equal to 0.5rem */
  padding-bottom: 0.5rem;
  line-height: 21px;
  font-size: 14px;
  font-weight: bold;
  color: #4e585f;
}

.Table-contents {
  font-family: 'DM Sans';
  text-align: start;
  block-size: 21px;
  inline-size: 9px;
  padding-top: 0.5rem; /* 2 units in Tailwind are equal to 0.5rem */
  padding-bottom: 0.5rem;
  line-height: 21px;
  font-size: 14px;
  font-weight: normal;
  color: #4e585f;
}
</style>
