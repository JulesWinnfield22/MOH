<script setup>
  import FeaturesPage from '@/components/FeaturesPage.vue'
  import Tabs from '@/components/Tabs.vue';
  import ActiveAgncies from './ActiveAgncies.vue'
import { Status } from '@/utils/enums';

</script>
<template>
  <FeaturesPage v-slot='{ search }'>
    <Tabs
      :tabs="{
        active: {
          component: ActiveAgncies,
          props: {
            status: Status.ACTIVE,
            search,
            suspend: true
          }
        },
        suspended: {
          component: ActiveAgncies,
          props: {
            status: Status.DISABLED,
            search,
            activate: true
          }
        },
      }"
    />
  </FeaturesPage>
</template>