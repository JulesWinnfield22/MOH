<script setup>
  import FormSubmitButton from '@/components/FormSubmitButton.vue';
import { addYear } from '@/utils/utils';
  import { Input, Select } from '@com/form_elements'
  import FormLayout from '@com/FormLayout.vue'
import { ref, watch } from 'vue';

  const _filter = ref({
    date: false
  })

  const props = defineProps({
    filter: {
      type: Object
    },
    agency: {
      type: Object
    },
    btnText: {
      type: String,
      required: true
    },
    onSubmit: {
      type: Function,
      required: true
    }
  })

  function submitAgency({ values }) {
    props.onSubmit && props.onSubmit(values)
  }

  watch(props, () => {
    _filter.value = {
      ..._filter,
      ...props.filter
    }
  }, {
    immediate: true
  })
</script>

<template>
  <FormLayout v-slot="{ submit }">
    <Input
      label="Agency name"
      name="agencyName"
      placeholder="Agency name"
      validation="required"
      :value="agency?.['agencyName'] || ''"
    />
    <Input
      label="Agency Tin Number"
      name="tinNumber"
      placeholder="Agency Tin"
      validation="required|num"
      :value="agency?.['tinNumber'] || ''"
    />
    <Input
      v-if="_filter.date"
      name="beginDate"
      type="date"
      validation="required|greaterThanToday"
      label="Effective Date"
      :value="agency?.['beginDate'] || ''"
    />
    <Input
      v-if="_filter.date"
      name="endDate"
      type="date"
      validation="greaterThanEffectiveDate-beginDate"
      label="End Date"
      :value="addYear(new Date(), 2)"
    />
    <p class="font-semibold border-b col-span-2">Address</p>
    <div class="col-span-2 flex gap-2 flex-wrap">
      <Input
        class="flex-1"
        label="Wereda"
        name="address1"
        placeholder="Wereda"
        validation="required"
        :value="agency?.['address1'] || ''"
      />
      <Input
        class="flex-1"
        label="Subcity"
        name="address2"
        placeholder="Subcity"
        validation="required"
        :value="agency?.['address2'] || ''"
      />
      <Input
        class="flex-1"
        label="City"
        name="address3"
        placeholder="City"
        validation="required"
        :value="agency?.['address3'] || ''"
      />
      <Input
        class="flex-1"
        label="Kebele"
        name="address4"
        placeholder="Kebele"
        validation="required"
        :value="agency?.['address3'] || ''"
      />
      <Input
        class="flex-1"
        label="House No."
        name="address4"
        placeholder="House No."
        validation="required"
        :value="agency?.['address3'] || ''"
      />
      <Select
        name="state"
        class=""
        label="Region"
        :options="[
          'Addis Ababa',
          'Tigray',
          'Afar', 
          'Amahara',
          'Oromia',
          'Somali',
          'Benishangul Gumz',
          'Centeral Ethiopia',
          'Gambela',
          'Harari',
          'Sidama',
          'South West Ethiopia',
          'South Ethiopia',
          'Dire Dawa',
        ]"
        :value="agency?.['state'] || ''"
      />
    </div>
    <Input
      name="contactPerson"
      validation="required"
      placeholder="fullname"
      label="Contact Person"
      :value="agency?.['contactPerson'] || ''"
    />
    <Input
      name="country"
      placeholder="Country"
      label="Country"
      :value="agency?.['country'] || 'Ethiopia'"
    />
    <Select
      name="status"
      validation="required"
      label="Status"
      :value="agency?.['status'] || 'Active'"
      :options="['Active', 'Pending', 'Disabled']"
    />
    <Input
      name="email"
      label="Email"
      :value="agency?.['email'] || ''"
      validation="required|email"
      placeholder="email@gmail.com"
    />
    <Input
      name="telephone"
      label="Phone"
      validation="required|phone"
      :value="agency?.['telephone'] || ''"
      placeholder="Phone Number"
    />
    <Input
      name="description"
      label="Description"
      validation="required"
      :value="agency?.['description'] || ''"
      placeholder="description"
    />
    <FormSubmitButton
      @click.prevent="submit(submitAgency)"
      class="col-span-2"
      :btn-text="btnText"
    />
  </FormLayout>
</template>