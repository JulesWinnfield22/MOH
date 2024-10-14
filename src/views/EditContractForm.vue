<script setup>
import { useApiRequest } from '@/composables/useApiRequest';
import ResidentForm from '@/features/resident/components/form/ResidentForm.vue';
import { editContract } from '@/features/students/api/contractApi';
import StudentDataProvider from '@/features/students/components/StudentDataProvider.vue';
import { useStudent } from '@/features/students/store/studentStore';
import { openModal } from '@/modals';
import { getFormData, toasted } from '@/utils/utils';

const req = useApiRequest()
const student = useStudent()
function submit(id, values) {
  console.log(values)
  if (req.pending.value) return;

  const agent_file = values.martialStatus != "Single"
    ? { agent_file: values['agent_file'] }
    : {};

  console.log({ ...values })
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
      () => editContract(id, values, fd),
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
            },
          );
        }
      }
    )
}
</script>
<template>
  <div class="p-4">
    <StudentDataProvider v-slot="{ contract, martialCertName, identityCertName, pending, isRegistered }">
      <ResidentForm :identityCertName="identityCertName" :martialCertName="martialCertName" :contract="contract"
        :onSubmit="(values) => submit(contract?.id, values)" />
    </StudentDataProvider>
  </div>
</template>