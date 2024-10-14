<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApiRequest } from '../composables/useApiRequest';
import { login } from '../auth/authapi';
import { useAuth } from '../store/auth';
import { toasted } from '@/utils/utils';

const auth = useAuth();
// Reactive state
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loginReq = useApiRequest();
const router = useRouter();

// Toggle password visibility
function togglePassword() {
  showPassword.value = !showPassword.value;
}

// Login user
async function loginUser() {
  if (loginReq.pending.value) return;

  try {
    const res = await login({ email: email.value, password: password.value });
    if (res.success) {
      // Handle successful authentication
      auth.setAuth({
        user: res.data,
        accessToken: res.data?.token,
      });
      toasted(res.success, 'Successfully Loged In', res.error)
      localStorage.setItem('userDetail', JSON.stringify(res.data));

      if (Array.isArray(auth.auth.user?.privileges) && auth.auth.user?.privileges.includes('ROLE_read_batches')) {
        router.push('/');
      } else if (Array.isArray(auth.auth.user?.privileges) && auth.auth.user?.privileges.includes('ROLE_update_campus_status')) {
        router.push('/uniStudent');
      } else if (Array.isArray(auth.auth.user?.privileges) && auth.auth.user?.privileges.includes('ROLE_update_role')) {
        router.push('/users');
      }
      else if (Array.isArray(auth.auth.user?.privileges) && auth.auth.user?.privileges.includes('ROLE_update_contract_status')) {
        router.push('/contracts');
      }
      else {
        router.push('/Status');
      }
      // Redirect to dashboard
    } else {
      // Handle login failure
      alert('Login failed. Please check your credentials and try again.');
      toasted(res.success, 'Student Successfully Created', res.error)
			
    }
  } catch (error) {
    // Handle error
    console.error('An error occurred:', error);
    alert('An error occurred. Please try again later.');
  }
}
</script>

