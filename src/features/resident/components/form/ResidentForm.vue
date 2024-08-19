<script setup>
import { Form, Select, Input, InputFile } from '@/components/new_form_elements';
import Button from '@/components/Button.vue';
import { ref, watch } from 'vue';

const _filter = ref({
  marriage_file: true,
  identity_file: true,
  agent_file: true,
});

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  filter: {
    type: Object,
    default: {},
  },
  pending: {
    type: Boolean,
    default: false,
  },
  onSubmit: {
    type: Function,
  },
});

function submitForm({ values }) {
  props.onSubmit(values);
}

watch(
  () => props.filter,
  () => {
    _filter.value = {
      ..._filter.value,
      ...(props.filter || {}),
    };
  },
  { immediate: true }
);
</script>
<template>
  <Form v-slot="{ submit }" id="contract" class="grid grid-cols-3 gap-4">
    <Select
      label="Region"
      name="region"
      :options="[
        'Addis Ababa',
        'Tigray',
        'Afar',
        'Amahara',
        'Oromia',
        'Somali',
        'Benishangul Gumz',
        'Centeral Ethiopia',
        'Gambela',
        'Harari',
        'Sidama',
        'South West Ethiopia',
        'South Ethiopia',
        'Dire Dawa',
      ]"
      :attributes="{
        placeholder: 'Region',
        type: 'text',
        disabled
      }"
      validation="required"
    />
    <Input
      label="Woreda"
      name="woreda"
      validation="required"
      :attributes="{
        placeholder: 'Woreda',
        disabled
      }"
    />
    <Input
      label="City"
      name="city"
      validation="required"
      :attributes="{
        placeholder: 'City',
        disabled
      }"
    />
    <Input
      label="Sub City"
      name="subCity"
      
      :attributes="{
        placeholder: 'Sub City',
        disabled
      }"
    />
    <Input
      label="House Number"
      name="houseNumber"
      
      :attributes="{
        placeholder: 'House Number',
        disabled
      }"
    />
    <div class="col-span-2 border-t py-2 grid grid-cols-4 gap-4">
      <InputFile
        v-if="_filter.marriage_file"
        label="Marriage File"
        name="marriage_file"
        :attributes="{
          placeholder: 'Marriage file',
          disabled
        }"
        validation="required"
      />
      <InputFile
        v-if="_filter.identity_file"
        label="Identity File"
        name="identity_file"
        :attributes="{
          placeholder: 'Identity File',
          disabled
        }"
        validation="required"
      />
      <InputFile
        v-if="_filter.agent_file"
        label="Agent File"
        name="agent_file"
        :attributes="{
          placeholder: 'Agent File',
          disabled
        }"
        validation="required"
      />
    </div>
    <Button
      :pending="pending"
      @click.prevent="submit(submitForm)"
      class="col-span-3"
      type="primary"
    >
      Submit
    </Button>
  </Form>
</template>
