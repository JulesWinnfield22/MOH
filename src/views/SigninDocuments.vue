<script setup>
import { useApiRequest } from '@/composables/useApiRequest';
import { createContract } from '@/features/resident/components/form/api/contractApi';
import ResidentForm from '@/features/resident/components/form/ResidentForm.vue';
import { getFormData, toasted } from '@/utils/utils';
import { computed, ref, watch } from 'vue'
import { getStudentbuId } from '@/features/students/api/studentApi';
import StudentDataProvider from '@/features/students/components/StudentDataProvider.vue';
import { useAuth } from '@/store/auth';

const auth = useAuth();

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

  const agent_file = !isSingle.value
    ? { agent_file: values['agent_file'] }
    : {};

  const fd = getFormData({
    identity_file: values.identity_file,
    marriage_file: values.marriage_file,
    ...agent_file,
  });

  delete values.identity_file,
  delete values.marriage_file,
  delete values.agent_file,

  req.send(
    () => createContract({...values, martialStatus: married.value}, fd),
    res => {
      console.log(res)
      toasted(res.success, 'Created', res.error)
    }
  )
    delete values.marriage_file,
    delete values.agent_file,
    req.send(
      () => createContract({ ...values, martialStatus: married.value }, fd),
      (res) => {
        if (res.success) {
        }
        toasted(res.success, 'Succefully Uploaded', res.error);
      }
    );
}

</script>
<template>
  <div class="flex flex-col gap-2">
    <StudentDataProvider v-slot="{ pending, status }">
      <div
        class="p-2 border-l-4 border-red-500 bg-orange-200"
        v-if="!pending && !status"
      >
        you need to be registered
      </div>
      <div class="border-b">
        <p class="font-semibold">Martial Status</p>
        <div class="py-2 gap-2 flex items-center w-1/2">
          <div
            :class="[married == 'Single' && 'bg-primary text-white']"
            class="gap-2 rounded px-2 flex items-center flex-1 h-10 border"
          >
            <input
              :disabled="!status"
              value="Single"
              @change="married = $event.target.value"
              :checked="married == 'Single'"
              type="checkbox"
            />
            <p>Single</p>
          </div>
          <div
            :class="[married == 'Married' && 'bg-primary text-white']"
            class="rounded px-2 flex items-center gap-2 flex-1 h-10 border"
          >
            <input
              :disabled="!status"
              value="Married"
              @change="married = $event.target.value"
              :checked="married == 'Married'"
              type="checkbox"
            />
            Married
          </div>
          <div
            :class="[married == 'Divorced' && 'bg-primary text-white']"
            class="rounded px-2 flex items-center gap-2 flex-1 h-10 border"
          >
            <input
              :disabled="!status"
              value="Divorced"
              @change="married = $event.target.value"
              :checked="married == 'Divorced'"
              type="checkbox"
            />
            Divorced
          </div>
          <div
            :class="[married == 'Widow' && 'bg-primary text-white']"
            class="rounded px-2 flex items-center gap-2 flex-1 h-10 border"
          >
            <input
              :disabled="!status"
              value="Widow"
              @change="married = $event.target.value"
              :checked="married == 'Widow'"
              type="checkbox"
            />
            Widow(er)
          </div>
        </div>
      </div>
      <ResidentForm :disabled="!status" :filter="filter" :on-submit="submit" />
    </StudentDataProvider>
  </div>
</template>

<style scoped>
.bg-blue-200 {
  background-color: #bfdbfe; /* Tailwind CSS color class for bg-blue-200 */
}
</style>
