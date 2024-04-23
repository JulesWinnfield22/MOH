<script setup>
import CardBox from './CardBox.vue';
import NumberDynamic from './NumberDynamic.vue';
import BaseLevel from './BaseLevel.vue';
import PillTagTrend from './PillTagTrend.vue';

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
  <CardBox class="flex w-full border border-primary bg-white rounded-lg">
    <div class="flex justify-between w-full">
      <BaseLevel v-if="trend" class="" mobile>
        <PillTagTrend :trend="trend" :trend-type="trendType" small />
      </BaseLevel>
      <BaseLevel class="">
        <div>
          <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
            {{ label }}
          </h3>
          <h1 class="text-3xl leading-tight font-semibold">
            <NumberDynamic :value="number" :prefix="prefix" :suffix="suffix" />
          </h1>
        </div>
      </BaseLevel>
    </div>
  </CardBox>
</template>
