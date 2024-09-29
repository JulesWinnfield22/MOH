<script setup>
import { Form, Select, Input } from '@com/new_form_elements';
import Button from '@com/Button.vue';
import { ref, computed, watch } from 'vue';

const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
    default: () => ({}), // Correctly initialize user to an empty object
  },
  universities: {
    type: Array,
    default: () => [], // Use a function to return an empty array
  },
  onSubmit: {
    type: Function,
  },
});
console.log(props.user)
const user = ref({})
if(Object.keys((props.user || {})).length > 0) {
  const [title, firstName, fathersName, grandFathersName] = props.user.fullName.split(" ")
  user.value = {
    ...props.user,
    title,
    firstName,
    fathersName,
    grandFathersName,
  };
}

const type = ref(props.user?.userType || '');
const selectedOption = ref([]);
const isOtherSelected = ref(false);
const InputNewUniversity = ref('');

const combinedOptions = computed(() => {
  const otherOption = [];

  const universityOptions = props.universities.map((el) => ({
    label: el.universityName,
    value: el.universityName,
  }));

  return [...otherOption, ...universityOptions];
});

// Watch the selected option to detect when "Other" is selected
watch(selectedOption, (newVal) => {
  isOtherSelected.value = newVal === 'other';
  if (!isOtherSelected.value) {
    InputNewUniversity.value = ''; // Reset input if "Other" is not selected
  }
});

function submitForm({ values, reset }) {
  props.onSubmit(values);
  reset();
}

console.log(props.user.universityName);
</script>

<template>

  <Form v-slot="{ submit }" id="userForm" class="flex flex-col gap-6 p-6 bg-white shadow-md rounded-lg">
  <h2 class="text-lg font-semibold mb-4">User Information</h2>
  
  <div class="grid user-form-grid gap-6">
    <Select
      validation="required"
      label="Title"
      name="title"
      :options="['Mrs.', 'Mr.', 'Dr']"
      v-model="user.title"
      :attributes="{ placeholder: 'Select Title' }"
    />
    
    <Input
      validation="required"
      label="First Name *"
      name="firstName"
      v-model="user.firstName"
      :attributes="{ placeholder: 'Enter Your First Name' }"
    />
    
    <Input
      validation="required"
      label="Father's Name *"
      name="fathersName"
      v-model="user.fathersName"
      :attributes="{ placeholder: 'Enter Your Fathers Name' }"
    />
    
    <Input
      validation="required"
      label="Grandfather's Name *"
      name="grandFathersName"
      v-model="user.grandFathersName"
      :attributes="{ placeholder: 'Enter Your Grandfathers Name' }"
    />
  </div>
  
  <div class="grid grid-cols-2 gap-6">
    <Input
      label="Phone *"
      name="phone"
      v-model="user.phone"
      validation="required|phone"
      :attributes="{ placeholder: 'Enter your phone number' }"
    />
    
    <Input
      label="Email *"
      name="email"
      v-model="user.email"
      validation="required|email"
      :attributes="{ type: 'email', placeholder: 'Enter Your Email' }"
    />
    
    <Input
      validation="required"
      label="Birth Date *"
      name="birthDate"
      v-model="user.dateOfBirth"
      :attributes="{ type: 'date', placeholder: 'Enter Your Birth Date' }"
    />
    
    <Select
      label="Gender *"
      name="gender"
      v-model="user.gender"
      :options="['Male', 'Female']"
      validation="required"
      :attributes="{ placeholder: 'Select Gender' }"
    />
  </div>
  
  <div class="grid grid-cols-2 gap-6">
    <Select
      v-model="type"
      label="User Role *"
      name="userType"
      :options="['HRDI', 'University', 'LegalOffice']"
      validation="required"
      :attributes="{ placeholder: 'Select User Type' }"
    />
    
    <Select
      v-if="type === 'University'"
      :obj="true"
      label="University *"
      name="universityUuid"
      :options="universities.map(el => ({ label: el.universityName, value: el.universityUuid }))"
      validation="required"
      :attributes="{ placeholder: 'Select University' }"
    />
  </div>
  
  <Button
    :pending="pending"
    @click.prevent="submit(submitForm)"
    type="secondary"
    class="mt-4"
  >
    Submit
  </Button>
</Form>
</template>

<style>
.user-form-grid {
  grid-template-columns: 6rem repeat(3, 1fr);
}
</style>