<template>
  <div class="md:grid md:grid-cols-2 h-screen sm:flex sm:flex-col overflow-scroll">
    <div class="h-screen flex flex-row justify-center items-center bg-[#21618C]">
      <div class="flex flex-row items-center gap-4">
        <img class="w-full" src="../assets/Login.png" />
      </div>
    </div>

    <div class="w-2/7 bg-white rounded-r-md shadow-md p-16 flex items-center justify-center">
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center justify-center mb-4 font-dm-sans">
          <div class="flex mb-4 items-center mx-16 gap-1 text-[#21618C]">
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6.1369 3.24608C8.28534 1.5703 10.6658 0.547644 13.3986 0.126549C14.5674 -0.0539188 17.3603 0.0148315 18.4088 0.255455C19.4057 0.478893 20.4799 0.77108 20.6517 0.865612C20.7291 0.899986 21.1416 1.08046 21.5627 1.25233C21.9924 1.4328 22.5767 1.72499 22.8775 1.90546C23.1697 2.08592 23.4275 2.23202 23.4533 2.23202C23.4791 2.23202 23.8314 2.47264 24.2439 2.76483C25.0947 3.3578 26.9596 5.18827 27.5182 5.9703C28.9533 7.98124 29.6924 9.63124 30.2166 11.9601C30.3971 12.7594 30.4142 13.0601 30.4142 14.9937C30.4142 17.0476 30.4057 17.1851 30.1736 18.1734C30.0447 18.7406 29.8814 19.3594 29.8127 19.5484C29.4689 20.5023 29.3916 20.7086 29.151 21.2242C28.558 22.4703 27.733 23.7851 26.9853 24.6531C26.04 25.7531 24.6822 26.9219 23.3674 27.7726C22.6025 28.2625 21.2275 28.9242 20.4025 29.182C16.8619 30.325 13.2267 30.2305 9.95253 28.9156C9.39393 28.6836 8.79237 28.4258 8.62909 28.3312C8.24237 28.1164 7.32284 27.5664 7.21112 27.4805C7.19066 27.4641 7.0962 27.3951 6.96018 27.2959C6.81048 27.1866 6.61043 27.0406 6.40331 26.8875C5.56112 26.2687 4.12596 24.8508 3.61893 24.1203C3.42128 23.8367 3.12909 23.4242 2.9744 23.2094C2.68221 22.7969 1.71971 20.8976 1.41034 20.1328C1.12674 19.4023 0.731432 17.7266 0.628307 16.7984C0.47362 15.4062 0.576745 13.0515 0.843151 11.8141C0.972057 11.2469 1.10096 10.7226 1.14393 10.6539C1.1869 10.5765 1.24706 10.3875 1.28143 10.2242C1.31581 10.0609 1.37596 9.87186 1.41893 9.79452C1.4619 9.72577 1.63378 9.33046 1.80565 8.90936C2.18378 7.99842 2.85409 6.85546 3.53299 5.95311C4.06581 5.23124 5.50956 3.74452 6.1369 3.24608ZM21.7174 4.42343C20.4369 3.66718 19.5603 3.33202 18.0822 2.99686C17.4463 2.85077 16.9135 2.8078 15.7189 2.78202C14.8682 2.77342 14.0947 2.77342 14.0002 2.79921C13.9656 2.8055 13.9022 2.81755 13.8218 2.83283C13.6826 2.85929 13.4924 2.89543 13.3127 2.92811C11.9978 3.16874 10.6228 3.65858 9.61737 4.23436C9.52284 4.29452 9.28221 4.43202 9.08456 4.54374C8.54315 4.85311 8.59471 5.0078 9.21346 4.96483C10.4767 4.8703 12.7283 5.11952 13.7424 5.45468C13.9314 5.51483 14.215 5.59217 14.3611 5.62655C14.5158 5.66092 14.6619 5.72108 14.6877 5.76405C14.7221 5.80702 14.7994 5.84139 14.8682 5.84139C14.9971 5.84139 15.401 6.01327 16.3205 6.45155C16.9135 6.74374 16.9392 6.76093 17.8674 7.37967C18.8814 8.05858 20.5744 9.57108 20.5744 9.79452C20.5744 9.83749 20.3596 9.94921 20.0932 10.0523C19.5517 10.25 18.8041 10.6109 18.2283 10.9547C17.8846 11.1523 17.8158 11.1609 17.6611 11.0664C17.558 11.0062 17.4806 10.9289 17.4806 10.8945C17.4806 10.7914 16.0799 9.59686 15.401 9.1328C13.5533 7.86952 11.1385 7.13046 8.82675 7.13046C7.80409 7.13046 6.4205 7.30233 5.94784 7.4828C5.7244 7.57733 4.92518 8.68592 4.81346 9.08124C4.74471 9.31327 4.79628 9.33046 5.97362 9.45077C6.80721 9.53671 8.82675 9.96639 8.93846 10.0695C8.97284 10.1125 8.51737 10.8601 8.37128 10.9976C8.26815 11.0922 7.59784 12.2695 7.46893 12.5617C7.31424 12.9398 7.18534 12.957 6.35175 12.768C6.06815 12.6992 5.32909 12.6133 4.71034 12.5789L3.57596 12.5187L3.46424 12.725C3.3869 12.8625 3.34393 13.4383 3.31815 14.4953L3.28378 16.0508L3.95409 16.1969C4.33221 16.2742 4.72753 16.3687 4.84784 16.4117C4.96815 16.4547 5.29471 16.5492 5.57831 16.6265C6.17987 16.7812 7.16815 17.1594 7.68378 17.4344C9.33378 18.3023 9.44549 18.3711 10.4853 19.1359C10.8205 19.3851 11.1299 19.5914 11.1728 19.5914C11.2158 19.5914 11.465 19.1531 11.7142 18.6203C12.3158 17.3828 12.6853 16.7555 12.8142 16.7555C12.9603 16.7555 13.7252 17.632 14.3611 18.543C14.9025 19.3164 14.9197 19.3508 14.808 19.6172C14.7478 19.7719 14.6705 19.9351 14.6361 19.9781C14.4557 20.2273 13.8713 21.9031 13.8713 22.1781C13.8713 22.9859 14.4385 23.5445 15.2549 23.5445C15.6932 23.5445 16.0369 23.364 16.3119 23.0031C16.6385 22.582 16.6127 21.9976 16.2432 21.0094C15.3924 18.732 13.7252 16.5492 11.7486 15.1055C11.4049 14.8562 11.1213 14.5984 11.1213 14.5297C11.1213 14.3922 11.7314 13.1976 11.826 13.1633C11.8689 13.1461 11.8947 13.0945 11.8947 13.043C11.8947 12.9484 12.6853 11.857 12.7541 11.857C12.8228 11.857 13.8713 12.6219 14.0603 12.7937C14.1377 12.8711 14.3267 13.0258 14.49 13.1461C15.0658 13.5758 16.0971 14.6328 16.8963 15.6211C17.5322 16.4117 19.0275 18.9726 19.0275 19.282C19.0275 19.3422 19.0877 19.4453 19.1564 19.5055C19.2682 19.6 19.3283 19.5914 19.526 19.4367C19.6549 19.3336 19.9642 19.1101 20.2221 18.9383L20.6861 18.6203L20.6346 17.9242C20.5744 17.1594 20.3853 16.2055 20.1361 15.4406C20.0416 15.1656 19.99 14.9078 20.0158 14.8648C20.0674 14.7789 20.9439 14.3148 21.5197 14.0656C22.8174 13.507 22.9463 13.4984 23.1182 13.9625C23.7799 15.7758 24.0119 16.9445 24.0721 18.7234C24.1322 20.3305 23.926 21.6539 23.3072 23.5703C23.0408 24.4125 23.0322 24.5672 23.2642 24.4297C23.7369 24.1633 25.3353 22.4016 25.8596 21.568C26.4439 20.6398 26.8221 19.7633 26.633 19.7633C26.5385 19.7633 25.6361 20.0211 25.1807 20.1844C24.8971 20.2875 24.6478 20.3648 24.6221 20.3648C24.5877 20.3648 24.5791 19.9609 24.5963 19.4711C24.6135 18.9898 24.5877 18.182 24.5361 17.7008C24.4588 17.0047 24.4588 16.7984 24.5447 16.7469C24.6822 16.6609 26.1002 16.2914 27.0111 16.0937L27.7244 15.9476L27.6986 14.3836C27.6728 13.1633 27.6385 12.7937 27.5353 12.6734C27.415 12.5359 27.2861 12.5273 25.9971 12.5703C24.5361 12.6305 24.0033 12.7164 22.508 13.1633C21.0814 13.593 19.2939 14.5555 18.1338 15.5266C17.9447 15.6812 17.7642 15.8101 17.7385 15.8101C17.7041 15.8101 17.4635 15.5266 17.1971 15.1828C16.9307 14.8476 16.4838 14.332 16.2002 14.0484C15.908 13.7648 15.676 13.4898 15.676 13.4383C15.676 13.3867 15.8221 13.232 16.0025 13.0945C16.0734 13.0378 16.1471 12.9797 16.2136 12.9273C16.3084 12.8526 16.3883 12.7897 16.4236 12.7594C16.9307 12.3297 18.0478 11.6164 18.9416 11.1437C20.7205 10.2156 22.6455 9.63124 24.5275 9.45077C26.0916 9.29608 26.2463 9.2703 26.2463 9.16718C26.2463 9.04686 25.6017 7.96405 25.4557 7.84374C25.2838 7.69764 23.883 7.33671 23.0666 7.21639C22.2244 7.09608 20.4025 7.13905 19.4744 7.30233L18.8557 7.40546L18.1424 6.9328C17.7557 6.67499 17.1283 6.30546 16.7502 6.09921C16.3721 5.90155 16.0541 5.72968 16.0369 5.71249C15.9939 5.66952 17.1369 5.35155 17.8244 5.20546C18.7267 5.02499 19.5517 4.96483 21.0299 4.97342C22.5166 4.98202 22.5853 4.93046 21.7174 4.42343ZM8.97284 22.3414C8.14784 21.5937 6.25721 20.5195 5.02831 20.0984C4.25487 19.832 4.2119 19.8664 4.54706 20.4594C4.66737 20.6656 4.78768 20.8976 4.82206 20.9664C5.19159 21.757 6.97909 23.9312 7.13378 23.7766C7.20253 23.7164 7.17674 23.6047 6.84159 22.1867C6.72128 21.6969 6.70409 21.482 6.77284 21.482C7.01346 21.482 8.66346 22.7109 9.35956 23.4156C10.2619 24.3266 10.7861 24.9969 11.3361 25.9422C11.6971 26.5523 11.8088 26.6898 12.0064 26.707C12.3158 26.7414 12.3072 26.5867 11.9635 25.968C11.2588 24.6875 10.3307 23.5703 8.97284 22.3414ZM8.32842 12.0289C8.79248 11.1266 9.99561 9.62267 10.9667 8.72892C11.362 8.36798 11.7401 8.0758 11.8175 8.0758C12.2042 8.0758 14.344 8.96955 14.5503 9.22736C14.6276 9.3133 14.6019 9.37345 14.4472 9.47658C13.5276 10.0781 12.0581 11.711 11.3276 12.9313C10.5198 14.2805 9.74639 16.575 9.74639 17.6063C9.74639 17.7438 9.71201 17.8899 9.66045 17.9156C9.61748 17.9414 9.57451 17.9328 9.57451 17.8985C9.57451 17.8555 9.47139 17.7781 9.34248 17.7266C9.20498 17.6664 8.85264 17.486 8.54326 17.3141C8.23389 17.1422 7.70107 16.8844 7.35732 16.7383L6.72998 16.4719L6.78154 16.1195C6.8417 15.6985 7.13389 14.6672 7.29717 14.3063C7.35732 14.1602 7.43467 13.9539 7.46904 13.8336C7.5292 13.6445 7.84717 12.9742 8.32842 12.0289Z"
                fill="#21618C" />
            </svg>
            <div class="ml-2">
              <h1 class=" font-bold font-sans ">
                ጤና ሚኒስቴር-ኢትዮጵያ
              </h1>
              <p class="text-sm text-gray-400">
                MINISTRY OF HEALTH ETHIOPIA
              </p>
            </div>
          </div>

          <h2 class="text-lg font-bold text-gray-800 font-dm-sans">Welcome To</h2>
          <p class="text-xl font-bold text-gray-800 font-dm-sans">Online Residents Students - Contract System</p>
          <p class="text-gray-700  w-[300px] text-center mt-2 font-sans font-dm-sans">
            Sign in to apply to get the resident contract here.
          </p>
        </div>
        <form @submit.prevent="loginUser">
          <div class="mb-4 font-dm-sans">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input id="email" v-model="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email" placeholder="Enter your email" required />
          </div>
          <div class="mb-6 font-dm-sans relative">
            <label class="block text-gray-700 font-bold mb-2" for="password">
              Password
            </label>
            <div class="relative">
              <input id="password" v-model="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" required />
              <button type="button"
                class="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                @click="togglePassword">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-3" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between mb-6">
            <label class="inline-flex items-center">

              <span class="ml-2 text-gray-700 font-dm-sans"></span>
            </label>
            <a class="inline-block align-baseline font-bold text-sm text-[#21618C] hover:text-[#21618C] font-dm-sans"
              href="/verificationReset">
              Forgot Password?
            </a>
          </div>
          <div class="flex items-center justify-between font-dm-sans">
            <button
              class="bg-[#21618C] hover:bg-[#21639f] text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit">
              Log in
            </button>
          </div>
          <div class="flex mt-4 items-center font-dm-sans">
            <span class="whitespace-nowrap text-gray-700">Don't have an account yet?</span>
            <a href="/verification" class="whitespace-nowrap mx-2 text-blue-500 hover:text-blue-700 text-sm font-bold">
              Create Password
            </a>
            <span class="whitespace-nowrap mx-1 text-gray-700">now to join our community.</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped CSS if necessary */
</style>
