<script setup>
import Form from '@/new_form_builder/Form.vue';
import SelectPrivilegeInput from '../SelectPrivilegeInput.vue';
import Input from '@/components/new_form_elements/Input.vue';
import Textarea from '@/components/new_form_elements/Textarea.vue';

const props = defineProps({
  roles: Object,
  privileges: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <Form class="grid grid-cols-3 gap-4" :inner="false" id="roleForm" v-slot="{}">
    <Input
      name="roleName"
      validation="required"
      label="Role Name"
      :value="roles?.roleName || ''"
      :attributes="{
        placeholder: 'Enter Role Name',
      }"
    />
    <Textarea
      validation="required"
      name="roleDescription"
      :value="roles?.roleDescription || ''"
      label="Role Description"
      :attributes="{
        placeholder: 'Enter Role Description',
      }"
    />
    <div class="col-span-3">
      <SelectPrivilegeInput
        label="Select Privileges"
        name="privilegeUuid"
        :options="privileges"
        validation="privilegRequired"
      />
    </div>
  </Form>
</template>
