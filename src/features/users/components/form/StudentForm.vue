<script setup>
import { Form, Input, Select, InputPassword } from '@com/new_form_elements';
import Button from '@com/Button.vue';
import { ref, computed, watch } from 'vue';

const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  universities: {
    type: Array,
    default: () => [],
  },
  onSubmit: {
    type: Function,
  },
});

const selectedRow = ref({});
const type = ref('');
const selectedOption = ref([]);
const isOtherSelected = ref(false);
const InputNewUniversity = ref('');
const uniId = ref('');
const selectedProgramUuid = ref('')
// Duration selection
const selectedDuration = ref('');
const customDuration = ref('');
const isOther = ref(false);
const durationOptions = [2, 3, 4, 5, 6, 'Other'];

// Combined university options
const combinedOptions = computed(() => {
  const otherOption = [{ label: 'Other', value: 'other' }];
  const universityOptions = props.universities.map((el) => ({
    label: el.universityName,
    value: el.universityUuid,
  }));
  return [...otherOption, ...universityOptions];
});

const program = computed(() => {
  return props.universities.find(el => el.universityName === uniId.value)?.programs || [];
});

// Watch for "Other" option selection
watch(selectedOption, (newVal) => {
  isOtherSelected.value = newVal === 'other';
  if (!isOtherSelected.value) {
    InputNewUniversity.value = ''; // Reset custom university if "Other" is not selected
  }
});

// Watch for duration selection
watch(selectedDuration, (newVal) => {
  isOther.value = newVal === 'Other';
  if (!isOther.value) {
    customDuration.value = ''; // Reset custom duration if "Other" is not selected
  }
});

function checkOtherOption() {
  isOther.value = selectedDuration.value === 'Other';
}

function submitForm({ values, reset }) {
  // Combine all values to submit
  values.customDuration = isOther.value ? customDuration.value : selectedDuration.value;
  props.onSubmit(values, reset);
}
</script>
<template>
  <Form v-slot="{ submit }" id="userForm" class="flex flex-col p-5 gap-4">
    <div class="grid grid-cols-4 gap-4">
      <!-- Batch Number Input -->
      <Input :value="$route.params.batchId" label="Batch Number" name="batchNumber" validation="required"
        :attributes="{ type: 'text', disabled: true, placeholder: 'Batch Number' }" />

      <!-- ERNP ID Input -->
      <Input label="Ernp Id" name="ernpId" validation="required"
        :attributes="{ type: 'text', placeholder: 'ERNp ID' }" />

      <!-- Full Name Input -->
      <div class="col-span-2">
        <Input label="Full Name" name="fullName" validation="required"
          :attributes="{ type: 'text', placeholder: 'Enter Your Full Name' }" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <Input label="Phone" name="phone" validation="required|phone"
        :attributes="{ placeholder: 'Enter Your Phone Number' }" />
      <Input label="Email" name="email" validation="required|email"
        :attributes="{ type: 'text', placeholder: 'Enter Your Email' }" />
      <Input label="Birth Date" name="dateOfBirth" validation="required"
        :attributes="{ type: 'date', placeholder: 'Enter Your Birth Date' }" />
      <Select label="Gender" name="gender" :options="['Male', 'Female']" validation="required"
        :attributes="{ type: 'text', placeholder: 'Select Gender' }" />


      <Select :skip="isOther" label="Duration" name="duration" v-model="selectedDuration" :options="durationOptions"
        validation="required" @change="checkOtherOption"
        :attributes="{ placeholder: 'Select Duration', type: 'text' }" />

      <Input v-if="isOther" label="Duration" type="number" name="duration" v-model="customDuration" :attributes="{
        placeholder: 'Enter Duration', type: 'number'
      }" />
      <Input label="Address" name="address" validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Your Address' }" />
      <Select v-model="uniId" :obj="true" label="University" name="universityName"
        :options="universities.map(el => ({ label: el.universityName, value: el.universityName }))"
        validation="required" :attributes="{ type: 'text', placeholder: 'Select University' }" />
      <Select v-model="selectedProgramUuid" :obj="true"
        :options="program.map(el => ({ label: el.programName, value: el.programName }))" label="Program"
        name="programName" validation="required" :attributes="{ type: 'text', placeholder: 'Enter Program Name' }" />
      <Input label="Salary" name="salary" validation="required|num"
        :attributes="{ placeholder: 'Salary' }" />
      <Input label="total salary" name="totalSalary" validation="required|num"
        :attributes="{ placeholder: 'Total' }" />
      <Input label="Contract Amount" name="totalTrainingCost" validation="required|num"
        :attributes="{ placeholder: 'Contract Amount' }" />
    </div>

    <Button :pending="pending" @click.prevent="submit(submitForm)" type="secondary" class="py-3 gap-3 my-5">
      Add Resident
    </Button>
  </Form>
</template>
