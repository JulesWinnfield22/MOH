<script setup>
import { Form, Select, Input, InputFile } from '@/components/new_form_elements';
import Button from '@/components/Button.vue';
import { computed, ref, watch } from 'vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { saveSignedContract } from '@/features/resident/components/form/api/contractApi';
import StudentDataProvider from '@/features/students/components/StudentDataProvider.vue';
import { getFormData, toasted } from '@/utils/utils';
import { openModal } from '@/modals';
import { useAuth } from '@/store/auth';
import { useStudent } from '@/features/students/store/studentStore';
import { useRouter } from 'vue-router';

const auth = useAuth();
const student = useStudent();
const req = useApiRequest();
const router = useRouter()

const married = ref('Single'); // Default marital status
const _filter = ref({
  identity_file: true,
});

// Props
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  martialCertName: Blob,
  identityCertName: Blob,
  filter: {
    type: Object,
    default: {},
  },
  contract: Object,
  pending: {
    type: Boolean,
    default: false,
  },
  onSubmit: {
    type: Function,
  },
});

// Computed properties
const isSingle = computed(() => married.value !== 'Married');

// Watchers
watch(married, () => {
  _filter.value = {
    ..._filter.value,
    agent_file: !isSingle.value,
  };
}, { immediate: true });

// Handle submission
async function submitForm(id, values) {
  if (req.pending.value) return;

  const fd = new FormData();
  fd.append('signed_contract', values.signed_contract_file); // Assuming this is a file input

  // Use the student ID from the student object
  req.send(() => saveSignedContract(id, fd), res => {
    if(res.success) {
      student.reset()
      router.replace('/SigninDocuments')
    }
    toasted(res.success, 'Created', res.error);
  });

}

// Handle disabled state
const dis = ref(props.disabled ? { disabled: true } : {});
watch(() => props.disabled, () => {
  dis.value = props.disabled ? { disabled: true } : {};
});
</script>

<template>
  <div class="flex flex-col p-5 gap-4 bg-gray-50 rounded-lg shadow-md">
    <RouterLink class="p-3 p-2 self-start text-white rounded-md bg-primary text-white rounded-md shadow hover:bg-[#216160] transition duration-200" to="/editsignindocuments">
      Go to Edit Contract
    </RouterLink>

    <StudentDataProvider v-slot="{ contract, pending, isRegistered }">
      <div class="upload-message mb-4">
        <p>
          When you upload the contract file, please ensure it is signed.
        </p>
      </div>

      <Form v-slot="{ submit }" id="contract" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="col-span-2 border-t py-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputFile 
            v-if="_filter.identity_file" 
            label="Signed Contract File" 
            :value="identityCertName"
            name="signed_contract_file" 
            :attributes="{ placeholder: 'Signed Contract File', ...dis }" 
            validation="required" 
          />
          <InputFile 
            v-if="_filter.agent_file" 
            label="Agent File" 
            name="agent_file" 
            :attributes="{ placeholder: 'Agent File', ...dis }" 
            validation="required" 
          />
        </div>
        <Button 
          :pending="req.pending.value" 
          @click.prevent="submit(({ values }) => submitForm(contract.id, values))"
          class="col-span-3 py-3 text-lg font-semibold bg-primary text-white rounded-md shadow hover:bg-[#216160] transition duration-200" 
          type="primary"
        >
          Submit
        </Button>
      </Form>
    </StudentDataProvider>
  </div>
</template>

<style scoped>
.upload-message {
  background-color: #f0f8ff; /* Light background color */
  border-left: 4px solid #007bff; /* Highlighted left border */
  padding: 15px 20px; /* Increased padding for more spacious feel */
  border-radius: 8px; /* Slightly more rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* More prominent shadow for depth */
  font-size: 15px; /* Slightly larger font size */
  color: #333; /* Text color */
}

.upload-message p {
  margin: 0; /* Remove default margin */
}

.bg-gray-50 {
  background-color: #f9fafb; /* Light gray background for the overall container */
}

.btn-primary {
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.btn-primary:hover {
  background-color: #0056b3; /* Darker color on hover */
}
</style>