<script setup>
import CardBox from "@/components/cardbox/CardBox.vue";
import NumberDynamic from "@/components/base/NumberDynamic.vue";
import BaseLevel from "@/components/base/BaseLevel.vue";
// import PillTagTrend from "@/components/pill-tag/PillTagTrend.vue";

defineProps({
  number: {
    type: Number,
    default: 0,
  },

  icon: {
    type: String,
    default: null,
  },
  prefix: {
    type: String,
    default: null,
  },
  suffix: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },

  color: {
    type: String,
    default: null,
  },
  trend: {
    type: String,
    default: null,
  },
  trendType: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <CardBox
    class="flex flex-col w-full border-feta_highlighted border-[1px] rounded-lg"
  >
    <div class="text-[24px] text-Feta_Text leading-[2.25rem] font-[600] inter">
      <NumberDynamic :value="number" :prefix="prefix" :suffix="suffix" />
    </div>
    <div
      class="ubuntu text-[14px] font-[400] leading-[1.22rem] text-Feta_Text opacity-60"
    >
      {{ label }}
    </div>
  </CardBox>
</template>
