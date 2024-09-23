<script setup>
import Button from '@/components/Button.vue';
import { Form, Input, InputPassword } from '@/components/new_form_elements';

const props = defineProps({
  pending: {
    type: Boolean,
    default: false
  },
	resetPassword: {
			type: Function
		},

	})
	
	function submitForm({values}) {
		props.resetPassword(values)
	}
</script>
<template>
  <div class="flex flex-col gap-6">
    <div>
      <p class="font-bold text-2xl">Enter Verification Code</p>
      <p class="text-base max-w-[70%]">
        We Have Sent A 6 digit Code to Your Email And Change Password Here
      </p>
    </div>
   
    <Form v-slot="{ submit }" id="restPassword-form" class="flex flex-col gap-4">
      <Input
				:focus="true"
        label="Code"
        name="passwordResetCode"
        :attributes="{
          placeholder: 'Code',
        }"
        validation="required"
      />
     
      <InputPassword
				:focus="true"
        label="Password"
        name="newPassword"
        :attributes="{
          placeholder: 'Password',
        }"
        validation="required"
      />
			<InputPassword
        label="Confirm Password"
        name="confirmPassword"
        :attributes="{
          placeholder: 'Confirm Password',
        }"
        validation="required"
      />
      <div class="flex justify-end">
        <Button :pending="pending" @click.prevent="submit(submitForm)" type="primary">
          Create
        </Button>
      </div>
    </Form>
  </div>
</template>
