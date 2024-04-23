<script setup>
  import FormSubmitButton from '@/components/FormSubmitButton.vue';
  import FormLayout from '@com/FormLayout.vue'
  import { Input, Select, SelectMultiple } from '@com/form_elements'
  import { ref, watch } from 'vue';
  import PrevilageSelect from '@/features/role_management/components/PrevilageSelect.vue'

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
      name="roleName"
      label="Role Name"
      placeholder="role"
      :value="role?.['roleName'] || ''"
    />
    <!-- <Select
      :value="role?.['status'] || 'Active'"
      validation="required"
      label="Status"
      name="status"
      :options="['Active', 'Disabled']"
    /> -->
    <Input
      name="roleDescription"
      :value="role?.['roleDescription'] || ''"
      validation="required"
      label="Description"
      placeholder="description"
    />
    <!-- <SelectMultiple
      name="privileges"
      validation="requiredMultipleSelect"
      label="Access Privilages"
      :value="role?.['privileges'] || []"
      :options="privilageoptions || []"
      class="col-span-2"
    /> -->
    <PrevilageSelect
      name="privileges"
      validation="requiredMultipleSelect-(you need to select at least one)"
      label="Access Privilages"
      :value="role ? role.privileges.map(name => {
        const found = privilageoptions.find(el => el.privilegeName == name.split(',')?.[0])
        return found.privilegeUuid
      }) : []"
      :previlages="privilageoptions || []"
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