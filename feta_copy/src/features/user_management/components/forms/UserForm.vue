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
    agenciesOption: {
      type: Array,
      required: true
    },
    branchesOptions: {
      type: Array,
      required: true
    },
    pending: {
      type: Boolean,
      default: false
    }
  })

  function submitUser({values, reset}) {
    props.onSubmit && props.onSubmit(values, reset)
  }

  watch(props, () => {
    _filter.value = {
      ..._filter.value,
      ...props.filter
    }
  }, {
    immediate: true
  })

  const type = ref(props.user?.['userType'] || '')

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
      <Input
        class="flex-1"
        name="grandFatherName"
        validation="required"
        label="Grand Father Name"
        :value="user?.['grandFatherName'] || ''"
        placeholder="last name"
      />
    </div>
      <Select
        name="title"
        label="Title"
        validation="required"
        placeholder="title"
        :value="user?.['title'] || 'Ms.'"
        :options="['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']"
      />
      <Select
        name="userType"
        label="User Type"
        validation="required"
        placeholder="type"
        v-model="type"
        :options="['Insurance', 'Agency']"
      />
      <Select
        v-if="type == 'Insurance'"
        :obj="true"
        name="insuranceUuid"
        label="Branch Name"
        validation="required"
        placeholder="Branch"
        :value="user?.['insuranceUuid'] || ''"
        :options="branchesOptions"
      />
    <!-- <div class="flex gap-4"> -->
      <Input
        class="flex-1"
        name="mobilePhone"
        validation="required|phone"
        label="Phone number"
        :value="user?.['mobilePhone'] || ''"
        placeholder="0987654321"
      />
      <Input
        class="flex-1"
        name="email"
        validation="required|email"
        label="Email"
        :value="user?.['email'] || ''"
        placeholder="name@mail.com"
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
      <Select
        :obj="true"
        class="flex-1"
        name="roleId"
        validation="required"
        label="Role"
        :value="user?.['roleId'] || ''"
        placeholder="role"
        :options="roleOptions"
      />
      <Select
        class="flex-1"
        name="userStatus"
        validation="required"
        label="Status"
        :value="user?.['userStatus'] || ''"
        placeholder="status"
        :options="['Pending', 'Active', 'Disabled']"
      />
      <Select
        v-if="type != 'Insurance'"
        :obj="true"
        class="flex-1"
        name="agencyUuid"
        validation="required"
        label="Agency"
        :value="user?.['agencyUuid'] || ''"
        placeholder="Branch"
        :options="agenciesOption"
      />
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
    <FormSubmitButton
      :pending="pending"
      class="col-span-2"
      @click.prevent="submit(submitUser)"
      :btn-text="btnText"
    />
  </Form>
</template>