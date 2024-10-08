<script setup>
import { usePagination } from "@/composables/usePagination";
import { usePrivileges } from "../store/privilegesStore";
import { getAllPermissions } from "../api/permissionsApi";

const privilegesStore = usePrivileges();

const pagination = usePagination({
  store: privilegesStore,
  cb: getAllPermissions,
});

if (privilegesStore.privileges.length == 0) {
  pagination.send();
}
</script>
<template>
  <slot
    :pending="pagination.pending.value"
    :error="pagination.error.value"
    :privileges="privilegesStore.privileges"
  />
</template>
