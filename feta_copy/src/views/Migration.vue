<template>
  <div>
    <vue-apex-charts type="bar" :options="chartOptions" :series="chartSeries" height="400" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  components: {
    VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 400,
          type: 'bar',
          stacked: true,
          background: 'white',
        },
        xaxis: {
          categories: ['Region A', 'Region B', 'Region C', 'Region D'],
        },
        yaxis: {
          title: {
            text: 'Number of People',
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        legend: {
          position: 'top',
        },
      },
      chartSeries: [
        {
          name: 'Country 1',
          data: [100, 200, 150, 300],
        },
        {
          name: 'Country 2',
          data: [50, 80, 120, 250],
        },
        {
          name: 'Country 3',
          data: [80, 120, 100, 200],
        },
      ],
    };
  },
});
</script>