<script setup>
	import Button from '@/components/Button.vue';
import { computed, ref, shallowRef } from 'vue';
import VerifyEmail from '@/features/verification/components/VerifyEmail.vue';
import RestPassword from '../components/RestPassword.vue';
import VerificationCode from '@/features/verification/components/VerificationCode.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import {resetPasswordApi, sendEmailVerification,sendVerificationCode} from "../api/VerifyEmailApi"
import { toasted } from '@/utils/utils';
import { useRouter } from 'vue-router';
const router=useRouter();

const verifyEmailRequest=useApiRequest();
const email=ref('')
function verifyEmail(values) {
  verifyEmailRequest.send(()=>sendEmailVerification({email:values.email}),res=>{
    if(res.success){
      email.value=values.email
      setActive('verify');
      toasted(res.success, 'Confirmation code sent to your email', res.error)
    }
    else{
      toasted(false, '','your email is not verified please enter the valid email')
    }
  })

}

function verifyCode(values) {
  verifyEmailRequest.send(()=>sendVerificationCode({email:email.value,code:values.code}),res=>{
    if(res.success){
      setActive('reset')
      toasted(res.success, 'Successfully submit', res.error)
    }
    else{
      toasted(false, '','You have entered wrong varification code please try again')
    }
  })
}
function resetPassword(values) {
  verifyEmailRequest.send(()=>resetPasswordApi({email:email.value,password :values.password }),res=>{
    if(res.success){
      toasted(res.success, 'Password created successfuly', res.error)
      router.push('/login')
    }
    else{
      toasted(false, '','something got wrong try again')
    }
  })
}

const components = shallowRef([{ name: 'email', component: VerifyEmail }, { name: 'verify', component: VerificationCode }, {name: 'reset', component: RestPassword}]);

const active = ref('email');

const activeCom = computed(() => components.value.find(el => el.name == active.value)?.component)
const activeIdx = computed(() => components.value.findIndex(el => el.name == active.value))

function setActive(name) {
	active.value = name
}

function goBack() {
	if(active.value == 'verify') {
		active.value = 'email'
	} else if(active.value == 'reset') {
		active.value = 'verify'
	}
}
</script>
<template>
  <div class="w-[90vw] h-screen flex flex-col gap-8 mx-auto">
    <div class="flex py-6 items-center justify-between">
      <div class="h-10">
        <img src="/src/assets/moh_logo.svg" />
      </div>
      <Button
        @click="$router.push('/login')"
        class="border border-primary text-primary bg-white"
      >
        Login
      </Button>
    </div>
    <div class="w-[28rem] flex flex-col mx-auto gap-14">
      <div class="flex items-center flex-col gap-4">
        <p class="font-bold text-3xl text-center">Get Started</p>
        <p class="text-center text-lg">
          Please fill the form below to receive a confirmation code in your
          email to continue.
        </p>
      </div>
      <div class="inline-flex items-center justify-center gap-2">
        <div class="__active __circle">1</div>
				<template v-for="(com, idx) in components.concat().slice(1)" :key="com.name">
					<div :class="idx + 1 <= activeIdx ? '__full' : '__half'" class="__line"></div>
					<div :class="[idx < activeIdx && '__active']" class="__circle">{{idx + 2}}</div>
				</template>
      </div>
			<div>
				<button @click="goBack" v-if="active != 'email'" class="text-left text-xs italic text-primary hover:underline"> &lt; go back</button>
				<component
					:verifyEmail="verifyEmail"
					:verifyCode='verifyCode'
          :resetPassword="resetPassword"
					:is="activeCom"
				/>
			</div>
    </div>
  </div>
</template>
<style scoped>
.__circle {
  display: grid;
  place-items: center;
  color: theme('colors.dark');
  width: 2rem;
	font-size: 14px;
  height: 2rem;
  border-radius: 100%;
  background-color: theme('colors.gray.200');
}

.__active.__circle {
  background-color: theme('colors.primary');
	color: #fff;
}

.__circle + .__line.__half::after,
.__circle + .__line.__full::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 0%;
  background-color: theme('colors.primary');
}

.__circle + .__line.__half::after {
	transition: all .2s .2s linear;
}

.__circle + .__line.__full::after {
	transition: all .2s linear;
}

.__active.__circle + .__line.__half::after {
	width: 50%
}

.__active.__circle + .__line.__full::after {
	width: 100%;
	transition: all .2s .2s linear;
}

.__line {
  width: 10rem;
  height: 3px;
  border-radius: 1000px;
	position: relative;
	overflow: hidden;
  background-color: theme('colors.gray.200');
}
</style>
