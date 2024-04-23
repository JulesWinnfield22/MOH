<script setup>
import { mdiAccountMultiple, mdiCartOutline, mdiChartTimelineVariant, mdiLocationEnter } from '@mdi/js';
import CardBoxWidget from './CardBoxWidget.vue'
import AnalyticsWidget from './analyticsWidget.vue'
import {chartData} from './chartDatas';
import { onMounted, ref } from 'vue';
// import CardBox from './CardBox.vue'
// import apexcharts from 'apexcharts'
onMounted(() => {
  updateChartData();
});
// Access the chart data and options
const BarOptions = ref(chartData.barOptions);
const series = ref(chartData.series);
const PolicyHolderOrCoverTypesSeries = ref(
  chartData.policyHolderOrCoverTypesSeries
);
const PolicyHolderOrCoverTypesOptions = ref(
  chartData.policyHolderOrCoverTypesOptions
);

// Paid Claims by Providers and Service Types
const PaidClaimsByProvidersAndServiceTypesSeries = ref(
  chartData.paidClaimsByProvidersAndServiceTypesSeries
);
const PaidClaimsByProvidersAndServiceTypesOptions = ref(
  chartData.paidClaimsByProvidersAndServiceTypesOptions
);

const TotalClaimsCreatedByInsurerOptions = ref(
  chartData.TotalClaimsCreatedByInsurerOptions
);
const TotalClaimsCreatedByInsurerSeries = ref(
  chartData.TotalClaimsCreatedByInsurerSeries
);

const TotalNumberOfClaimsSubmittedPaidRejectedByPolicyholderOptions = ref(
  chartData.TotalNumberOfClaimsSubmittedPaidRejectedByPolicyholderOptions
);
const TotalNumberOfClaimsSubmittedPaidRejectedByPolicyholderSeries = ref(
  chartData.TotalNumberOfClaimsSubmittedPaidRejectedByPolicyholderSeries
);
const TotalNumberOfInsuredPersonsByInstitution = ref(
  chartData.TotalNumberOfInsuredPersonsByInstitution
);

const TotalNumberOfInsuredPersonsByInstitutionOptions = ref(
  chartData.TotalNumberOfInsuredPersonsByInstitutionOptions
);

const TotalPremiumCollectedByPolicyholders = ref(
  chartData.TotalPremiumCollectedByPolicyholders
);
const TotalPremiumCollectedByPolicyholdersOptions = ref(
  chartData.TotalPremiumCollectedByPolicyholdersOptions
);

