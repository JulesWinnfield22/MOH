<script setup>
import FormParent from "@/features/quotation/components/FormParent.vue";
import { useApiRequest } from "@composable/useApiRequest";
import { toasted } from "@/utils/utils";
import CertificateForm from "./CertificateForm.vue";
const props = defineProps({ certificate: { type: Object, requried: true } }); // import form goes here

// props go gere

const request = useApiRequest();

function edit(values) {
  request.send(
    () => {
      // your api call
    },
    (res) => {
      toasted(res.success, "Updated Successfuly.", res.error);
    }
  );
}
</script>
<template>
  <FormParent>
    <CertificateForm
      :certificate="certificate"
      btnText="Update Certificate"
      :pending="request.pending.value"
      :onSubmit="edit"
    />
    <!-- form goes here -->
  </FormParent>
</template>
