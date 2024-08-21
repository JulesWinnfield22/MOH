<script setup>
import { Form, Input, Select, InputPassword } from '@com/new_form_elements';
import Button from '@com/Button.vue';
import { ref, computed, watch } from 'vue';

const props = defineProps({
  pending: {
    type: Boolean,
    default: false
  },
  universities: {
    type: Array,
    default: [],
  },
  onSubmit: {
    type: Function
  }
});
const type = ref('');
const selectedOption = ref([]);
const isOtherSelected = ref(false);
const InputNewUniversity = ref('');
const combinedOptions = computed(() => {
  const otherOption = [{ label: 'Other', value: 'other' }];

  const universityOptions = props.universities.map((el) => ({
    label: el.universityName,
    value: el.universityUuid,
  }));

  return [...otherOption, ...universityOptions];
});
watch(selectedOption, (newVal) => {
  isOtherSelected.value = newVal === 'other';
  if (!isOtherSelected.value) {
    InputNewUniversity.value = ''; // Reset custom gender if "Other" is not selected
  }
});

function submitForm({ values, reset }) {
  props.onSubmit(values);
  console.log('sdf');
  reset();
}

</script>

<template>
  <Form v-slot="{ submit }" id="userForm" class="flex flex-col gap-4">
    <div class="grid user-form-grid gap-4">
      <Input
      
      label="batchNumber"
      name="batchNumber"
      validation="required"
      :attributes="{ type: 'text', placeholder: 'Batch Number' }"
    />
      <Input
      
        label="ernpId"
        name="ernpId"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'ERNP ID' }"
      />
      <Input
      
        label="Full Name"
        name="fullName"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Your Full Name' }"
      />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <Input
        label="Phone"
        name="phone"
        validation="required|phone"
        :attributes="{ placeholder: 'Enter Your Phone Number' }"
      />
      <Input
        label="Email"
        name="email"
        validation="required|email"
        :attributes="{ type: 'text', placeholder: 'Enter Your Email' }"
      />
      <Input
        label="Birth Date"
        name="dateOfBirth"
        validation="required"
        :attributes="{ type: 'date', placeholder: 'Enter Your Birth Date' }"
      />
      <Select
        label="Gender"
        name="gender"
        :options="['Male', 'Female']"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Select Gender' }"
      />
      <Input
        label="Address"
        name="address"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Your Address' }"
      />
      <Input
        label="Duration"
        name="duration"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Duration' }"
      />
      <Select
        label="University"
        name="universityName"
        :options="universities.map(el => el.universityName)"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Select University' }"
      />
      <Input
        label="Program"
        name="programName"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Program Name' }"
      />
      <Input
        label="salary"
        name="salary"
        
        :attributes="{ type: 'text', placeholder: 'salary' }"
      />
      <Input
        label="totalSalary"
        name="totalSalary"
       
        :attributes="{ type: 'text', placeholder: 'COntract Amount' }"
      />
    </div>

    <Button :pending="pending" @click.prevent="submit(submitForm)" type="secondary">
      Submit
    </Button>
  </Form>
</template>

<style>
.user-form-grid {
  grid-template-columns: 6rem repeat(3, 1fr);
}
</style>
