<script setup>
import Button from '@/components/Button.vue';
import { Form, Input, InputPassword } from '@/components/new_form_elements';

const props = defineProps({
	resetPassword: {
			type: Function
		}
	})

	function submitForm({values}) {
		props.resetPassword(values)
	}
</script>
<template>
  <div class="flex flex-col gap-6">
    <div>
      <p class="font-bold text-2xl">Reset Password</p>
      <p class="text-base max-w-[70%]">
        Reset Password
      </p>
    </div>
    <Form v-slot="{ submit }" id="restPassword" class="flex flex-col gap-4">
      <InputPassword
        label="Password"
        name="password"
        :attributes="{
          placeholder: 'Password',
        }"
        validation="required"
      />
			<InputPassword
        label="Confirm Password"
        name="confirmPassword"
        :attributes="{
          placeholder: 'Password',
        }"
        validation="required|equalTo-password"
      />
      <div class="flex justify-end">
        <Button @click.prevent="submit(submitForm)" type="primary">
          Reset
        </Button>
      </div>
    </Form>
  </div>
</template>
