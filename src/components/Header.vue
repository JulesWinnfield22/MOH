<script setup>
import { ref } from 'vue';
import { useSidebar } from '../composables/useSidebar';
import { useRouter } from 'vue-router';
import { useAuth } from '../store/auth';
import Dropdown from './Dropdown.vue';
import Notifications from './Notifications.vue';
const auth = useAuth();
const router = useRouter();

const dropdownOpen = ref(false);
const { isOpen } = useSidebar();

function logout() {
  localStorage.clear && localStorage.clear();
  location = '/login';

  // Define a reactive variable
  const isVisible = ref(true);

  // Define the method to toggle visibility
  const toggleVisibility = () => {
    isVisible.value = !isVisible.value;
  };
}
</script>

<template>
  <header
    class="flex  h-full justify-between px-6 py-4 bg-white border-b-4 border-b-[#D9D9D9]"
  >
  <div class="flex px-5 text-left items-start font-bold font-sans gap-3 justify-start">
  {{ auth.auth?.user?.userType }}
</div>
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

    
     
    </div>
   
    <div class="flex items-center text-[#4E585F] font-sans gap-3">
      
      <Dropdown position="right-bottom" v-slot="{ setRef, toggle }">
        <button @click="toggle" class="flex mx-4 text-gray-600 focus:outline-none">
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div class="!w-[25rem] !h-[30rem] border rounded bg-white shadow-2xl" :ref="setRef">
          <Notifications />
        </div>
      </Dropdown>

      <div class="relative">
        <button
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          @click="dropdownOpen = !dropdownOpen"
        >
        <img
    class="object-cover w-full h-full"
    src="file:///C:/Users/HP/Desktop\MOH\MOH\Profile.png"
    alt="Your avatar"
/>
        </button>

        <div
          v-show="dropdownOpen"
          class="fixed inset-0 z-10 w-full h-full"
          @click="dropdownOpen = false"
        />

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
            <a
              href="/"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >Profile</a
            >
            <!-- <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
            >Products</a> -->
            <button
              @click.stop="logout"
              class="block text-left px-4 w-full py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white"
            >
              Log out
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
<style scoped>
.slide-right-enter-active {
  transition: transform 0.5s ease-out;
}

.slide-right-enter {
  transform: translateX(-100%);
}

.slide-right-leave-active {
  transition: transform 0.5s ease-out;
}

.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
