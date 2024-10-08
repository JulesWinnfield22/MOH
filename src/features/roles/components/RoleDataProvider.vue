<script setup>
import { usePagination } from '@/composables/usePagination';
import { watch } from 'vue';
import { useRoles } from '../store/rolestore';
import { getAllRoles } from '../api/rolesApi';

const props = defineProps({
  search: String,
});

const roles = useRoles();

const pagination = usePagination({
  store: roles,
  cb: (data) => getAllRoles({ ...data, search: props.search }),
  auto: false,
});

if (!roles.roles.length) {
  pagination.send();
}

watch(
  () => props.search,
  () => {
    pagination.send();
  }
);
</script>
<template>
  {{ console.log(roles) }}
  <slot
    :roles="roles.roles"
    :pending="pagination.pending.value"
    :error="pagination.error.value"
  />
</template>
