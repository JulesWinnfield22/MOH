<script setup>
import FormLayout from '@/components/FormLayout.vue';
import FormSubmitButton from '@/components/FormSubmitButton.vue';
import { Input, Select } from '@com/form_elements'

const props = defineProps({
  branch: {
    type: Object
  },
  btnText: {
    type: String
  },
  onSubmit: {
    type: Function,
    default: f => f
  },
  filter: {
    type: Object,
    default: {}
  },
  insuranceOptions: {
    type: Array,
    requried: true
  },
  pending: {
    type: Boolean,
    default: false
  }
})

function submitBranch({ values }) {
  props.onSubmit && props.onSubmit(values)
}
</script>
<template>
  <FormLayout v-slot="{ submit }">
    <Input
      :disabled="true"
      name="insuranceName"
      validation="required"
      label="Insurance Name"
      placeholder="name"
      :options="insuranceOptions"
      :value="'Nyala Insurance S.C.'"
    />
    <Input
      name="branch"
      validation="required"
      label="Branch Name"
      placeholder="branch"
      :value="branch?.['branch'] || ''"
    />
    <Input
      name="email"
      validation="required|email"
      label="Email"
      placeholder="email@gmail.com"
      :value="branch?.['email'] || ''"
    />
    <Input
      name="telephone"
      validation="required|phone"
      label="Phone Number"
      placeholder="telephone"
      :value="branch?.['telephone'] || ''"
    />
    <Input
      name="description"
      validation="required"
      label="Description"
      placeholder="description"
      :value="branch?.['description'] || ''"
    />
    <Input
      name="code"
      validation="required"
      label="Code"
      placeholder="code"
      :value="branch?.['code'] || ''"
    />
    <p class="font-semibold border-b col-span-2">Address</p>
    <div class="col-span-2 flex gap-2 flex-wrap">
      <Input
        class="flex-1"
        label="Wereda"
        name="address1"
        placeholder="Wereda"
        validation="required"
        :value="branch?.['address1'] || ''"
      />
      <Input
        class="flex-1"
        label="Subcity"
        name="address2"
        placeholder="subcity"
        validation="required"
        :value="branch?.['address2'] || ''"
      />
      <Input
        class="flex-1"
        label="City"
        name="address3"
        placeholder="City"
        validation="required"
        :value="branch?.['address3'] || ''"
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
        :value="branch?.['state'] || ''"
      />
    </div>
    <Input
      name="country"
      placeholder="Country"
      label="Country"
      :value="branch?.['country'] || 'Ethiopia'"
    />
    <Select
      name="status"
      validation="required"
      label="Status"
      :value="branch?.['status'] || 'Active'"
      :options="['Active', 'Pending']"
    />
    <FormSubmitButton
      class="col-span-2"
      :pending="pending"
      @click.prevent="submit(submitBranch)"
      :btn-text="btnText"
    />
  </FormLayout>
</template>