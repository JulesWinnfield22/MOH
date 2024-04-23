<script setup>
  import FormLayout from '@/components/FormLayout.vue';
  import CertificateReports from '../habus_report/certificateReports.vue'
  import { Input, Select } from '@/components/form_elements';
  import ReportDataProvider from '@/features/report/components/ReportDataProvider.vue'
  import FormLoading from '@/components/FormLoading.vue';
  import { getAllReports } from '@/features/report/api/reportApi'
  import { useApiRequest } from '@composable/useApiRequest'
  import Tabs from '@/components/Tabs.vue';
  import Report from '@/features/report/components/Report.vue'
  import Summury from '@/features/report/components/Summury.vue'
  import { ref, watch } from 'vue';
  
  const reportReq = useApiRequest()

  const filtered = ref()
  function getReport(certificate, values) {
    filtered.value = certificate
    .filter(el => {
      const beginDate = new Date(values['beginDate'])
      const endDate = new Date(values['endDate'])
      const issuedDate = new Date(el.issuedDate)
      return issuedDate >= beginDate && issuedDate <= endDate
    })
    .filter(el => {
      if(!values.branchUuid) return el
      return el.branchUuid == values.branchUuid
    })
    .filter(el => {
      if(!values.agencyUuid) return el
      return el.agencyUuid == values.agencyUuid
    })
    .filter(el => {
      if(!values.destination) return el
      return el.destination == values['destination']
    })
    .filter(el => {
      if(!values.gender) return el
      return el.gender == values['gender']
    })
  }

  watch(filtered, el => {
    console.log(filtered.value)
  })

</script>
<template>
  <div class="bg-white p-2 flex flex-col gap-2 rounded-t-md">
    <p class="m-2 text-xl font-bold">Report</p>
    <ReportDataProvider v-slot="{ pending, reports }">
      {{ console.log(reports) }}
      <FormLayout v-slot="{ submit }" v-if="!pending" class="px-2">
        <div class="flex flex-col gap-1">
          <p class="text-sm font-medium mr-auto">Date Range</p>
          <div class="flex gap-2 items-center">
            <Input
              value="2023-06-29"
              type="date"
              name="beginDate"
            />
            To
            <Input
              type="date"
              name="endDate"
            />
          </div>
        </div>
        <!-- <div class="flex flex-col gap-1">
          <p class="text-sm font-medium mr-auto">Age Range</p>
          <div class="flex gap-2 items-center">
            <Input
              class="w-24"
              name="minAge"
              placeholder="18"
              validation="num"
            />
            To
            <Input
              class="w-24"
              placeholder="25"
              name="maxAge"
              validation="num"            
            />
          </div>
        </div> -->
        <div class="col-span-2 flex gap-2">
          <Select
            :obj="true"
            class="flex-1"
            name="branchUuid"
            label="Branch"  
            :options="reports.branches.map(el => ({label: el.branch, value: el.insuranceUuid}))"
          />
          <Select
            :obj="true"
            class="flex-1"
            name="agencyUuid"
            label="Agency"
            :options="reports.agencies.map(el => ({label: el.agencyName, value: el.agencyUuid}))"
          />
          <Select
            class="flex-1"
            name="destination"
            :options="reports.coutries"
            label="Destination Country"
          />
          <Select
            class="flex-1"
            name="gender"
            label="Gender"
            :options="['Male', 'Female']"
          />
        </div>
        <div class="col-span-2 flex justify-end items-center">
          <button @click.prevent="submit(({values}) => getReport(reports.certificates, values))" class="bg-primary w-full px-4 py-2 rounded-md text-white">Generate Report</button>
        </div>
      </FormLayout>
      <FormLoading v-else />
      <div v-if="filtered" class="p-3 border-t-2 rounded-b-md bg-white">
        <Tabs
          :tabs="{
            report: {
              component: Report,
              props: {
                filtered
              }
            },
            summary: {
              component: Summury,
              props: {
                certificates: reports.certificates
              }
            },
          }"
        >
        </Tabs>
      </div>
    </ReportDataProvider>
  </div>
  <!-- <CertificateReports /> -->
</template>