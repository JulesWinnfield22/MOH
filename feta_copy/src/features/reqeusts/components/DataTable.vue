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
  <div @scroll.self="checkScrollPos" class="data-table-scrollbar relative overflow-y-scroll">
    <div>
      <table class="w-full">
        <thead class="t-head z-10 sticky top-0 bg-gray-300 border border-black">
          <slot name="table-header">
            <tr>
              <slot name="head"></slot>
              <th
                class="p-3  text-center text-xs font-semibold uppercase"
                v-for="head in headers"
              >
                {{ head }}
              </th>
            </tr>
          </slot>
        </thead>
        <tbody class="t-body"> 
          <slot ></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
.t-body tr {
  color: var(--text-clr);
  @apply border-b border-gray-300/50;
}

/* tr:nth-child(even) {
  background-color: rgb(var(--primary) / .3);
  border-radius: 10px;
  overflow: hidden;
} */

.t-body tr td {
  /* @apply p-3 text-left text-sm ;  */
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

.t-head th, .t-body td {
  border: 1px solid black;
}

.t-head th:last-of-type {
  color: inherit;
}
</style>
