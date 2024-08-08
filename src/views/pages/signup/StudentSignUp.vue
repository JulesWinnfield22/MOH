<script setup>
import { ref } from 'vue'
import { mdiAccountOutline, mdiEmail, mdiPhone } from '@mdi/js'
import { useRouter } from 'vue-router'
import NewFormLayout from '@/components/NewFormLayout.vue'
import { Input, Select } from '@/components/new_form_elements'
import { Gender, Status, Titles, UserType } from '@/utils/enums'
import InputPassword from '@/components/new_form_elements/InputPassword.vue'
import FormSubmitButton from '@/components/FormSubmitButton.vue'
import { signup } from '@/pages/api/auth/auth'
import { useApiRequest } from '@/composables/useApiRequest'

import { toasted } from '@/utils/utils'
import InputIcon from '@/components/InputIcon.vue'
import { useRoles } from '@/features/roles/store/rolesStore'
import { getAllRoles } from '@/features/roles/api/rolesApi'

const props = defineProps({
  currentPage: Number,
})
const emit = defineEmits(['next', 'previos'])
const activePage = ref(1)
const router = useRouter()

function nextPage() {
  activePage.value++
  console.log('Active page', activePage.value)
  // emit('next')
}

function previosPage() {
  activePage.value--
  console.log('Active page', activePage.value)
  if (activePage.value == 0) {
    console.log('clicked')
    emit('previos')
  }
}
const rolesStore = useRoles()

const rolesReq = useApiRequest()

if (!rolesStore.roles.length) {
  rolesReq.send(
    () => getAllRoles({}),
    (res) => {
      rolesStore.set(res.data?.response)
    },
  )
}

const signupReq = useApiRequest()
console.log(signupReq)
function signupUser({ values }) {
  signupReq.send(
    () => signup({ userStatus: Status.ACTIVE, ...values }),
    (res) => {
      if (res.success)
        router.push('/Dashboard')

      toasted(res.success, 'Successfully Logged In', res.error)
    },
  )
}
</script>

<template>
  <div class="p-4 flex items-center space-x-2" @click="previosPage">
    <svg
      width="5"
      height="8"
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.6"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.89523 0.581548C4.02103 0.703288 4.0356 0.917115 3.92777 1.05914L1.69512 4L3.92777 6.94086C4.0356 7.08289 4.02103 7.29671 3.89523 7.41845C3.76943 7.54019 3.58004 7.52374 3.47222 7.38171L1.07222 4.22043C0.975926 4.09359 0.975926 3.90641 1.07222 3.77957L3.47222 0.618286C3.58005 0.476257 3.76943 0.459809 3.89523 0.581548Z"
        fill="#263558"
        stroke="#263558"
        stroke-linecap="round"
      />
    </svg>
    <p class="text-gray-700 font-medium opacity-60">
      Back
    </p>
  </div>
  <div>
    <div
      v-if="activePage == 1"
      class="flex flex-col pb-3 items-center justify-center"
    >
      <h2 class="text-gray-600 items-center">
        Sign Up
      </h2>
    </div>
    <div v-if="activePage == 1" class="px-10 text-gray-600 opacity-60">
      <p class="text-center">
        Please provide all necessary personal information.<span
          class="inline-block"
        />
      </p>
    </div>

    <div class="p-6">
      <NewFormLayout
        v-if="activePage == 1"
        id="paitent-form"
        v-slot="{ submit }"
        class=""
      >
        <Select
          name="title"
          value="Ms."
          :attributes="{
            placeholder: 'Title',
          }"
          :options="Titles"
        />
        <Select
          :attributes="{
            placeholder: 'Gender',
          }"
          :value="Gender.FEMALE"
          :options="Object.values(Gender)"
          name="gender"
        />
        <div class="col-span-2 flex flex-col gap-6">
          <Input
            name="firstName"
            :attributes="{
              placeholder: 'First Name',
            }"
            validation="required|minmax-3,30"
          >
            <template #left>
              <InputIcon
                :icon="mdiAccountOutline"
              />
            </template>
          </Input>
          <Input
            name="fatherName"
            :attributes="{
              placeholder: 'Father Name',
            }"
            validation="required|minmax-3,30"
          >
            <template #left>
              <InputIcon :icon="mdiAccountOutline" />
            </template>
          </Input>
          <Input
            name="grandFatherName"
            :attributes="{
              placeholder: 'Grand Father Name',
            }"
            validation="required|minmax-3,30"
          >
            <template #left>
              <InputIcon :icon="mdiAccountOutline" />
            </template>
          </Input>
          <Input
            name="mobilePhone"
            :attributes="{
              placeholder: 'Mobile Phone',
            }"
            validation="required|phone"
          >
            <template #left>
              <InputIcon :icon="mdiPhone" />
            </template>
          </Input>
          <Input
            name="email"
            :attributes="{
              placeholder: 'email',
            }"
            validation="required|email"
          >
            <template #left>
              <InputIcon :icon="mdiEmail" />
            </template>
          </Input>
          <Select
            :obj="true"
            :options="rolesStore.roles?.map(el => ({ label: el.roleName, value: el.roleUuid }))"
            name="roleUuid"
            validation="required"
            :attributes="{
              placeholder: 'Role',
              type: 'text',
            }"
          />
          <Select
            :options="Object.values(UserType)"
            name="userType"
            validation="required"
            :attributes="{
              placeholder: 'User Type',
              type: 'text',
            }"
          />
          <InputPassword
            name="password"
            validation="required|min-8"
            :attributes="{
              placeholder: 'Passowrd',
            }"
          />
          <InputPassword
            :skip="true"
            name="confirmPassword"
            validation="required|equalTo-password"
            :attributes="{
              placeholder: 'Confirm Passowrd',
            }"
          />
        </div>
        <FormSubmitButton
          class="col-span-2 rounded-full"
          btn-text="Submit"
          @click.prevent="submit(signupUser)"
        />
      </NewFormLayout>
      <div v-else class="">
        <div class="flex flex-col items-center">
          <img class="object-cover h-30 w-30" src="@/assets/img/Check.svg">
          <h1>
            Registration <br>
            complete!
          </h1>
          <p>
            We're reviewing your uploaded information. <br>
            Once verified, we'll notify you via text and <br>
            email. Prescription capabilities will be available <br>
            after verification. In the meantime,
          </p>

          <div class="mt-4">
            <p>1. Set up the hospital's profile.</p>
            <p class="ml-5">
              2. Set up the hospital's profile.
            </p>
            <p class="ml-8">
              3. Set up the hospital's profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
