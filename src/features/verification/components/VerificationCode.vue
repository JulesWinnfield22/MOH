<script setup>
import Button from '@/components/Button.vue';
import { Form, Input } from '@/components/new_form_elements';

const props = defineProps({
	verifyCode: {
			type: Function
		}
	})

	function submitForm({values}) {
		props.verifyCode(values)
	}
</script>
<template>
  <div class="flex flex-col gap-6">
    <div>
      <p class="font-bold text-2xl">Enter Verification Code</p>
      <p class="text-base max-w-[70%]">
        We Have Sent A 6 digit Code to Your Email
      </p>
    </div>
    <Form v-slot="{ submit }" id="verifyCode" class="flex flex-col gap-4">
      <Input
				:focus="true"
        label="Code"
        name="code"
        :attributes="{
          placeholder: 'Code',
        }"
        validation="required"
      />
      <div class="flex justify-end">
        <Button @click.prevent="submit(submitForm)" type="primary">
          Verify
        </Button>
      </div>
    </Form>
  </div>
</template>
