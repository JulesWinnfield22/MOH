<script setup>
import { Form, Select, Input } from '@com/new_form_elements';
import Button from '@com/Button.vue';
import { ref, computed, watch } from 'vue';

const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  user: Object,
  universities: {
    type: Array,
    default: [],
  },
  onSubmit: {
    type: Function,
  },
});

const user = ref({})
if(Object.keys((props.user || {})).length > 0) {
  const [title, firstName, fathersName, grandFathersName] = props.user.fullName.split(" ")
  user.value = {
    ...props.user,
    title,
    firstName,
    fathersName,
    grandFathersName
  }
}
const type = ref(props.user?.userType || '');
const selectedOption = ref([]);
const isOtherSelected = ref(false);
const InputNewUniversity = ref('');

const combinedOptions = computed(() => {
   const otherOption = [];

  const universityOptions = props.universities.map((el) => ({
    label: el.universityName,
    value: el.universityUuid,
  }));

  return [...otherOption, ...universityOptions];
});

// Watch the selected option to detect when "Other" is selected
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

console.log(props.universities)
</script>
<template>
  <Form v-slot="{ submit }" id="userForm" class="flex flex-col gap-4">
    <div class="grid user-form-grid gap-4">
      <Select
        label="Title"
        name="title"
        :options="['Mrs.', 'Mr.', 'Dr']"
        :value="user?.title || 'Mrs.'"
        :attributes="{ type: 'text', placeholder: 'Select Title' }"
      />
      <Input
        label="First Name"
        name="firstName"
        :value="user?.firstName"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Your First Name' }"
      />
      <Input
        label="Fathers Name"
        name="fathersName"
        :value="user?.fathersName"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Enter Your Fathers Name' }"
      />
      <Input
        label="Grand Fathers Name"
        name="grandFathersName"
        validation="required"
        :value="user?.grandFathersName"
        :attributes="{
          type: 'text',
          placeholder: 'Enter Your Grandfathers Name',
        }"
      />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <Input
        label="phone"
        name="phone"
        :value="user?.phone"
        validation="required|phone"
        :attributes="{ placeholder: 'Enter your phone number' }"
      />
      <Input
        label="Email"
        name="email"
        :value="user?.email"
        validation="required|email"
        :attributes="{ type: 'text', placeholder: 'Enter Your Email' }"
      />
      <Input
        label="Birth Date"
        :attributes="{ type: 'date', placeholder: 'Enter Your Birth Date' }"
        validation="required"
        name="birthDate"
        :value="user?.birthDate"
      />
      <Select
        label="Gender"
        name="gender"
        :value="user?.gender"
        :options="['Male', 'Female']"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Select Gender' }"
      />
      {{console.log(type)}}
      <Select
        v-model="type"
        label="User Type"
        name="userType"
        :options="['HRDI', 'University', 'LegalOffice']"
        validation="required"
        :attributes="{ type: 'text', placeholder: 'Select User Type' }"
      />
      <div>
        <Select
          v-if="type == 'University'"
          :obj="true"
          label="University"
          name="universityUuid"
          v-model="selectedOption"
          :options="combinedOptions"
          validation="required"
          :attributes="{ type: 'text', placeholder: 'Select University' }"
        />

        <!-- Show input if "Other" is selected -->
        <!-- <Input
          v-if="isOtherSelected"
          type="text"
          v-model="InputNewUniversity"
          name="universityName"
          :attributes="{ type: 'text', placeholder: 'Input University' }"
        /> -->
      </div>
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
    <Button
      :pending="pending"
      @click.prevent="submit(submitForm)"
      type="secondary"
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
