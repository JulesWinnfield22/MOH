<template>
  <div>
    <vue-apex-charts type="line" :options="chartOptions" :series="chartSeries" height="400" />
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
          type: 'line',
          background: 'white',
        },
        stroke: {
          width: 2, // Default line thickness
        },
        title: {
          text: 'Migration Flow Map',
          align: 'center',
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          title: {
            text: 'Volume of Migration',
          },
        },
      },
      chartSeries: [
        {
          name: 'Migration by Region',
          data: [
            { x: new Date('2023-01-01').getTime(), y: 100 },
            { x: new Date('2023-02-01').getTime(), y: 200 },
            { x: new Date('2023-03-01').getTime(), y: 150 },
            { x: new Date('2023-04-01').getTime(), y: 300 },
          ],
        },
        {
          name: 'Migration over Time',
          data: [
            { x: new Date('2023-01-01').getTime(), y: 50 },
            { x: new Date('2023-02-01').getTime(), y: 300 },
            { x: new Date('2023-03-01').getTime(), y: 75 },
            { x: new Date('2023-04-01').getTime(), y: 150 },
          ],
        },
      ],
    };
  },
});
</script>