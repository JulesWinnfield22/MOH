<script setup>
  import FormSubmitButton from '@com/FormSubmitButton.vue';
  import { Form, Input, Select, InputPassword } from '@com/form_elements'
  import { watch, ref } from 'vue';
  
  const _filter = ref({
    username: true,
    password: true
  })
  
  const props = defineProps({
    user: {
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
    roleOptions: {
      required: true
    },
    pending: {
      type: Boolean,
      default: false
    }
  })

  function submitUser({values}) {
    props.onSubmit && props.onSubmit(values)
  }

  watch(props, () => {
    _filter.value = {
      ..._filter.value,
      ...props.filter
    }
  }, {
    immediate: true
  })
</script>
<template>
  <Form v-slot="{ submit }" class="grid grid-cols-2 grid-flow-row gap-4">
    <div class="col-span-2 flex gap-4">
      <Input
        class="flex-1"
        name="firstName"
        validation="required"
        label="First Name"
        :value="user?.['firstName'] || ''"
        placeholder="first name"
      />
      <Input
        class="flex-1"
        name="fatherName"
        validation="required"
        label="Father Name"
        :value="user?.['fatherName'] || ''"
        placeholder="last name"
      />
      <Select
        class="flex-1"
        name="gender"
        validation="required"
        label="Gender"
        :options="['Male', 'Female']"
        :value="user?.['gender'] || ''"
        placeholder="23"
      />
    </div>
    <!-- <div class="flex gap-4"> -->
      <Input
        class="flex-1"
        name="email"
        validation="required|email"
        label="Email"
        :value="user?.['email'] || ''"
        placeholder="name@mail.com"
      />
      <Input
        class="flex-1"
        name="mobileNumber"
        validation="required|phone"
        label="Phone number"
        :value="user?.['mobileNumber'] || ''"
        placeholder="0987654321"
      />
    <!-- </div> -->
    <!-- <div class="flex gap-4"> -->
      <Input
        class="flex-1"
        name="age"
        validation="required|num-(not a valid age)"
        label="Age"
        :value="user?.['age'] || ''"
        placeholder="23"
      />
      <Input
        v-if="_filter.username"
        class="flex-1"
        name="username"
        validation="required"
        label="Username"
        :value="user?.['username'] || ''"
        placeholder="@name"
        />
      <!-- </div> -->
      <!-- <div class="flex gap-4"> -->
        <InputPassword
          v-if="_filter.password"
          class="flex-1"
          name="password"
          validation="required"
          label="Password"
          :value="user?.['password'] || ''"
          placeholder="secret"
          />
          <InputPassword
          v-if="_filter.password"
          class="flex-1"
          name="repeatPassword"
          validation="required|equalTo-password"
          label="Confirm Password"
          :value="user?.['repeatPassword'] || ''"
          placeholder="repeat secret"
        />
    <!-- </div> -->
    <!-- <div class="flex gap-4"> -->
      <Select
        class="flex-1"
        name="role"
        validation="required"
        label="Role"
        :value="user?.['role'] || ''"
        placeholder="role"
        :options="roleOptions"
      />
      <Select
        class="flex-1"
        name="status"
        validation="required"
        label="Status"
        :value="user?.['status'] || ''"
        placeholder="status"
        :options="['Pending', 'Active', 'Disabled']"
      />
    <!-- </div> -->
    <!-- <div class="flex gap-4"> -->
      <Input
        class="flex-1"
        name="country"
        validation="required"
        label="Country"
        :value="user?.['country'] || ''"
        placeholder="Ethiopia"
      />
      <Input
        class="flex-1"
        name="address"
        validation="required"
        label="Address"
        :value="user?.['address'] || ''"
        placeholder="address"
      />
    <!-- </div> -->
    <FormSubmitButton
      :pending="pending"
      class="col-span-2"
      @click.prevent="submit(submitUser)"
      :btn-text="btnText"
    />
  </Form>
</template>