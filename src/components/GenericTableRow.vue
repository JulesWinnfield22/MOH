<script setup>
const props = defineProps({
  rowData: {
    type: Array,
    required: true,
  },
  firstCol: {
    type: Boolean,
    default: false,
  },
  rowKeys: {
    type: Array,
    required: true,
  },
  headKeys: {
    type: Array,
    default: [],
  },
  cells: Object,
});
const emit = defineEmits(["row"]);
</script>
<template>
  <template :key="row?.id" v-for="(row, index) in rowData">
    <slot name="top" :row="row" />
    <tr
      @click="emit('row', row)"
      class="cursor-pointer hover:bg-gray-300 odd:bg-gray-200 bg-white border-x-[0.2px] border-b-[0.2px] border-t-[0.2px]"
    >
      <td v-if="firstCol" class="p-3">
        <slot name="select" :row="row" />
      </td>
      <td class="p-2">{{ index + 1 }}</td>
      <td class="p-2 max-w-40" :key="key" v-for="key in rowKeys">
        <span v-if="!Object.keys(cells || {}) || !cells?.[key]">
          {{
            key.split(".").reduce((all, el) => {
              return all?.[el];
            }, row)
          }}
        </span>
        <component
          v-else-if="Object.keys(cells || {}) && cells[key].__hmrId"
          :row="row"
          :is="cells[key]"
        />
        <span v-else-if="typeof cells[key] == 'function'">
          {{ cells[key](row?.[key], row) }}
        </span>
      </td>
      <td
        class="p-3"
        v-if="headKeys.find((head) => head.toLowerCase() == 'actions')"
      >
        <slot name="actions" :row="row" />
      </td>
      <td
        class="p-3"
        v-if="headKeys.find((head) => head.toLowerCase() == 'reason')"
      >
        <slot name="reason" :row="row" />
      </td>
    </tr>
    <slot name="bottom" :row="row" />
  </template>
</template>
