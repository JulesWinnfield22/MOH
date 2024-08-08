<script setup>
import DataTable from "./DataTable.vue";
import DataTablePrescribe from "./DataTablePrescribe.vue";
import { inject, ref, useAttrs, watch } from "vue";
import GenericTableRow from "./GenericTableRow.vue";

const emit = defineEmits([
  "row",
  "action:certificate",
  "action:delete",
  "action:review",
  "action:suspend",
  "action:edit",
  "bottom",
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
  photoRow: Object,
  actions: Array,
  exceptions: Array,
  length: Number,
  Fallback: Object,
  pending: Boolean,
});

function toUpper(str) {
  let words = str.split(" ");
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

    spec.value.row = res.filter((el) => el != "modify");
  } else {
    spec.value.head = props.headers?.head || [];
    spec.value.row = props.headers?.row || [];
  }
}

format();

function getUrl(blob) {
  if (blob.toString().includes("File")) {
    const url = URL.createObjectURL(blob);
    return url;
  }

  return blob;
}

watch(props, () => {
  format();
});

const nextPage = inject("next", null);
const previousPage = inject("previous", null);
</script>
<template>
  <DataTablePrescribe class="bg-table-clr border border-white/10" :headers="spec.head">
    <slot name="row">
      <template v-if="rowCom">
        <component
          :is="rowCom"
          v-bind="{ headKeys: spec.head, rowData: rows, rowKeys: spec.row }"
        />
      </template>
      <template v-else>
        <GenericTableRow
          :head-keys="spec.head"
          :row-data="rows"
          :row-keys="spec.row"
        >
          <template #actions="{ row }">
            <slot name="actions" :row="row" />
          </template>
        </GenericTableRow>
      </template>
    </slot>
    <div v-if="pending">
      <component
        :cols="spec.head.length + 1"
        :key="num"
        v-for="num in 25"
        :is="Fallback"
      />
    </div>
  </DataTablePrescribe>
</template>
