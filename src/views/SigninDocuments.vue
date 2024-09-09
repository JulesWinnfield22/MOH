<script setup>
import { useApiRequest } from '@/composables/useApiRequest';
import { createContract } from '@/features/resident/components/form/api/contractApi';
import ResidentForm from '@/features/resident/components/form/ResidentForm.vue';
import { getFormData, toasted } from '@/utils/utils';
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

  openModal(
    'SpecialistAggrementForm',
    {
      data: values,
      student: student.student,
      contract: student.contract,
      maritalStatus: values?.martialStatus,
    },
    (res) => {
      if (!res) return;
      const agent_file = values.married != "Single"
        ? { agent_file: values['agent_file'] }
        : {};

      const fd = getFormData({
        identity_file: values.identity_file,
        marriage_file: values.marriage_file,
        spouseIdentity_file:values.spouseIdentity_file,
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
          }
        );
    }
  );
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <StudentDataProvider v-slot="{ pending, isRegistered }">
      <div
        class="p-2 border-l-4 border-red-500 bg-orange-200"
        v-if="!pending && !isRegistered"
      >
        you need to be registered
      </div>
      <ResidentForm
        :disabled="!isRegistered"
        :filter="filter"
        :on-submit="submit"
      />
    </StudentDataProvider>
  </div>
</template>

<style scoped>
.bg-blue-200 {
  background-color: #bfdbfe; /* Tailwind CSS color class for bg-blue-200 */
}
</style>