const updateChartData = () => {
  if (selectedFilter.value === 'monthly') {
    series.value[0].data = [30, 40, 45, 50, 49, 60, 70, 91, 80, 75, 65, 55];

    BarOptions.value = {
      chart: {
        id: 'claims-bar',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };
  } else if (selectedFilter.value === 'quarterly') {
    BarOptions.value = {
      chart: {
        id: 'claims-bar',
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      },
    };
    series.value[0].data = [115, 150, 165, 175];
  } else if (selectedFilter.value === 'annually') {
    BarOptions.value = {
      chart: {
        id: 'claims-bar',
      },
      xaxis: {
        categories: ['2019', '2020', '2021', '2022'],
      },
    };
    series.value[0].data = [78, 50, 65, 105];
  }
};

const selectedFilter = ref('Monthly')
</script>
<template>
  <div class="flex gap-2">
    <CardBoxWidget label="members" trend="12%" trend-type="up" color="text-emerald-500" :icon="mdiAccountMultiple"
      :number="900" class="flex-1 bg-white" />
    <CardBoxWidget label="Destination Country" trend="12%" trend-type="up" color="text-emerald-500"
      :icon="mdiLocationEnter" :number="45" class="flex-1" />
    <CardBoxWidget label="Issued Certificates By Agency" trend="12%" trend-type="up" color="text-emerald-500"
      :icon="mdiAccountMultiple" :number="12" class="flex-1" />
    <CardBoxWidget label="Issued Certificates By Branch" trend="12%" trend-type="up" color="text-emerald-500"
      :icon="mdiAccountMultiple" :number="12" class="flex-1" />
  </div>
  <div class="bg-white p-4 rounded-2xl my-8 flex items-center justify-between">
    <h1 class="font-extrabold text-gray-900 dark:text-white md:text-5xl text-lg">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-blue-400">Certificates
        Analysis</span>
    </h1>
    <div class="">
      <select id="filter" v-model="selectedFilter" @change="updateChartData"
        class="border-primary border-none shadow-sm rounded-lg text-primary">
        <option value="monthly" class="text-primary w-full rounded-lg">
          Monthly
        </option>
        <option value="quarterly">Quarterly</option>
        <option value="semiannually">Semi-Annually</option>
        <option value="annually">Annually</option>
      </select>
    </div>
  </div>

  <div class="flex gap-2">
    <analyticsWidget trend="12%" trend-type="up" color="text-emerald-500" :number="149"
      label="Issued Certificates/week" />
    <analyticsWidget trend="12%" trend-type="up" color="text-blue-500" :icon="mdiCartOutline" :number="2000"
      label="Requested Certificates/Month" />
    <analyticsWidget trend="40%" trend-type="down" color="text-red-500" :icon="mdiChartTimelineVariant" :number="854"
      suffix="" label="Issued Certificates/Month" />
  </div>
  <div class="w-full grid grid-cols-12 my-6 gap-8 text-center">
    <div class="col-span-6 h-[500px] bg-white p-8 rounded-2xl">
      <span class="text-lg text-primary text-ellipsis mb-3 flex items-center justify-center">Certificates Issued By
        Month
      </span>
      <apexchart width="100%" height="90%" type="bar" :options="BarOptions" :series="series"></apexchart>
    </div>

    <div class="col-span-6 h-[500px] bg-white p-8 rounded-2xl">
      <span class="text-lg text-primary text-ellipsis mb-3 flex items-center justify-center">Certificates Issued By
        Country of Destination
      </span>
      <apexchart width="100%" height="90%" type="donut" :options="TotalPremiumCollectedByPolicyholdersOptions"
        :series="TotalPremiumCollectedByPolicyholders"></apexchart>
    </div>

    <!-- <div class="col-span-6 h-[500px] bg-white p-8 rounded-2xl">
          <span class="text-lg text-primary text-ellipsis mb-3 flex items-center justify-center">Total Loss Ratio by
            Policyholder and Cover Types
          </span>
          <apexchart width="100%" height="90%" type="bar" :options="PolicyHolderOrCoverTypesOptions"
            :series="PolicyHolderOrCoverTypesSeries"></apexchart>
        </div> -->
    <!-- <div class="col-span-6 h-[500px] bg-white p-8 rounded-2xl">
          <span class="text-lg text-primary text-ellipsis mb-3 flex items-center justify-center">Paid Claims by Providers
            and Service Types:
          </span>
          <apexchart width="100%" height="90%" type="bar" :options="PaidClaimsByProvidersAndServiceTypesOptions"
            :series="PaidClaimsByProvidersAndServiceTypesSeries"></apexchart>
        </div> -->
    <!-- <div class="col-span-6 h-[500px] bg-white p-8 rounded-2xl">
          <span class="text-lg text-primary text-ellipsis mb-3 flex items-center justify-center">Total Claims Created by
            Insurer/Provider/Claimants
          </span>
          <apexchart type="pie" width="100%" height="90%" :options="TotalClaimsCreatedByInsurerOptions"
            :series="TotalClaimsCreatedByInsurerSeries"></apexchart>
        </div> -->

    <div class="col-span-6 h-[500px] bg-white p-8 rounded-2xl">
      <span class="text-lg text-primary text-ellipsis mb-3 flex items-center justify-center">Issued Certificates By
        Insurance Branch</span>
      <apexchart width="100%" height="90%" type="bar" :options="TotalNumberOfClaimsSubmittedPaidRejectedByPolicyholderOptions
        " :series="TotalNumberOfClaimsSubmittedPaidRejectedByPolicyholderSeries
    "></apexchart>
    </div>
    <div class="col-span-6 h-[500px] bg-white p-8 rounded-2xl">
      <span class="text-lg text-primary text-ellipsis mb-3 flex items-center justify-center">Top 5 Countries With the
        Highest Number of Issued Certificates
      </span>
      <apexchart type="area" height="350" :options="TotalNumberOfInsuredPersonsByInstitutionOptions"
        :series="TotalNumberOfInsuredPersonsByInstitution"></apexchart>
    </div>

  </div>
</template>