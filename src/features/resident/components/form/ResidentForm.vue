<script setup>
import { Form, Select, Input, InputFile } from '@/components/new_form_elements';
import Button from '@/components/Button.vue';
import { computed, ref, watch } from 'vue';

const _filter = ref({
  nonmarriage_file: false,
  marriage_file: true,
  identity_file: true,
  agent_file: true,
});

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  martialCertName: Blob,
  identityCertName: Blob,
  filter: {
    type: Object,
    default: {},
  },
  contract: Object,
  pending: {
    type: Boolean,
    default: false,
  },
  onSubmit: {
    type: Function,
  },
});

const married = ref(props.contract?.martialStatus || 'Single');

const isSingle = computed(() => {
  return married.value != 'Married';
});

const filter = ref({
  agent_file: !isSingle.value,
});

watch(
  married,
  () => {
    console.log(props.identityCertName);
    _filter.value = {
      ..._filter.value,
      agent_file: !isSingle.value,
    };
  },
  { immediate: true }
);

function submitForm({ values }) {
  props.onSubmit({ ...values, martialStatus: married.value });
}

watch(
  [props, married],
  () => {
    console.log(married.value);
    _filter.value = {
      ..._filter.value,
      ...(props.filter || {}),
    };
  },
  { immediate: true }
);

const dis = ref(props.disabled ? { disabled: true } : {});
watch(
  () => props.disabled,
  () => {
    console.log(props.disabled);
    dis.value = props.disabled ? { disabled: true } : {};
  }
);
</script>
<template>
  <div>
    <div class="border-b">
      <p class="font-semibold">Martial Status</p>
      <div class="py-2 gap-2 flex items-center w-1/2">
        <div
          :class="[married == 'Single' && 'bg-primary text-white']"
          class="gap-2 rounded px-2 flex items-center flex-1 h-10 border"
        >
          <input
            v-bind="dis"
            value="Single"
            @change="married = $event.target.value"
            :checked="married == 'Single'"
            type="checkbox"
          />
          <p>Single</p>
        </div>
        <div
          :class="[married == 'Married' && 'bg-primary text-white']"
          class="rounded px-2 flex items-center gap-2 flex-1 h-10 border"
        >
          <input
            v-bind="dis"
            value="Married"
            @change="married = $event.target.value"
            :checked="married == 'Married'"
            type="checkbox"
          />
          Married
        </div>
        <div
          :class="[married == 'Divorced' && 'bg-primary text-white']"
          class="rounded px-2 flex items-center gap-2 flex-1 h-10 border"
        >
          <input
            v-bind="dis"
            value="Divorced"
            @change="married = $event.target.value"
            :checked="married == 'Divorced'"
            type="checkbox"
          />
          Divorced
        </div>
        <div
          :class="[married == 'Widow' && 'bg-primary text-white']"
          class="rounded px-2 flex items-center gap-2 flex-1 h-10 border"
        >
          <input
            v-bind="dis"
            value="Widow"
            @change="married = $event.target.value"
            :checked="married == 'Widow'"
            type="checkbox"
          />
          Widow(er)
        </div>
      </div>
    </div>
    <Form v-slot="{ submit }" id="contract" class="grid grid-cols-3 gap-4">
      <Select
        :value="contract?.region"
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
          ...dis,
        }"
        validation="required"
      />
      <Input
        :value="contract?.woreda"
        label="Woreda"
        name="woreda"
        validation="required"
        :attributes="{
          placeholder: 'Woreda',
          ...dis,
        }"
      />
      <Input
        label="City"
        name="city"
        :value="contract?.city"
        validation="required"
        :attributes="{
          placeholder: 'City',
          ...dis,
        }"
      />
      <Input
        label="Sub City"
        name="subCity"
        :value="contract?.subCity"
        :attributes="{
          placeholder: 'Sub City',
          ...dis,
        }"
      />
      <Input
        label="House Number"
        name="houseNumber"
        :value="contract?.houseNumber"
        :attributes="{
          placeholder: 'House Number',
          ...dis,
        }"
      />
      <div class="col-span-2 border-t py-2 grid grid-cols-4 gap-4">
        <InputFile
          v-if="_filter.marriage_file"
          :value="martialCertName"
          label="Marriage/UnMarriage File"
          name="marriage_file"
          :attributes="{
            placeholder: 'Marriage/UnMarriage file',
            ...dis,
          }"
          validation="required"
        />
        <InputFile
          v-if="_filter.nonmarriage_file"
          label="Non-Marriage File"
          name="marriage_file"
          :attributes="{
            placeholder: 'Non-Marriage file',
            ...dis,
          }"
          validation="required"
        />
        <InputFile
          v-if="_filter.identity_file"
          label="Identity File"
          :value="identityCertName"
          name="identity_file"
          :attributes="{
            placeholder: 'Identity File',
            ...dis,
          }"
          validation="required"
        />

        <InputFile
          v-if="_filter.agent_file"
          label="Agent File"
          name="agent_file"
          :attributes="{
            placeholder: 'Agent File',
            ...dis,
          }"
          validation="required"
        />
        <InputFile
          v-if="_filter.agent_file"
          label="spouseIdentity_file"
          name="spouseIdentity_file"
          :attributes="{
            placeholder: 'spouseIdentity_file',
            ...dis,
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
  </div>
</template>
