<template>  
  <div class="flex justify-between items-center my-10 mx-20 bg-white ">  
    <div class="flex items-center justify-center h-8">
        <div class="flex items-center px-4">
          <img class="w-full " src="../assets/Union.jpg">
          <!-- </div> -->
          <div class=" flex flex-col gap-1">
            <span class="mx-2 text-md whitespace-nowrap font-normal">ጤና ሚኒስቴር-ኢትዮጵያ</span>
            <span class="text-xs text-gray-400 font-dm-sans whitespace-nowrap">
              MINISTRY OF HEALTH ETHIOPIA
            </span>
          </div>
        </div>
      </div>
      <button class="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded">
       
    <router-link to="/login" class="text-blue-600 hover:underline text-end">Login</router-link>  
  </button>
  </div>  
  <div class="flex flex-col items-center gap-14 justify-center h-auto bg-white"> 
    <div class="gap-3 items-center w-[596px] justify-center font-normal text-center text-[#4E585F] font-sans">
    <h2 class="text-2xl font-bold">Get Started</h2>  
    <p>
      Please fill the form below to receive a confirmation code in your email to continue.
      </p> 
    </div>
    <div class="flex mb-4 gap-8 space-x-0 items-center">
  <div v-for="step in totalSteps" :key="step" class="flex items-center">
    <!-- Step Number -->
    <div
      :class="step === currentStep ? 'bg-[#21618C] text-white' : 'bg-white text-gray-600'"
      class="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300"
    >
      {{ step }}
    </div>
    
    <!-- Line Between Steps -->
    <div v-if="step < totalSteps" class="flex-1">
      <div
        :class="step < currentStep ? 'bg-[#21618C]' : 'bg-gray-300'"
        class="h-1 rounded-md mx-4"
      ></div>
    </div>
  </div>
</div>
<div class="gap-10  w-[596px] justify-center mx-10   text-[#4E585F] font-sans">
  <div class="gap-2  w-[569px] justify-center mx-10 text-[#4E585F] font-sans">
  <h class="font-bold gap-2">
    Verifying Your Email
  </h>
  <p class="font-normal w-[403px]">
    Please enter your primary email that you sent to the MoH HDRI.
  </p>
</div>
    <div class="bg-white p-8 rounded-lg mx-10 shadow-md min-h-screen w-96">  
      <form @submit.prevent="sendVerification">  
        <div class="mb-4">  
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>  
          <input  
            type="text"  
            id="phone"  
            v-model="phone"  
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"  
            placeholder="(251) 9 10 203"  
            required  
          />  
        </div>  
        <div class="mb-4">  
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>  
          <input  
            type="email"  
            id="email"  
            v-model="email"  
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"  
            placeholder="Email address"  
            required  
          />  
        </div>  
        <button  
          type="submit"  
          class="w-full bg-[#21618C] text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"  
        >  
          Send Verification  
        </button>  
      </form>  
    </div>  
  </div>  
  </div>
</template>  

<script>  
export default {  
  data() {  
    return {  
      phone: '',  
      email: '',  
      verificationCode: '',  
      currentStep: 1,  
      totalSteps: 4,  
    };  
  },  
  methods: {  
    nextStep() {  
      if (this.currentStep < this.totalSteps) {  
        this.currentStep++;  
      } else {  
        // Handle final step logic here  
        alert('All steps completed!');  
      }  
    },  
  
    async sendVerification() {  
      console.log('Sending verification to:', this.phone, this.email);  
      
      try {  
        const response = await fetch('https://your-api-endpoint.com/send-verification', {  
          method: 'POST',  
          headers: {  
            'Content-Type': 'application/json',  
          },  
          body: JSON.stringify({  
            phone: this.phone,  
            email: this.email,  
          }),  
        });  

        if (!response.ok) {  
          throw new Error('Network response was not ok');  
        }  

        const data = await response.json();  
        alert('Verification code sent successfully!');  
      } catch (error) {  
        console.error('Error sending verification:', error);  
        alert('Failed to send verification code. Please try again.');  
      }  
    },  
  },  
};  
</script>  

<style scoped>  
/* Add any additional styles here */  
</style>