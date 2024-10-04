<script setup>
import { usePagination } from '@/composables/usePagination';
import { getAllPermissions } from '../api/PrivilegesApi';
import { usePrivileges } from '../store/PrivilegeStore';

const privilegesStore = usePrivileges();

const pagination = usePagination({
  cb: getAllPermissions,
});

if (privilegesStore.privileges.length == 0) {
  pagination.send();
}
</script>
<template>
  {{ console.log(pagination.data.value) }}
  <slot
    :pending="pagination.pending.value"
    :error="pagination.error.value"
    :privileges="pagination.data.value"
  />
</template>
