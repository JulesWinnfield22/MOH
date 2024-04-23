<script setup>
  import FormSubmitButton from '@/components/FormSubmitButton.vue';
  import countries from '@/utils/coutries';
  import {Input, Select } from '@com/form_elements'
  import FormLayout from '@com/FormLayout.vue'
  import { getTypesOfCategories, removeClaimService } from '@/features/claims/api/serviceApi'
  import { useApiRequest } from '@/composables/useApiRequest'
  import { ref, watch } from 'vue';
  import TableWrapper from '@/components/TableWrapper.vue';
  import BaseIcon from '@/views/BaseIcon.vue';
  import { mdiClose } from '@mdi/js';

  const req = useApiRequest()
  const deleteClaimReq = useApiRequest()

  const props = defineProps({
    btnText: {
      type: String,
      requried: true
    },
    categories: {
      type: Array,
      requried: true,
    },
    selectedClaims: {
      type: Array
    },
    showSelectedService: {
      type: Boolean,
      default: false
    },
    onSubmit: {
      type: Function,
      requried: true
    },
    claim: {
      type: Object
    },
    pending: {
      type: Boolean,
      default: false
    }
  })

  const category = ref('')
  const serviceGroupUuid = ref('')
  
  watch(category, () => {
    req.send(
      () => getTypesOfCategories(category.value),
    )
  }, {
    immediate: true
  })

  function submitClaim({ values }) {
    props.onSubmit((props.onSubmit({
      ...values,
      serviceGroupUuid: serviceGroupUuid.value,
      amount: req.response.value?.find(el => el.serviceGroupUuid == serviceGroupUuid.value)?.amount
    })))
  }

  console.log(props.selectedClaims)
  const selectedServices = ref(props.selectedClaims ? props.selectedClaims.reduce((state, el) => {
    state[el.category] = el
    return state
  }, {}) : {})

  function addService(id) {
    const service  = req.response.value?.find(el => el.serviceGroupUuid == id)
    selectedServices.value[service.category] = service
  }

</script>

<template>
  <FormLayout v-slot="{ submit }">
    <Input
      type="date"
      name="incidentDate"
      validation="required"
      placeholder="claim"
      label="Incident Date"
      :value="props.selectedClaims?.[0]?.incidentDate || ''"
    />
    <Select
      name="placeOfIncident"
      label="Place Of Incident"
      validation="required"
      :options="countries.toSorted()"
      :value="props.selectedClaims?.[0]?.placeOfIncident || ''"
    />
    <Select
      label="Claim Category"
      validation="required"
      v-model="category"
      :options="categories.map(el => el.category)"
      :value="props.selectedClaims?.[0]?.category || ''"
    />
    <div class="flex flex-col gap-1">
      <p class="font-medium text-sm">Claim Type</p>
      <select
        @change="(ev) => addService(ev.target.value)"
        v-model="serviceGroupUuid"
        class="h-10 rounded-md border-gray-300 border px-1 bg-white"
        validation="required"
      >
        <option :selected="option.value == props.selectedClaims?.[0]?.serviceGroupUuid" :key="option.value" :value="option.value" v-for="option in req.response.value ? req.response.value.reduce((state, el) => {
          state.push({
            label: el.item,
            value: el.serviceGroupUuid
          })
          return state
        }, []) : []" >{{ option.label }}</option>
      </select>
    </div>
    <div v-if="showSelectedService" class="flex flex-col gap-2 col-span-2">
      <p class="text-base font-semibold border-b">Selected</p>
      <div class="grid-3-col border-b py-1">
        <p class="text-sm font-medium">Category</p>
        <p class="text-sm font-medium">Type</p>
        <p></p>
      </div>
      <div class="grid-3-col text-sm border-b p-1" :key="name" v-for="name in Object.keys(selectedServices)">
        <p class="flex items-center">{{ name }}</p>
        <p class="flex items-center">{{selectedServices[name].item}}</p>
        <div class="flex justify-center items-center">
          <!-- <button @click.prevent="removeService(name)" class="h-8 w-8 grid place-items-center bg-gray-300 rounded-full">
            <BaseIcon :path="mdiClose" />
          </button> -->
        </div>
      </div>
    </div>
    <FormSubmitButton
      :pending="pending"
      @click.prevent="submit(submitClaim)"
      class="col-span-2"
      :btnText="btnText"
    />
  </FormLayout>
</template>

<style>
  .grid-3-col {
    display: grid;
    grid-template-columns: 1fr 1fr 3rem;
  }
</style>