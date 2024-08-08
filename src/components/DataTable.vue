<script setup>
import { inject, watch } from "vue";

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  firstCol: {
    type: Boolean,
    default: false,
  },
});

const next = inject("next", () => {});
const previous = inject("previous", () => {});

const page = inject("page", 1);
const totalPages = inject("totalPages", 1);
</script>
<template>
  <div class="mb-6">
    <div class="pl-0">
      <table class="min-w-full rounded-lg">
        <thead class="bg-accent capitalize">
          <tr>
            <th
              v-if="firstCol"
              class="th p-2 text-left uppercase tracking-wider"
            >
              <slot name="headerFirst"></slot>
            </th>

            <th class="th p-2 text-left uppercase tracking-wider">#</th>
            <!-- Add row number column -->
            <th v-for="header in headers" :key="header" class="p-2 text-left">
              {{ header }}
            </th>
          </tr>
        </thead>
        <slot />
      </table>
    </div>
  </div>
</template>
<style scoped>
th {
  font-weight: 700;
}
</style>
