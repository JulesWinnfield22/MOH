<script setup>
import { ref } from "vue";
import { chartData } from "./charts/chartDatas";

const props = defineProps({
  categories: {
    type: Array,
  },
  series: {
    type: Array,
  },
  type: { type: String },
  title: {
    type: String,
  },
});

const BarOptions = ref(chartData.barOptions);
BarOptions.value = {
  chart: {
    id: "claims-bar",
  },
  xaxis: {
    categories: props?.categories,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      columnWidth: 30,
    },
  },
};
</script>
<template>
  <div class="w-full h-[300px] pl-2 pt-4 pb-16 bg-white rounded-[10px]">
    <span
      class="text-lg text-Feta_Text font-[400] text-[1rem] mb-3 flex items-center font-cubic"
      >{{ title }}
    </span>
    <apexchart
      class="mt-6"
      width="100%"
      height="100%"
      :type="type"
      :options="BarOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
