<script setup>
import { Form, Input, Select, InputPassword } from '@com/new_form_elements';
import Button from '@com/Button.vue'
import { ref, watch } from 'vue'
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
})

const type = ref()

function submitForm({values, reset}) {
	props.onSubmit(values)
	reset()
}
</script>
<template>
  <Form v-slot="{ submit }" id="userForm" class="flex flex-col gap-4">
    <div class="grid user-form-grid gap-4">
      <Select
        label="Title"
        name="title"
        :options="['Mrs.', 'Mr.', 'Dr.']"
        :value="'Mrs.'"
				:attributes='{
					type: "text"
				}'
      />
      <Input label="First Name" name="firstName" validation="required" />
      <Input label="Fathers Name" name="fathersName" validation="required" />
      <Input
        label="Grand Fathers Name"
        name="grandFathersName"
        validation="required"
      />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <Input label="Phone" name="phone" validation="required|phone" />
      <Input label="Email" name="email" validation="required|email" />
			<Input label="Birth Date" :attributes="{type: 'date'}" validation="required" name="birthDate"  />
			<Select
				label="Gender"
				name="gender"
				:options="['Male', 'Female']"
				:value="'Female'"
				validation="required"
				:attributes='{
					type: "text"
				}'
			/>
			<Select
				v-model="type"
				label="User Type"
				name="usertype"
				:options="['HRDI', 'University', 'LegalOffice', 'Student']"
				validation="required"
				:attributes='{
					type: "text"
				}'
			/>
			<Select
				v-if="type == 'University'"
				:obj="true"
				label="University"
				name="officialOfUniversity"
				:options="universities.map(el => ({label: el.universityName, value: el.universityId}))"
				validation="required"
				:attributes='{
					type: "text"
				}'
			/>
    </div>
		<div class="grid grid-cols-2 gap-4">
			<InputPassword
				label="Password"
				name="password"
				validation="required"
			/>
			<InputPassword
				:skip="true"
				label="Confirm Password"
				name="confirmPassword"
				validation="required|equalTo-password"
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
