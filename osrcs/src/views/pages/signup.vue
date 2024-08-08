<script setup>
import { ref } from 'vue'
import UniversitySignup from './signup/UniversitySignup.vue'
import StudentSignup from './signup/StudentSignup.vue'
import HrSignup from './signup/HrSignup.vue'

const emit = defineEmits(['login'])
const currentPage = ref(1)
const selected = ref('')
// const startDate = ref('start Dat')
// const dateInput = ref('')
// const color = ref('red')
const graduationYears = ref([])
const fileName = ref(null)

// function submitSignUp() {
//   // Logic for handling sign-up form submission
// }

// function handleFileUpload(event) {
//   const file = event.target.files[0]
//   fileName.value = file ? file.name : null
// }

// function emitLoginEvent() {
//   // Emit the 'login' event when the link is clicked
//   console.log('you clicked me')
//   emit('login')
// }

// onMounted(() => {
//   const currentYear = new Date().getFullYear()
//   for (let year = currentYear; year >= currentYear - 100; year--)
//     graduationYears.value.push(year)

//   console.log('graduation', graduationYears.value)
// })

// function selectOption(option) {
//   selected.value = option
//   console.log('selected', selected.value)
// }

function nextPage() {
  currentPage.value = currentPage.value + 1
  console.log('curent page', currentPage.value)
}
function previosPage() {
  currentPage.value--
}
</script>

<template>
  <div class="w-[360px]">
    <!-- <div class=" p-4 flex items-center space-x-2" @click="previosPage" v-if="currentPage!==1">
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M3.89523 0.581548C4.02103 0.703288 4.0356 0.917115 3.92777 1.05914L1.69512 4L3.92777 6.94086C4.0356 7.08289 4.02103 7.29671 3.89523 7.41845C3.76943 7.54019 3.58004 7.52374 3.47222 7.38171L1.07222 4.22043C0.975926 4.09359 0.975926 3.90641 1.07222 3.77957L3.47222 0.618286C3.58005 0.476257 3.76943 0.459809 3.89523 0.581548Z" fill="#263558" stroke="#263558" stroke-linecap="round"/>
    </svg>
    <p class="text-gray-700 font-medium opacity-60">Back</p>
