<script setup>
import { useApiRequest } from '@/composables/useApiRequest';
import { createContract } from '@/features/resident/components/form/api/contractApi';
import ResidentForm from '@/features/resident/components/form/ResidentForm.vue';
import { getFormData, removeUndefined, toasted } from '@/utils/utils';
import { computed, ref, watch } from 'vue';

import StudentDataProvider from '@/features/students/components/StudentDataProvider.vue';
import { useAuth } from '@/store/auth';
import { openModal } from '@/modals';
import { useStudent } from '@/features/students/store/studentStore';

const auth = useAuth();
const student = useStudent();

const married = ref('Single');
const req = useApiRequest();

const isSingle = computed(() => {
  return married.value != 'Married';
});

const filter = ref({
  agent_file: !isSingle.value,
});

watch(isSingle, () => {
  filter.value = {
    agent_file: !isSingle.value,
  };
});

function submit(values) {
  if (req.pending.value) return;

  const agent_file = values.married != "Single"
    ? { agent_file: values['agent_file'] }
    : {};

  const fd = getFormData({
    identity_file: values.identity_file,
    marriage_file: values.marriage_file,
    spouseIdentity_file: values.spouseIdentity_file,
    ...agent_file,
  });

  delete values.identity_file,
    delete values.marriage_file,
    delete values.agent_file,
    delete values.spouseIdentity_file,
    req.send(
      () => createContract(values, fd),
      (res) => {
        console.log(res);
        toasted(res.success, 'Created', res.error);

        if (res.success) {
          openModal(
            'SpecialistAggrementForm',
            {
              data: values,
              student: student.student,
              contract: student.contract,
              maritalStatus: values?.martialStatus,
            })
        }
      }
    );
}
</script>
<template>
  <div class="flex flex-col p-5 gap-2">
    <StudentDataProvider v-slot="{ contract, pending, isRegistered }">
      <div class="p-2 border-l-4 border-red-500 bg-orange-200" v-if="!pending && !isRegistered">
        you need to be registered.
      </div>
      <ResidentForm :pending="req.pending.value" v-if="!contract" :disabled="!isRegistered" :filter="filter" :on-submit="submit" />
      <p v-else-if="contract.contractStatus == 'Inprogress'" class="capitalize font-bold text-lg">
         Now click here to <RouterLink to="/signNow" class="text-primary italic" > Upload Contract File </RouterLink>
      </p>
      <p v-else-if="contract.contractStatus == 'Declined'" class="capitalize font-bold text-lg">
        You have Been Declined click here to <RouterLink to="/editsignindocuments" class="text-primary italic" > Resubmit your Contract File </RouterLink>
      </p>
      <p v-else-if="contract.contractStatus == 'Submitted'" class="capitalize font-bold text-lg">

        
        <p style="text-align: center; margin: 40px auto; max-width: 600px;">
    You have successfully submitted the document for your contract. Please wait while the legal department of the Ministry of Health reviews it. You will be notified via email with the review results.
</p>

<p style="text-align: center; margin: 20px auto; max-width: 600px;">
    If you wish to change any details of the document you submitted, you can 
    <button @click="$router.push('/editsignindocuments')" class="italic underline text-primary">click here.</button>
</p>

      </p>
      <p v-else-if="contract.contractStatus == 'Approved'"  class="capitalize font-bold text-lg">
        Your Documents for contract have been approved by legal department of Ministry of Health.
      </p>
      <p v-else class="capitalize font-bold text-lg">
        You Have already submitted the documents required.
      </p>
    </StudentDataProvider>
  </div>
</template>

<style scoped>
.bg-blue-200 {
  background-color: #bfdbfe;
  /* Tailwind CSS color class for bg-blue-200 */
}
</style>
