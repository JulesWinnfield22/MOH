<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentPage: Number,

})
const emit = defineEmits(['next'], ['previos'])
const activePage = ref(1)
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
</script>

<template>
  <div class=" p-4 flex items-center space-x-2" @click="previosPage">
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M3.89523 0.581548C4.02103 0.703288 4.0356 0.917115 3.92777 1.05914L1.69512 4L3.92777 6.94086C4.0356 7.08289 4.02103 7.29671 3.89523 7.41845C3.76943 7.54019 3.58004 7.52374 3.47222 7.38171L1.07222 4.22043C0.975926 4.09359 0.975926 3.90641 1.07222 3.77957L3.47222 0.618286C3.58005 0.476257 3.76943 0.459809 3.89523 0.581548Z" fill="#263558" stroke="#263558" stroke-linecap="round" />
    </svg>
    <p class="text-gray-700 font-medium opacity-60">
      Back
    </p>
  </div>
  <div class="pl-6">
    <div v-if="activePage == 1" class="flex flex-col pb-3 items-center justify-center">
      <h2 class="text-gray-600 items-center">
        Sign Up
      </h2>
    </div>
    <div v-if="activePage == 1" class="px-10 text-gray-600 opacity-60">
      <p class="text-center">
        Please provide all necessary personal information.<span class="inline-block" />
      </p>
    </div>

    <div class="">
      <div v-if="activePage == 1" class="">
        <div class="flex items-center space-x-4 mt-4">
          <div className="relative m-1">
            <div className="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
            </div>
            <div className="relative m-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img class="object-cover h-4 w-4" src="@/assets/img/date-icon.svg">
              </div>
              <input v-model="dateInput" type="date" placeholder="Date of Birth" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4 mt-4">
          <div className="relative m-1">
            <div className="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
            </div>
            <div class="flex flex-col items-end space-y-1">
              <input type="number" placeholder="Phone Number" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4 mt-4">
          <div className="relative m-1">
            <div className="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
            </div>
            <div class="flex flex-col items-end space-y-1">
              <input type="password" placeholder="Password" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4 mt-4">
          <div className="relative m-1">
            <div className="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
            </div>
            <div class="flex flex-col items-end space-y-1">
              <input type="password" placeholder="Confirm Password" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activePage == 2" class="">
        <div class="flex items-center space-x-4 mt-4">
          <div class="relative m-1">
            <div class="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
            </div>
            <div class="flex flex-col items-end space-y-1">
              <select class="border-3 border-gray-300 text-gray-500 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
                <option value="" disabled selected hidden>
                  Educational Level
                </option>
                <option value="password1">
                  BSc
                </option>
                <option value="password1">
                  MBA
                </option>
                <option value="password1">
                  MA
                </option>
                <option value="password1">
                  MSc
                </option>
                <option value="password1">
                  Diploma
                </option>
                <option value="password1">
                  PHD
                </option>
                <option value="password1">
                  10
                </option>
                <option value="password1">
                  12
                </option>
                <!-- Add more options as needed -->
              </select>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4 mt-4">
          <div className="relative m-1">
            <div className="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
            </div>
            <div class="flex flex-col items-end space-y-1">
              <input type="text" placeholder="Specialization" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4 mt-4">
          <div class="relative m-1">
            <div class="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
            </div>
            <div class="flex flex-col items-end space-y-1">
              <select id="graduationYear" class="border-3 border-gray-300 text-gray-500 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
                <option value="" class="text-gray-100 text-sm opacity-75" isabled selected hidden>
                  Graduation Year
                </option>
                <option v-for="year in graduationYears" :key="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4 mt-4">
          <div className="relative m-1">
            <div className="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img class="object-cover h-4 w-4" src="@/assets/img/key.svg">
            </div>
            <div class="flex flex-col items-end space-y-1">
              <input type="text" placeholder="Graduated From" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-3 outline-none w-[275px]">
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4 mt-4">
          <label for="file-upload" class="cursor-pointer">
            <div class="flex space-x-2 border-[2px] border-gray-300 text-gray-900 text-sm rounded-md p-3 outline-none w-[280px] h-[100px]">
              <img class="item-center text-center mt-5 object-cover h-4 w-4 mr-2" src="@/assets/img/file.svg" alt="File icon">
              <span class="flex-1 text-[12px] text-gray-600">Upload your educational document (e.g. transcript, degree, or certificate)</span>
              <p class="text-sm button bg-primary rounded-full text-white h-[30px] p-1 text-center mt-5">Upload</p>
              <input id="file-upload" ref="fileInput" type="file" class="hidden" @change="handleFileUpload"> <!-- Hide the file input initially -->

            </div>
            <span v-if="fileName" class="text-gray-600">{{ fileName }}</span>

          </label>
        </div>
      </div>

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
            <p>1. Set up the hospital's profile. </p>
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

    <div class="item-center p-10">
      <button className="bg-primary text-white text-center border-3 border-gray-300 text-sm rounded-full pl-10 p-3.5 outline-none w-[250px]" @click="nextPage">
        Submit
      </button>
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
