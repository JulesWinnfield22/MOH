<script setup>
import { useApiRequest } from "@/composables/useApiRequest";
import { getPharmacies } from "@/features/prescription_hub/api/prescriptionhubApi";
import { useBranches } from "@/stores/branchesStore";

const store = useBranches();

const req = useApiRequest();
if (!store.branches?.length) {
  req.send(
    () => getPharmacies(),
    (res) => {
      if (res.success) {
        store.set(res.data?.branches || []);
      }
    }
  );
}
</script>
<template>
  <slot
    :branches="store.branches"
    :pending="req.pending.value"
    :error="req.error.value"
  />
</template>
