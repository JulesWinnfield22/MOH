<script setup>
import { Form, Input, Select, InputPassword } from '@com/new_form_elements';
import Button from '@com/Button.vue';
import { ref } from 'vue';

const props = defineProps({
  pending: {
    type: Boolean,
    default: false
  },
  universities: {
    type: Array
  },
  onSubmit: {
    type: Function
  }
});

const type = ref();

function submitForm({ values, reset, setErrors }) {
  // Simulate form submission
  const result = props.onSubmit(values);

  if (result && result.success) {
    reset(); // Reset form if submission is successful
  } else if (result && result.errors) {
    // If there are validation errors, display them
    setErrors(result.errors);
  }
}
</script>

<template>
  <Form v-slot="{ submit, setErrors }" id="userForm" class="flex flex-col gap-4">
    <div class="grid user-form-grid gap-4">
      <Select
        label="Title"
        name="title"
        :options="['Mrs.', 'Mr.', 'Dr.']"
        :value="'Mrs.'"
        :attributes="{ type: 'text', placeholder: 'Select Title' }"
      />
      <Input
        label="First Name"
        name="firstName"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Your First Name' }"
      />
      <Input
        label="Fathers Name"
        name="fathersName"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Your Fathers Name' }"
      />
      <Input
        label="Grand Fathers Name"
        name="grandFathersName"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Your Grandfathers Name' }"
      />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <Input
        label="phone"
        name="phone"
        validation="required|phone"
        :attributes="{ type: 'number', placeholder: 'Enter your phone number' }"
      />
      <Input
        label="Email"
        name="email"
        validation="required|email"
        :attributes="{ type: 'text', placeholder: 'Enter Your Email' }"
      />
      <Input
        label="Birth Date"
        :attributes="{ type: 'date', placeholder: 'Enter Your Birth Date' }"
        validation="required"
        name="birthDate"
      />
      <Select
        label="Gender"
        name="gender"
        :options="['Male', 'Female']"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Select Gender' }"
      />
      <Select
        v-model="type"
        label="User Type"
        name="usertype"
        :options="['HRDI', 'University', 'LegalOffice']"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Select User Type' }"
      />
      <Select
        v-if="type == 'University'"
        :obj="true"
        label="University"
        name="officialOfUniversity"
        :options="universities.map(el => ({ label: el.universityName, value: el.universityId }))"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Select University' }"
      />
    </div>
    <!-- <div class="grid grid-cols-2 gap-4">
      <InputPassword
        label="Password"
        name="password"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Your Password' }"
      />
      <InputPassword
        :skip="true"
        label="Confirm Password"
        name="confirmPassword"
        validation="required|equalTo-password"
        :attributes="{ type: 'text', placeholder: 'Confirm your password' }"
      />
    </div> -->
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
