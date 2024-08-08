<script setup>
import { formatCurrency } from "@/utils/utils";
import { ref, watch } from "vue";

const props = defineProps({
  prescriptions: {
    type: Array,
    required: true,
  },
});

const totalBalance = ref(0);
watch(
  () => props.prescriptions,
  () => {
    console.log(props.prescriptions);
    totalBalance.value = props?.prescriptions?.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.list_price * currentValue.totalQuantity,
      0
    );
    console.log(totalBalance.value);
  },
  { immediate: true }
);
</script>
<template>
  <div class="bg-white p-4 rounded-lg flex flex-col h-full justify-betwe">
    <div>
      <div class="flex justify-between">
        <div
          class="border rounded-full px-4 justify-center py-1 font-bold bg-accent"
        >
          {{ prescriptions?.length + " Items" }}
        </div>
        <div class="flex gap-2 opacity-80">
          <div>Dispenser:</div>
          <div>Dagnacehw</div>
        </div>
      </div>
      <div
        v-for="(detail, index) in prescriptions"
        :key="detail"
        class="flex justify-between py-[1.5rem] border-b pb-8"
      >
        <div class="flex flex-col">
          <div class="flex gap-2">
            <div>{{ index + 1 }}</div>
            <div>{{ detail?.drugName }}</div>
            <div>{{ "200" + detail.unit }}</div>
          </div>
          <div class="ml-6">{{ detail?.totalQuantity + " x Tablets" }}</div>
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col">
            <div class="opacity-40 text-xxs">Subtotal:</div>
            <div>{{ formatCurrency(detail?.list_price) }}</div>
          </div>
          <!-- <img class="w-8 h-8" :src="Delete" /> -->
        </div>
      </div>
    </div>
    <div class="flex py-10 flex-col items-end justify-end w-full">
      <p class="text-md opacity-40">Total</p>
      <p class="font-bold text-lg">
        {{ formatCurrency(totalBalance) }}
      </p>
    </div>
  </div>
</template>
