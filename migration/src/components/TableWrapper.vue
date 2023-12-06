<script setup>
import DataTable from "@com/DataTable.vue";

const props = defineProps(['headers', 'rows', "photoRow", 'actions', 'exceptions', 'length', "Fallback", 'pending'])
const emit = defineEmits(['row', 'action:delete', 'action:edit', 'bottom'])

function toUpper(str) {
  let words = str.split(" ")
  if (words.length == 0) return str

  for (let i = 1; i < words.length; i++) {
    words[0] += words[i].charAt(0).toUpperCase() + words[i].substring(1)
  }

  return words[0]
}

const spec = { head: [], row: [] }
if (Array.isArray(props.headers)) {
  spec.head.push(...props.headers)

  const res = props.headers.reduce((state, el) => {
    const temp = el.toLowerCase()
    state.push(toUpper(temp))
    return state
  }, [])

  spec.row.push(...res.filter((el) => el != "modify"))
} else {
  spec.head = props.headers?.head || []
  spec.row = props.headers?.row || []
}

function getUrl(blob) {
  if (blob.toString().includes("File")) {
    const url = URL.createObjectURL(blob)
    return url
  }

  return blob
}
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
          <div @click.stop="() => { }" class="flex justify-start gap-2">
            <!-- <button @click.prevent="emit('action:detail', row)">
              <icon name="bi-bar-chart-line-fill" class="w-5 h-5" />
            </button> -->
            <button @click.prevent="emit('action:edit', row)">
              <icon name="md-modeedit-round" class="w-5 h-5" />
            </button>
          </div>
        </td>
      </tr>
    </slot>
    <component v-if="pending" :cols="spec.head.length + 1" :key="num" v-for="num in 25" :is="Fallback" />
  </DataTable>
</template>