</div> -->

    <!--  -->
    <div :class="[currentPage == 1 ? 'sign-up flex flex-col space-y-1 items-center justify-center mt-8' : 'sign-up flex flex-col space-y-1 items-center justify-center']">
      <div class="flex flex-col items-center space-y-2">
        <div v-if="currentPage === 1">
          <h2 class="text-gray-600">
            Sign Up
          </h2>
        </div>
        <div v-if="currentPage === 1" class="px-10 text-gray-600 opacity-60">
          <p class="text-center">
            Please provide all necessary personal information.<span class="inline-block" />
          </p>
        </div>

        <div v-if="currentPage == 1" class="">
          <div class="card grid grid-cols-2 gap-4 px-10 pt-3 pb-3  items-center justify-center ">
            <div
              class="px-4 py-6 flex flex-col space-y-2 items-center justify-center border-2 rounded-lg"
              :class="
                selected === 'hospital'
                  ? ' border-purplish-blue bg-alabaster'
                  : ' border-light-gray'
              "
              @click="selectOption('hospital')"
            >
              <svg width="20" height="20" viewBox="0 0 39 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.742 34.2079C38.2943 34.2079 38.742 33.7602 38.742 33.2079C38.742 32.6557 38.2943 32.2079 37.742 32.2079V34.2079ZM1.258 32.2079C0.705711 32.2079 0.257996 32.6557 0.257996 33.2079C0.257996 33.7602 0.705711 34.2079 1.258 34.2079V32.2079ZM27.5524 2.71168L26.8999 3.46945V3.46945L27.5524 2.71168ZM34.2964 7.0335L33.7977 7.90026V7.90026L34.2964 7.0335ZM35.303 7.90029L34.5129 8.51333V8.51333L35.303 7.90029ZM4.70366 7.0335L5.20237 7.90026H5.20238L4.70366 7.0335ZM3.69707 7.90029L4.48712 8.51333H4.48712L3.69707 7.90029ZM18.5 33.2079C18.5 33.7602 18.9477 34.2079 19.5 34.2079C20.0523 34.2079 20.5 33.7602 20.5 33.2079H18.5ZM20.5 28.4954C20.5 27.9431 20.0523 27.4954 19.5 27.4954C18.9477 27.4954 18.5 27.9431 18.5 28.4954H20.5ZM15.8516 16.4997C15.2993 16.4997 14.8516 16.9474 14.8516 17.4997C14.8516 18.052 15.2993 18.4997 15.8516 18.4997V16.4997ZM23.1484 18.4997C23.7007 18.4997 24.1484 18.052 24.1484 17.4997C24.1484 16.9474 23.7007 16.4997 23.1484 16.4997V18.4997ZM7.64271 14.9291C7.09042 14.9291 6.64271 15.3768 6.64271 15.9291C6.64271 16.4814 7.09042 16.9291 7.64271 16.9291V14.9291ZM10.379 16.9291C10.9313 16.9291 11.379 16.4814 11.379 15.9291C11.379 15.3768 10.9313 14.9291 10.379 14.9291V16.9291ZM7.64271 19.6416C7.09042 19.6416 6.64271 20.0893 6.64271 20.6416C6.64271 21.1939 7.09042 21.6416 7.64271 21.6416V19.6416ZM10.379 21.6416C10.9313 21.6416 11.379 21.1939 11.379 20.6416C11.379 20.0893 10.9313 19.6416 10.379 19.6416V21.6416ZM28.621 14.9291C28.0688 14.9291 27.621 15.3768 27.621 15.9291C27.621 16.4814 28.0688 16.9291 28.621 16.9291V14.9291ZM31.3573 16.9291C31.9096 16.9291 32.3573 16.4814 32.3573 15.9291C32.3573 15.3768 31.9096 14.9291 31.3573 14.9291V16.9291ZM28.621 19.6416C28.0688 19.6416 27.621 20.0893 27.621 20.6416C27.621 21.1939 28.0688 21.6416 28.621 21.6416V19.6416ZM31.3573 21.6416C31.9096 21.6416 32.3573 21.1939 32.3573 20.6416C32.3573 20.0893 31.9096 19.6416 31.3573 19.6416V21.6416ZM7.64271 10.2166C7.09042 10.2166 6.64271 10.6643 6.64271 11.2166C6.64271 11.7688 7.09042 12.2166 7.64271 12.2166V10.2166ZM10.379 12.2166C10.9313 12.2166 11.379 11.7688 11.379 11.2166C11.379 10.6643 10.9313 10.2166 10.379 10.2166V12.2166ZM28.621 10.2166C28.0688 10.2166 27.621 10.6643 27.621 11.2166C27.621 11.7688 28.0688 12.2166 28.621 12.2166V10.2166ZM31.3573 12.2166C31.9096 12.2166 32.3573 11.7688 32.3573 11.2166C32.3573 10.6643 31.9096 10.2166 31.3573 10.2166V12.2166ZM15.8516 21.2122C15.2993 21.2122 14.8516 21.66 14.8516 22.2122C14.8516 22.7645 15.2993 23.2122 15.8516 23.2122V21.2122ZM23.1484 23.2122C23.7007 23.2122 24.1484 22.7645 24.1484 22.2122C24.1484 21.66 23.7007 21.2122 23.1484 21.2122V23.2122ZM18.5 12.7874C18.5 13.3397 18.9477 13.7874 19.5 13.7874C20.0523 13.7874 20.5 13.3397 20.5 12.7874H18.5ZM20.5 6.50403C20.5 5.95174 20.0523 5.50403 19.5 5.50403C18.9477 5.50403 18.5 5.95174 18.5 6.50403H20.5ZM23.1484 10.6453C23.7007 10.6453 24.1484 10.1976 24.1484 9.64532C24.1484 9.09303 23.7007 8.64532 23.1484 8.64532V10.6453ZM15.8516 8.64532C15.2993 8.64532 14.8516 9.09303 14.8516 9.64532C14.8516 10.1976 15.2993 10.6453 15.8516 10.6453V8.64532ZM37.742 32.2079H1.258V34.2079H37.742V32.2079ZM17.6758 2.7915H21.3242V0.791504H17.6758V2.7915ZM27.621 8.07487V33.2083H29.621V8.07487H27.621ZM11.379 33.2083V8.07487H9.37901V33.2083H11.379ZM21.3242 2.7915C23.0685 2.7915 24.29 2.79309 25.2125 2.89989C26.1197 3.00492 26.5848 3.1981 26.8999 3.46945L28.205 1.95391C27.4515 1.30509 26.5223 1.03817 25.4425 0.913161C24.378 0.789922 23.0197 0.791504 21.3242 0.791504V2.7915ZM29.621 8.07487C29.621 6.62654 29.6239 5.42374 29.4755 4.47333C29.3199 3.47696 28.98 2.6213 28.205 1.95391L26.8999 3.46945C27.1935 3.72224 27.3878 4.06718 27.4994 4.78185C27.6182 5.54248 27.621 6.56119 27.621 8.07487H29.621ZM17.6758 0.791504C15.9804 0.791504 14.622 0.789922 13.5575 0.913161C12.4777 1.03817 11.5486 1.30509 10.7951 1.95391L12.1001 3.46945C12.4152 3.1981 12.8803 3.00492 13.7875 2.89989C14.7101 2.79309 15.9315 2.7915 17.6758 2.7915V0.791504ZM11.379 8.07487C11.379 6.56119 11.3819 5.54248 11.5006 4.78185C11.6122 4.06718 11.8066 3.72224 12.1001 3.46945L10.7951 1.95391C10.02 2.6213 9.68012 3.47696 9.52456 4.47333C9.37617 5.42374 9.37901 6.62654 9.37901 8.07487H11.379ZM34.9179 12.002V33.2083H36.9179V12.002H34.9179ZM29.5331 7.50403C30.8321 7.50403 31.7415 7.50493 32.4432 7.5664C33.1346 7.62696 33.5189 7.73985 33.7977 7.90026L34.7951 6.16673C34.1537 5.79768 33.4374 5.64583 32.6177 5.57403C31.8084 5.50313 30.7962 5.50403 29.5331 5.50403V7.50403ZM36.9179 12.002C36.9179 10.923 36.9195 10.0264 36.8341 9.30364C36.7457 8.55531 36.5539 7.88123 36.093 7.28725L34.5129 8.51333C34.6669 8.71174 34.7826 8.98542 34.8479 9.53828C34.9162 10.1167 34.9179 10.8748 34.9179 12.002H36.9179ZM33.7977 7.90026C34.09 8.06849 34.331 8.27891 34.5129 8.51333L36.093 7.28725C35.7426 6.83558 35.2995 6.45693 34.7951 6.16673L33.7977 7.90026ZM2.0822 12.002V33.2083H4.0822V12.002H2.0822ZM9.46691 5.50403C8.20385 5.50403 7.19168 5.50313 6.38234 5.57403C5.56265 5.64583 4.84636 5.79768 4.20494 6.16673L5.20238 7.90026C5.48117 7.73985 5.8655 7.62696 6.55687 7.5664C7.25859 7.50493 8.16794 7.50403 9.46691 7.50403V5.50403ZM4.0822 12.002C4.0822 10.8748 4.08382 10.1167 4.15215 9.53828C4.21746 8.98542 4.33316 8.71174 4.48712 8.51333L2.90701 7.28725C2.44611 7.88123 2.25437 8.55531 2.16596 9.30364C2.08057 10.0264 2.0822 10.923 2.0822 12.002H4.0822ZM4.20494 6.16673C3.70058 6.45693 3.25749 6.83557 2.90701 7.28725L4.48712 8.51333C4.66901 8.27892 4.91 8.06849 5.20237 7.90026L4.20494 6.16673ZM20.5 33.2079V28.4954H18.5V33.2079H20.5ZM15.8516 18.4997H23.1484V16.4997H15.8516V18.4997ZM7.64271 16.9291H10.379V14.9291H7.64271V16.9291ZM7.64271 21.6416H10.379V19.6416H7.64271V21.6416ZM28.621 16.9291H31.3573V14.9291H28.621V16.9291ZM28.621 21.6416H31.3573V19.6416H28.621V21.6416ZM7.64271 12.2166H10.379V10.2166H7.64271V12.2166ZM28.621 12.2166H31.3573V10.2166H28.621V12.2166ZM15.8516 23.2122H23.1484V21.2122H15.8516V23.2122ZM20.5 12.7874V6.50403H18.5V12.7874H20.5ZM23.1484 8.64532H15.8516V10.6453H23.1484V8.64532Z" fill="#263558" />
              </svg>
              <p class="text-center">
                Health center<span class="pl-2">Signup</span>
              </p>
            </div>

            <div
              class="px-1 py-6 flex flex-col space-y-2 items-center justify-center border-2 rounded-lg"
              :class="
                selected === 'pharmacy'
                  ? ' border-purplish-blue bg-alabaster'
                  : ' border-light-gray'
              "
              @click="selectOption('pharmacy')"
            >
              <svg width="20" height="20" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.4172 9.75001C16.4172 11.8211 14.6585 13.5 12.4891 13.5C10.3197 13.5 8.56109 11.8211 8.56109 9.75001C8.56109 11.8211 6.80246 13.5 4.63307 13.5C4.36334 13.5 4.09998 13.4652 3.84706 13.4M3.84706 13.4C2.18992 12.9726 0.981378 11.2377 1.37471 9.41167C1.43461 9.13358 1.5574 8.87257 1.69039 8.61863L4.55013 3.15836C5.08242 2.14202 6.17053 1.5 7.3608 1.5H25.3434C26.6005 1.5 27.7367 2.21528 28.2317 3.31842L29.772 6.75001M3.84706 13.4V28.5H6.98948M19.2568 17.7114L27.7175 25.7886M19.2568 17.7114L15.0265 21.75C12.6902 23.9805 12.6902 27.5967 15.0265 29.8272C17.3629 32.0576 21.1508 32.0576 23.4872 29.8272L27.7175 25.7886M19.2568 17.7114L23.4872 13.6728C25.8236 11.4424 29.6114 11.4424 31.9478 13.6728C34.284 15.9033 34.284 19.5195 31.9478 21.75L27.7175 25.7886" stroke="#263558" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <p> Pharmacy <br> <span class="text-center pl-4"> Signup</span></p>
            </div>

            <div
              class="px-1 py-6 flex flex-col space-y-2 items-center justify-center border-2 rounded-lg"
              :class="
                selected === 'physician'
                  ? ' border-purplish-blue bg-alabaster'
                  : ' border-light-gray'
              "
              @click="selectOption('physician')"
            >
              <svg width="20" height="20" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.56452 1.23627V0.166504C4.94988 0.166504 4.45161 0.64546 4.45161 1.23627H5.56452ZM17.4355 1.23627H18.5484C18.5484 0.64546 18.0501 0.166504 17.4355 0.166504V1.23627ZM12.6129 19.7789V18.7091H10.3871V19.7789H12.6129ZM10.3871 25.4843V26.5541H12.6129V25.4843H10.3871ZM14.4677 23.7014H15.5806V21.5619H14.4677V23.7014ZM8.53226 21.5619H7.41935V23.7014H8.53226V21.5619ZM20.7742 21.9184V26.9107H23V21.9184H20.7742ZM18.9194 28.6936H4.08065V30.8332H18.9194V28.6936ZM2.22581 26.9107V21.9184H0V26.9107H2.22581ZM4.08065 28.6936C3.05624 28.6936 2.22581 27.8954 2.22581 26.9107H0C0 29.077 1.82697 30.8332 4.08065 30.8332V28.6936ZM20.7742 26.9107C20.7742 27.8954 19.9438 28.6936 18.9194 28.6936V30.8332C21.1731 30.8332 23 29.077 23 26.9107H20.7742ZM5.56452 2.30604H17.4355V0.166504H5.56452V2.30604ZM16.3226 1.23627V6.9417H18.5484V1.23627H16.3226ZM17.4355 5.87193H5.56452V8.01147H17.4355V5.87193ZM6.67742 6.9417V1.23627H4.45161V6.9417H6.67742ZM10.3871 19.7789V22.6316H12.6129V19.7789H10.3871ZM10.3871 22.6316V25.4843H12.6129V22.6316H10.3871ZM14.4677 21.5619H11.5V23.7014H14.4677V21.5619ZM11.5 21.5619H8.53226V23.7014H11.5V21.5619ZM11.5 14.4301C10.3407 14.4301 9.27939 14.0381 8.44766 13.3836L7.03772 15.0391C8.25261 15.9952 9.80794 16.5696 11.5 16.5696V14.4301ZM8.44766 13.3836C7.36518 12.5318 6.67742 11.2407 6.67742 9.79441H4.45161C4.45161 11.9093 5.46099 13.7983 7.03772 15.0391L8.44766 13.3836ZM7.53511 13.1603C3.24439 13.9434 0 17.5656 0 21.9184H2.22581C2.22581 18.6123 4.69041 15.8573 7.95028 15.2624L7.53511 13.1603ZM16.3226 9.79441C16.3226 11.2407 15.6348 12.5318 14.5523 13.3836L15.9623 15.0391C17.5391 13.7983 18.5484 11.9093 18.5484 9.79441H16.3226ZM14.5523 13.3836C13.7206 14.0381 12.6593 14.4301 11.5 14.4301V16.5696C13.1921 16.5696 14.7475 15.9952 15.9623 15.0391L14.5523 13.3836ZM15.0497 15.2624C18.3096 15.8573 20.7742 18.6123 20.7742 21.9184H23C23 17.5656 19.7557 13.9434 15.4649 13.1603L15.0497 15.2624ZM6.67742 9.79441V6.9417H4.45161V9.79441H6.67742ZM16.3226 6.9417V9.79441H18.5484V6.9417H16.3226Z" fill="#263558" />
              </svg>

              <p class="text-center">
                Physician<span class="pl-2"><br> Signup</span>
              </p>
            </div>

            <div
              class="px-1 py-6 flex flex-col space-y-2 items-center justify-center border-2 rounded-lg"
              :class="
                selected === 'patient'
                  ? ' border-purplish-blue bg-alabaster'
                  : ' border-light-gray'
              "
              @click="selectOption('patient')"
            >
              <svg width="20" height="20" viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 0C8.75241 0 5.71439 3.06633 5.71439 6.84884C5.71439 10.6313 8.75241 13.6977 12.5 13.6977C16.2476 13.6977 19.2856 10.6313 19.2856 6.84884C19.2856 3.06633 16.2476 0 12.5 0ZM7.85721 6.84884C7.85721 4.26081 9.93586 2.16279 12.5 2.16279C15.0641 2.16279 17.1428 4.26081 17.1428 6.84884C17.1428 9.43687 15.0641 11.5349 12.5 11.5349C9.93586 11.5349 7.85721 9.43687 7.85721 6.84884Z" fill="#263558" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 15.8605C9.19498 15.8605 6.14999 16.6187 3.89363 17.8997C1.67086 19.1617 0.000191734 21.0743 0.000191734 23.4302L9.69645e-05 23.5772C-0.00151693 25.2525 -0.00354251 27.3549 1.82361 28.8567C2.72284 29.5958 3.98081 30.1214 5.6804 30.4686C7.38474 30.8168 9.60608 31 12.5 31C15.3939 31 17.6153 30.8168 19.3196 30.4686C21.0192 30.1214 22.2772 29.5958 23.1764 28.8567C25.0035 27.3549 25.0015 25.2525 24.9999 23.5772L24.9998 23.4302C24.9998 21.0743 23.3291 19.1617 21.1064 17.8997C18.85 16.6187 15.805 15.8605 12.5 15.8605ZM2.14302 23.4302C2.14302 22.2027 3.03069 20.8711 4.94418 19.7848C6.82408 18.7175 9.49329 18.0233 12.5 18.0233C15.5067 18.0233 18.1759 18.7175 20.0558 19.7848C21.9693 20.8711 22.857 22.2027 22.857 23.4302C22.857 25.3159 22.7994 26.3774 21.8233 27.1797C21.294 27.6147 20.4091 28.0394 18.8945 28.3488C17.3846 28.6573 15.3203 28.8372 12.5 28.8372C9.67972 28.8372 7.61542 28.6573 6.10551 28.3488C4.59087 28.0394 3.70602 27.6147 3.1767 27.1797C2.20061 26.3774 2.14302 25.3159 2.14302 23.4302Z" fill="#263558" />
              </svg>

              <p class="text-center">
                Patient<span class="pl-3"><br> Signup</span>
              </p>
            </div>
          </div>
        </div>

        <!-- hospital sign up -->
        <div v-if="currentPage == 2" class="">
          <div v-if="selected == 'hospital'">
            <UniversitySignup :current-page="currentPage" @next="nextPage" @previos="previosPage" />
          </div>

          <div v-else-if="selected == 'patient'">
            <StudentSignup :current-page="currentPage" @next="nextPage" @previos="previosPage" />
          </div>

          <div v-else>
            <HrSignup :current-page="currentPage" @next="nextPage" @previos="previosPage" />
          </div>
        </div>

        <!-- end of page one -->

        <div v-if="currentPage == 4" class="" />
        <!-- end of page 5 -->

        <div v-if="currentPage == 5" class="">
          <div class="flex items-center space-x-4 mt-4">
            <div className="relative m-1">
              <div className="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
              </div>
              <div class="flex flex-col items-end space-y-1">
                <input type="number" placeholder="Licence Number" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-4 mt-4">
            <div className="relative m-1">
              <div className="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
              </div>
              <div class="flex flex-col items-end space-y-1">
                <input type="date" placeholder="Licence Exp.Date" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-4 mt-4">
            <input id="file-upload" type="file" class="hidden"> <!-- Hide the file input initially -->
            <label for="file-upload" class="cursor-pointer">
              <div class="flex">
                <input id="file-upload" type="file" class="hidden"> <!-- Hide the file input initially -->
                <label for="file-upload" class="cursor-pointer">
                  <div class="flex space-x-2 border-[2px] border-gray-300 text-gray-900 text-sm rounded-md p-3 outline-none w-[280px] h-[100px]">
                    <img class="item-center text-center mt-5 object-cover h-4 w-4 mr-2" src="@/assets/img/file.svg" alt="File icon">
                    <span class="flex-1 text-[12px] text-gray-600">Upload your educational document (e.g. transcript, degree, or certificate)</span>
                    <p class="text-sm button bg-primary rounded-full text-white h-[30px] p-1 text-center mt-5">Upload</p>
                  </div>
                </label>
              </div>

            </label>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <div className="relative m-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" />
          <div class="">
            <!-- <button v-if=" (selected!=='hospital') && ((currentPage!==5 && selected!='patient')  || (currentPage!=3 && selected=='patient')) " @click.prevent="nextPage" className="bg-primary text-white text-center border-3 border-gray-300 text-sm rounded-full pl-10 p-3.5 outline-none w-[250px]">
     Next
 </button> -->
            <button v-if="(currentPage == 1) " className="bg-primary text-white text-center border-3 border-gray-300 text-sm rounded-full pl-10 p-3.5 outline-none w-[250px]" @click.prevent="nextPage">
              Next
            </button>

            <button v-if="currentPage == 5 || (currentPage == 3 && selected == 'patient') || (currentPage == 3 && selected == 'patient') " className="bg-primary text-white text-center border-3 border-gray-300 text-sm rounded-full pl-10 p-3.5 outline-none w-[250px]" @click.prevent="">
              Continue
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <div>
          <h4 class="text-gray-600">
            Looking to sign in?
          </h4>
        </div>
        <div class="px-3 text-gray-600 opacity-60">
          <p class="text-center">
            If you're already registered,<span class="text-primary font-bold">Login here.</span>
          </p>
        </div>
      </div>

      <div class="flex space-x-5 pt-8">
        <h4 class="" @click="emitLoginEvent">
          Login
        </h4>
        <h4 class="text-primary">
          Signup
        </h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=DM Sans');
