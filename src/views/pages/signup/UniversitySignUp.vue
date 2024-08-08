<script setup>
import {ref} from 'vue'
const activePage=ref(1)
const props = defineProps({
  currentPage: Number,
 
});
const emit = defineEmits(['next'],['previos'])
const nextPage = () => {
  activePage.value++
  console.log('Active page',activePage.value)
  // emit('next')
}

const previosPage = () => {
  activePage.value--
  console.log('Active page',activePage.value)
   if(activePage.value==0)
       {
        console.log('clicked')
         emit('previos')
       }
}


</script>

<template>

<div class=" p-4 flex items-center space-x-2" @click="previosPage">
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M3.89523 0.581548C4.02103 0.703288 4.0356 0.917115 3.92777 1.05914L1.69512 4L3.92777 6.94086C4.0356 7.08289 4.02103 7.29671 3.89523 7.41845C3.76943 7.54019 3.58004 7.52374 3.47222 7.38171L1.07222 4.22043C0.975926 4.09359 0.975926 3.90641 1.07222 3.77957L3.47222 0.618286C3.58005 0.476257 3.76943 0.459809 3.89523 0.581548Z" fill="#263558" stroke="#263558" stroke-linecap="round"/>
    </svg>
    <p class="text-gray-700 font-medium opacity-60">Back</p>
</div>
    <div class="pl-6">
    

<div class="flex flex-col pb-3 items-center justify-center" v-if="activePage==1">
       <h2 class="text-gray-600 items-center">Sign Up</h2>
     </div>
     <div class="px-10 text-gray-600 opacity-60" v-if="activePage==1">
 <p class="text-center">Please provide all necessary personal information.<span class="inline-block"></span></p>
</div>

      <div class="">
        <div class="" v-if="activePage==1">
        <div class="flex mb-5 mt-4">
    <div class="flex items-center space-x-4 mt-4">
        <div class="relative m-1">
            <!-- <button @click="$emit('next')">Next Page</button> -->
            <div class="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <!-- <img class="object-cover h-4 w-4" src='@/assets/img/key.svg' /> -->
            </div>
            <div class="flex flex-col items-end space-y-1">
                <select class="border-[2px] border-gray-300 text-gray-500 text-sm rounded-full  outline-none w-[130px]">
                    <option value="" selected>Private</option>
                    <option value="govermental">Govermental</option>
                   
                    <!-- Add more options as needed -->
                </select>
            </div>
        </div>
    </div>
    <div class="flex items-center space-x-1 mt-4">
        <div class="relative m-1">
            <div class="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <!-- <img class="object-cover h-4 w-4" src='@/assets/img/key.svg' /> -->
            </div>
            <div class="flex flex-col items-end space-y-1">
                <select class="border-[2px] border-gray-300 text-gray-500 text-sm rounded-full  outline-none w-[170px]">
                    <option value=""  selected>Hospital</option>
                    <option value="govermental">Clinic</option>
                   
                    <!-- Add more options as needed -->
                </select>
            </div>
        </div>
    </div>
</div>


<div class="flex items-center space-x-4 mt-4 ml-1.5">
  <label for="file-upload" class="cursor-pointer">
    <div class="flex space-x-2 border-[2px] border-gray-300 text-gray-900 text-sm rounded-md p-3 outline-none w-[309px] h-[100px]">
      <img class="item-center text-center mt-5 object-cover h-4 w-4 mr-2" src="@/assets/img/file.svg" alt="File icon">
      <span class="flex-1 text-sm text-gray-900 opacity-40">Upload your license  and a legal document.</span>
      <h4 class="text-sm button bg-primary rounded-full text-white h-[30px] p-1 text-center mt-5">Upload</h4>
      <input ref="fileInput" type="file" id="file-upload" class="hidden" @change="handleFileUpload" /> <!-- Hide the file input initially -->
   
    </div>
    <span v-if="fileName" class="text-gray-600">{{ fileName }}</span>

  </label>
</div>


<div class="flex mb-5">
    <div class="flex items-center space-x-4 mt-4">
        <div class="relative m-1">
           
            <div class="flex flex-col items-end space-y-1">
              <input type="text" placeholder="Address" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full pl-10 p-2,5 outline-none w-[116px]" />

            </div>
            <div class="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img class="object-cover h-4 w-4" src='@/assets/img/address.svg' />
            </div>
        </div>
    </div>
    <div class="flex items-center space-x-1 mt-4">
        <div class="relative m-1">
            <div class="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <!-- <img class="object-cover h-4 w-4" src='@/assets/img/key.svg' /> -->
            </div>
            <div class="flex flex-col items-end space-y-1">
              <input type="number" placeholder="Main Phone Number" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full  p-2.5 outline-none w-[190px]" />

            </div>
        </div>
    </div>
</div>




    
<div class="flex items-center space-x-4 mt-4">
           <div className="relative m-1">
 <div className="absolute bottom-0 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
   <!-- <img class="object-cover h-4 w-4" src='@/assets/img/key.svg' /> -->

 </div>
 <div class="flex flex-col items-end space-y-1">
 <input type="search" placeholder="Health Center Name" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full  p-3 outline-none w-[310px]" />
</div>

</div>

</div>


<div class="flex mb-5 space-x-4">
    <div class="flex items-center space-x-4 mt-4">
           
            <div class="flex flex-col items-end space-y-1">
              <input type="password" placeholder="Password" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full  p-2.5 outline-none w-[150px]" />

            </div>
            
     
    </div>
    <div class="flex items-center space-x-2 mt-4">
           
            <div class="flex flex-col items-end space-y-1">
              <input type="password" placeholder="Confirm Password" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full  p-2.5 outline-none w-[150px]" />

            </div>
     
    </div>
</div>

<div class="flex items-center space-x-4">
 
 <input type="email" placeholder="Email" class="mt-2 border-[2px] border-gray-300 text-gray-900 text-sm rounded-full  p-3 outline-none w-[310px]" />

</div>
<div class="flex items-center space-x-4 mt-4">
  <div class="flex flex-col items-end space-y-1">
 <input type="text" placeholder="User Name" class="border-[2px] border-gray-300 text-gray-900 text-sm rounded-full p-3 outline-none w-[310px]" />
</div>
</div>

 



       </div>
       <div class="" v-else>
        <div class="flex flex-col items-center">
      <img class="object-cover h-30 w-30" src='@/assets/img/Check.svg' />
   <h1>Registration <br>
    complete!</h1>
<p>We're reviewing your uploaded information. <br>
  Once verified, we'll notify you via text and <br>
  email. Prescription capabilities will be available <br>
   after verification. In the meantime,</p>

   <div class="mt-4">
    <p>1. Set up the hospital's profile. </p>
    <p class="ml-5">2. Set up the hospital's profile. </p>
    <p class="ml-8">3. Set up the hospital's profile. </p>
   </div>



     </div>
  </div>
      </div>
       
<div class="item-center p-10">
   <button @click="nextPage"  className="bg-primary text-white text-center border-3 border-gray-300 text-sm rounded-full pl-10 p-3.5 outline-none w-[250px]">
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

