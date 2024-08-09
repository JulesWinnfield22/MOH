<script setup>
import Button from '@/components/Button.vue';
import { Form, Input } from '@/components/new_form_elements';

const props = defineProps({
  verifyEmail: {
    type: Function,
  },
});

function submitForm({ values }) {
  props.verifyEmail(values);
}
</script>
<template>
  <div class="flex flex-col gap-6">
    <div>
      <p class="font-bold text-2xl">Verify Your Email</p>
      <p class="text-base max-w-[70%]">
        Please enter your primary email that you sent to the MoH HDRI.
      </p>
    </div>
    <Form v-slot="{ submit }" id="verifyEmail" class="flex flex-col gap-4">
      <Input
			  :focus="true"
        label="Email"
        name="email"
        :attributes="{
          placeholder: 'Email',
        }"
        validation="required|email"
      />
      <div class="flex justify-end">
        <Button @click.prevent="submit(submitForm)" type="primary">
          Send Verification
        </Button>
      </div>
    </Form>
  </div>
</template>