@import url('https://fonts.googleapis.com/css?family=El Messiri');
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

  h1 {
    font-family:'Ubuntu';
    font-size: 24px;
    font-weight: 700;
    color:#263558;
    opacity: 60%;

  }
  p {
    font-family:'Ubuntu';
    font-size: 14px;
    font-weight: 400;
    color:#263558;

    line-height: 19.6px;

  }
.section h1 {
 font-family:'El Messiri' ;
 font-size: 56px;

}
.sign-up  p{
  font-family: 'DM Sans';
  font-size: 14px;
  font-weight: 200;
  line-height: 19.9px;

 }

 .sign-up  h2{
  font-family: 'DM Sans';
  font-size: 24px;
  font-weight: 600;

 }
 .customClass {
  /* Define your custom styles here */
  border-radius: 10px;
  background-color: red;
  /* Add any other custom styles as needed */
}
.section h3 {
   font-size: 20px;
   font-family: 'DM Sans';

}
.footer-links p {
  font-family: 'DM Sans';
  font-weight: 400;
  font-size: 12px;

}
.my-picker-class{
            border: none !important;
            border-bottom: 1px solid #F26F31 !important;
           }
.h2-title {
   font-family: 'DM Sans';
   font-size: 16px;

}
.card p {
   font-family: 'DM Sans';
   font-size: 16px;
}
.left-side {
  width: 300px; /* Default width for small screens */
}
.text-right {
    text-align: right;
    padding-left: 400px
}
.footer p {
  font-family: 'DM Sans';

}
span {
 font-family: 'Ubuntu';
 font-size: 14px;
 color: #263558;
}
.card P {
   font-family: 'Ubuntu';
 font-size: 14px;
 color: #263558;
}
input[type="date"]::before {
  content: attr(placeholder);
  position: absolute;
  right:0;
   padding-right: 40px;
  color: #999999;
}
input[type="date"]:focus::before {
  content: "";
}

input[type="date"]:focus::before,
input[type="date"]:focus::-webkit-input-placeholder {
  /* for Chrome */
  color: transparent;
}

input[type="date"]:focus::-moz-placeholder {
  /* for Firefox */
  color: transparent;
}

input[type="date"]:focus:-ms-input-placeholder {
  /* for IE */
  color: transparent;
}

input[type="date"]:focus:-moz-placeholder {
  /* for older versions of Firefox */
  color: transparent;
}

/* input[type="date"]:valid {
  color: #666666;
}

input[type="date"]:focus::after,
input[type="date"]:valid::after {
  content: "Date of Birth";
} */
</style>
