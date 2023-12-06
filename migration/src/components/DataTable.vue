<script setup>
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  cbWhenScrollbarBottom: {
    type: Function,
    default: f => f 
  }
});

function checkScrollPos(ev) {
  if(ev.target.scrollTop + document.documentElement.clientHeight >= ev.target.scrollHeight) {
    props?.cbWhenScrollbarBottom()
  }
}
</script>
<template>
  <div @scroll.self="checkScrollPos" class="min-h-full data-table-scrollbar relative rounded-md overflow-y-scroll">
    <div>
      <table class="w-full">
        <thead class="z-10 sticky top-0 bg-table-clr border-b-2 border-gray-300/30">
          <slot name="table-header">
            <tr>
              <th class="z-0 py-3 pl-6 text-left text-xs font-semibold">
                #
              </th>
              <th
                class="py-3 pl-6 text-left text-xs font-semibold uppercase"
                v-for="head in headers"
              >
                {{ head }}
              </th>
            </tr>
          </slot>
        </thead>
        <tbody> 
          <slot ></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
tbody tr {
  color: var(--text-clr);
  @apply border-b border-gray-300/50;
}

/* tr:nth-child(even) {
  background-color: rgb(var(--primary) / .3);
  border-radius: 10px;
  overflow: hidden;
} */

tbody tr td {
  @apply py-2 pl-6 text-left text-sm;
}

.data-table-scrollbar::-webkit-scrollbar {
  display: block;
  width: 5px;
}

.data-table-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1c9c9;
  border-radius: 50px;
}

.data-table-scrollbar {
  scrollbar-width: thin;
}

th:last-of-type {
  color: transparent;
}

</style>
