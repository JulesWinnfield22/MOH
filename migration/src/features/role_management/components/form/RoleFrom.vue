<script setup>
  import FormSubmitButton from '@/components/FormSubmitButton.vue';
  import FormLayout from '@com/FormLayout.vue'
  import { Input, Select, SelectMultipleMethods } from '@com/form_elements'
  import { ref, watch } from 'vue';

  const _filter = ref({
    privilages: true
  })

  const props = defineProps({
    filter: {
      type: Object
    },
    role: {
      type: Object
    },
    btnText: {
      type: String,
      required: true
    },
    onSubmit: {
      type: Function,
      default: f => f
    },
    privilageoptions: {
      type: Array,
      required: true
    },
    pending: {
      type: Boolean,
      default: false
    }
  })

  function submitRole({ values }) {
    props.onSubmit && props.onSubmit(values)
  }

  watch(props, () => {
    _filter.value = {
      ..._filter.value,
      ...props.filter
    }
  }, {immediate: true})

</script>

<template>
  <FormLayout v-slot="{ submit }">
    <Input
      validation="required"
      name="role"
      label="Role Name"
      placeholder="role"
      :value="role?.['role'] || ''"
    />
    <Select
      :value="role?.['status'] || ''"
      validation="required"
      label="Status"
      name="status"
      :options="['Active', 'Disabled']"
    />
    <Input
      class="col-span-2"
      name="roleDescription"
      :value="role?.['roleDescription'] || ''"
      validation="required"
      label="Description"
      placeholder="description"
    />
    <SelectMultipleMethods
      name="privileges"
      validation="requiredMultipleSelectMethods"
      label="Access Privilages"
      :value="role?.['privileges'] || []"
      :options="privilageoptions || []"
      class="col-span-2"
    />
    <FormSubmitButton
      :pending="pending"
      class="col-span-2"
      @click.prevent="submit(submitRole)"
      :btnText="btnText"
    />
  </FormLayout>
</template>