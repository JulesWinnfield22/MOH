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
});

const emit = defineEmits(["row"]);
</script>
<template>
  <template :key="row.id" v-for="(row, index) in rowData">
    <slot name="top" :row="row" />
    <tr
      @click.self="emit('row', row)"
      class="bg-white border-x-[0.2px] border-b-[0.2px] border-t-[0.2px]"
    >
      <td v-if="firstCol" class="p-3">
        <slot name="select" :row="row" />
      </td>
      <td class="p-3 opacity-60">{{ index + 1 }}</td>
      <td class="p-3 opacity-60" :key="key" v-for="key in rowKeys">
        <span>
          {{
            key.split(".").reduce((all, el) => {
              return all?.[el];
            }, row)
          }}
        </span>
      </td>
      <td
        class="p-3"
        v-if="headKeys.find((head) => head.toLowerCase() == 'actions')"
      >
        <slot name="actions" :row="row" />
      </td>
    </tr>
    <slot name="bottom" :row="row" />
  </template>
</template>
