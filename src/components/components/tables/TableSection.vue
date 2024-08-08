<template>
  <tbody class="pl-[100px]">
    <tr
      @click="toggle"
      class="opacity-60 bg-white border-x-[0.2px] border-b-[0.2px] border-t-[0.2px]"
    >
      <td class="px-3 text-sm text-gray-900">{{ index + 1 }}</td>
      <!-- Display row number -->

      <td class="whitespace-nowrap px-6 py-4 text-sm">{{ entry.detail }}</td>
      <td class="whitespace-nowrap px-6 py-4 text-sm">
        {{ entry.physicianName }}
      </td>
      <td class="whitespace-nowrap px-6 py-4 text-sm">
        {{ entry.mobilePhone }}
      </td>
      <td class="whitespace-nowrap px-6 py-4 text-sm">
        {{ entry.prescribedOn }}
      </td>
      <td class="whitespace-nowrap px-6 py-4 text-sm">{{ entry.status }}</td>
      <td class="button-td pl-10">
        <ExpandableButton :isOpen="isOpen" />
      </td>
    </tr>
    <tr v-if="isOpen">
      <td colspan="7">
        <TableRow :entry="entry" />
      </td>
    </tr>
  </tbody>
  <!-- <div v-if="isOpen">
      
      <TableRow :entry="entry" />
    
  </div> -->
</template>

<script>
import { defineComponent, ref } from "vue";
import ExpandableButton from "./ExpandableButton.vue";
import TableRow from "./TableRow.vue";

export default defineComponent({
  props: {
    entry: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  components: {
    ExpandableButton,
    TableRow,
  },
  setup() {
    const isOpen = ref(false);

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    return { isOpen, toggle };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM Sans");
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

th {
  font-family: "Ubuntu";
  font-size: 14px;
  font-weight: 700;
  color: #343c6a;
}
td {
  font-family: "Ubuntu";
  font-size: 14px;
  font-weight: 400;
  color: #263558;
}

.select,
span {
  font-family: "Ubuntu";
  font-size: 14px;
  font-weight: 400;
  color: #343c6a;
}
</style>
