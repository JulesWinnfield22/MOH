<script setup>
import { ModalParent, closeModal } from '@/modal';
import TablePrescribe from './TablePrescribe.vue';
import { ref } from 'vue';

const entries = ref([
  {
    medicineName: 'medicineName',
    dosageFrom: 'dosageFrom',
    strength: 'strength',
    description: 'description',
    Price: 'Price',
    Status: 'Available',
  },
]);
</script>
<template>
  <!--<ModalParent
    class="fixed top-0 left-1/3 flex w-2/3 p-4 mt-20 overflow-auto"
    v-slot="data"
    name="Search"
  >-->
    <div class="flex flex-col gap-8 w-full bg-white p-2 rounded-lg">
      <div class="flex justify-between items-center">
        <p class="font-normal text-gray-400 text-base">
          Found 1 result for “1000034”
        </p>
        <button @click="closeModal()">
          <h-icon name="fa-times" />
        </button>
      </div>
      <TablePrescribe
        :headers="{
          head: [
            'Medicine Name',
            'Dosage Form',
            'Strength',
            'Description',
            'Price',
            'Status',
            'Action',
          ],
          row: [
            'medicineName',
            'dosageFrom',
            'stength',
            'description',
            'Price',
            'Status',
          ],
        }"
        :rows="entries"
      ></TablePrescribe>
      <!-- <div class="flex justify-center items-center">
        <div class="flex flex-col items-center gap-8">
          <p class="font-bold text-md">Remove item from prescriptions?</p>
          <p class="text-center">
            Pharmacies will be notified about the removal of this item when search to be dispensed.
          </p>
        </div>
      </div> -->
      <!-- <div class="w-full grid grid-cols-3 justify-between items-center gap-4">
        <button class="font-bold border text-primary border-primary rounded-full h-10 col-span-2">
          Cancel
        </button>
        <button class="font-bold bg-error text-white border-primary rounded-full h-10 ">
          Delete
        </button>
        <button></button>
      </div> -->
    </div>
  <!--</ModalParent>-->
</template>
