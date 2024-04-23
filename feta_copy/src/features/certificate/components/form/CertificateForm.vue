<script setup>
import FormLayout from "@/components/FormLayout.vue";
import FormSubmitButton from "@/components/FormSubmitButton.vue";
import { Input, Select, InputFile } from "@/components/form_elements";
import { nextTick, ref, watch } from "vue";
import { getAllAgencies, getAgencyusers } from '@/features/certificate/api/agenciesApi'
import { useApiRequest } from "@/composables/useApiRequest";
// import { getUsers } from "@/features/user_management/api/userApi";

const req = useApiRequest()

const props = defineProps({
  certificate: { type: Object },
  pending: { type: Boolean, default: true },
  onSubmit: { type: Function, required: true },
  btnText: { type: String, required: true },
}); // props go heer

function submitForm({ values }) {
  console.log(values, props.onSubmit);
  props?.onSubmit && props.onSubmit(values);
}

const agencyName = ref('')
const agency = ref('')
const agencies = ref([])
const users = ref([])

function getAgency() {
  console.log(agencyName.value)
  // if(agencyName.value?.length < 2 || req.pending.value) return 

  req.send(
    () => getAllAgencies({
      search: agencyName.value
    }),
    res => {
      if(res.success) {
        agencies.value = res.data
      }
    }
  )
}

function getUsers() {
  console.log(agencyName.value)
  // if(agencyName.value?.length < 2 || req.pending.value) return 

  req.send(
    () => getAgencyusers(agency.value),
    res => {
      if(res.success) {
        users.value = res.data
      }
    }
  )
}

watch(agencyName, getAgency)
watch(agency, getUsers)
</script>
<template>
  <FormLayout v-slot="{ submit }">
    <Input
      v-model="agencyName"
      label="Search Agency"
      placeholder="Search Agency"
    />
    <div class="flex flex-col gap-1">
      <p class="text-sm capitalize font-medium px-1">Agencies</p>
      <select
        v-model="agency"
        class="h-10 bg-transparent border rounded "
        name="agency"
        placeholder="Agnecy"
        label="Agnecy"
        validation="required"
        :value="certificate?.agency || ''"
      >
        <option :key="agency.agencyUuid" :value="agency.agencyUuid" v-for="agency in agencies">{{  agency?.agencyName  }}</option>
      </select>
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-sm capitalize font-medium px-1">Users</p>
      <select
        class="h-10 bg-transparent border rounded "
        name="agency"
        placeholder="Agnecy"
        label="Agnecy"
        validation="required"
        :value="certificate?.agency || ''"
      >
        <option :key="user.userUuid" :value="user.userUuid" v-for="user in users">{{  `${user?.firstName} ${user.fatherName} ${user?.grandFatherName}`  }}</option>
      </select>
    </div>
    <Input
      name="numberOfInsurd"
      placeholder="Number Of Insured"
      label="Number Of Insured"
      validation="required|num"
      :value="certificate?.numberOfInsurd || ''"
    />
    <InputFile
      name="file"
      placeholder="Memebers"
      label="import Memebers"
      validation="required"
      :value="certificate?.file || ''"
    />
    <InputFile
      name="attachments"
      placeholder="Attachments"
      label="Attachments"
      validation="null"
      :value="certificate?.attachments || ''"
    />
    <!-- the Inputs go here -->
    <slot :submit="submit" name="submitBtn">
      <FormSubmitButton
        class="col-span-2"
        :pending="pending"
        @click.prevent="submit(submitForm)"
        btnText="Next"
      />
    </slot>
  </FormLayout>
</template>
