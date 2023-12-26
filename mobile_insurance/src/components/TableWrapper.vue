<script setup>
import DataTable from "@com/DataTable.vue";
import { inject, ref, useAttrs, watch } from "vue";
import Dropdown from "./Dropdown.vue";
import DropdownBtn from "./DropdownBtn.vue";

const emit = defineEmits(['row', 'action:certificate', 'action:delete', 'action:review', 'action:suspend', 'action:edit', 'bottom'])

const props = defineProps({
  showPagination: {
    type: Boolean,
    default: true
  },
  actionHide: String,
  headers: Array | Object,
  rows: Array,
  photoRow: Object,
  actions: Array,
  exceptions: Array,
  length: Number,
  Fallback: Object,
  pending: Boolean
})

function toUpper(str) {
  let words = str.split(" ")
  if (words.length == 0) return str

  for (let i = 1; i < words.length; i++) {
    words[0] += words[i].charAt(0).toUpperCase() + words[i].substring(1)
  }

  return words[0]
}

const spec = ref({ head: [], row: [] })

function format() {
  if (Array.isArray(props.headers)) {
    spec.value.head = props.headers
  
    const res = props.headers.reduce((state, el) => {
      const temp = el.toLowerCase()
      state.push(toUpper(temp))
      return state
    }, [])
  
    spec.value.row = res.filter((el) => el != "modify")
  } else {
    spec.value.head = props.headers?.head || []
    spec.value.row = props.headers?.row || []
  }
}

format()

function getUrl(blob) {
  if (blob.toString().includes("File")) {
    const url = URL.createObjectURL(blob)
    return url
  }

  return blob
}

watch(props, () => {
  format()
})

const nextPage = inject('next', null)
const previousPage = inject('previous', null)
</script>
<template>
  <DataTable :cb-when-scrollbar-bottom="() => {
    emit('bottom')
  }" class="bg-table-clr border border-white/10" :headers="spec.head">
    <slot name="row">
      <tr @click.self="emit('row', row)" class="z-0 cursor-pointer" :key="row.id"
        v-for="(row, index) in rows">
        <td>{{ index + 1 }}</td>
        <td :key="key" v-for="(key, index) in spec.row">
          <div v-if="photoRow == key" class="h-10 w-10 rounded-md overflow-hidden">
            <img class="max-w-full h-full object-cover" :src="getUrl(row?.[key])" />
          </div>
          <span v-else>
            {{ row?.[key] }}
          </span>
        </td>
        <td v-if="spec.head.map(head => head.toLowerCase()).includes('modify')">
          <Dropdown top="120%" @click.stop="() => { }" v-slot="{ setRef, toggleDropdown }">
            <button @click="toggleDropdown">
              <h-icon name="fa-ellipsis-v" />
            </button>
            <div :ref="setRef" class="flex p-1 flex-col bg-gray-300 rounded-md shadow-xl w-32 justify-start gap-1">
              <DropdownBtn class="text-red-500" @click.prevent="emit('action:delete', row)">
                Delete
              </DropdownBtn>
              <DropdownBtn class="text-primary" @click.prevent="emit('action:edit', row)">
                Edit
              </DropdownBtn>
              <slot
                :row="row"
                name="button"
              />
            </div>
          </Dropdown>
        </td>
      </tr>
    </slot>
    <component v-if="pending" :cols="spec.head.length + 1" :key="num" v-for="num in 25" :is="Fallback" />
    <tr v-else-if="!pending && !rows?.length">
      <td class="text-center p-4 font-semibold text-xl" :colspan="spec.head.length + 1">
        No Data Provided.
      </td>
    </tr>
  </DataTable>
  <div class="mb-2 flex justify-end gap-4 p-2 items-center" v-if="!pending && showPagination">
    <button @click="previousPage" class="flex gap-2 items-center bg-primary px-4 py-1 rounded text-white ">
      <h-icon name="fa-long-arrow-alt-left" />
      <span>Previous</span>
    </button>
    <button class="flex gap-2 items-center bg-primary px-4 py-1 rounded text-white" @click="nextPage">
      <span>Next</span>  
      <h-icon class="" name="fa-long-arrow-alt-right" />
    </button>
  </div>
</template>