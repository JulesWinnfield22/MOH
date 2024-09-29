<script setup>
import { ModalParent, closeModal, useModal } from "@/modal";
import Table from "@/components/Table.vue";
import { useApiRequest } from "@/composables/useApiRequest";

import { ref, watch } from "vue";
import { getPatientHistory } from "@/features/patients/api/PatientHistoryApi";
import patientHistoryTableRow from "@/components/PatientHistoryTableRow.vue";
import TablePage from "./TablePage.vue";
import TableRowSkeleton from "@/skeletons/TableRowSkeleton.vue";
import { usePaginationTemp } from "@/composables/usePaginaionTemp";
import { usePatientStore } from "@/features/prescription_hub/store/patientStore";

const { getModal, modals } = useModal();
const patientData = getModal("PatientHistory")?.data;

// const patientHisReq = useApiRequest();
const patientStore = usePatientStore();
// console.log(patientStore.);
// patientHisReq.send(() => getPatientHistory(patientData?.patientUuid));

const pagination = usePaginationTemp({
  store: patientStore,
  cb: (data, config) => getPatientHistory(patientData?.patientUuid),
});
</script>
<template>
  <ModalParent
    class="inset-0 grid place-items-center p-4 overflow-auto bg-modal-clr"
    name="PatientHistory"
  >
    <div class="flex flex-col gap-4 w-5/6 j bg-white p-8 rounded-4">
      <div class="flex justify-between items-center">
        <p class="font-bold text-base capitalize">{{ patientData.fullName }}'s History</p>
        <button @click="closeModal()">
          <h-icon name="fa-times" />
        </button>
      </div>
      <TablePage v-if="patientStore.patient || pagination.pending.value">
        <Table
          :pending="pagination.pending.value"
          :Fallback="TableRowSkeleton"
          :headers="{
            head: ['Medicne Id', 'Chief Complaint', 'dosage form', 'Route', 'Price'],
            row: ['productId', 'chiefComplaint', 'dose', 'route', 'price'],
          }"
          :rows="patientStore.patient"
          :row-com="patientHistoryTableRow"
        >
        </Table>
      </TablePage>
      <div
        v-if="!patientStore.patient.length > 0"
        class="text-text-clr flex flex-col gap-2 justify-center items-center"
      >
        <p class="font-bold text-lg">There is no available history</p>
      </div>
    </div></ModalParent
  >
</template>
