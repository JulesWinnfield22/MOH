<script setup >
import StudentDataProvider from '@/features/students/components/StudentDataProvider.vue';
import { useAuth } from '@/store/auth';
const auth = useAuth();
</script>

<template>
  <div class="container p-5">
    <StudentDataProvider v-slot="{ student, contract, pending, isRegistered }">
      {{ console.log(student) }}
      <div v-if="!pending" class="message text-center">
        <h1 v-if="isRegistered && contract.contractStatus == 'Approved'">
          <p class="font-bold text-2xl text-center text-green-600 mt-4">
  You have been approved by Legal
</p>

          Go to <RouterLink class="text-primary italic" :to='`/Sponsorship?name=${auth.auth?.user?.name}`'> Download Your sponsership letter </RouterLink>
        </h1>
        <h1 v-else-if="isRegistered && [ 'Declined'].includes(contract.contractStatus)">
         <p>
            You have been declined due to 
            {{
              contract?.rejectionReason
            }}
            so complete your documents and<button @click="$router.push('/editsignindocuments')" class="italic underline text-primary">re submit your contract</button>
          </p>
        
        
        </h1>
        <h1 v-else-if="isRegistered && [ 'Submitted'].includes(contract.contractStatus)">
         <p>
            You contract have been Succesfully Submitted so wait until <p>legal reviews your contract
           </p>
           </p>
           <p>
           If you Input your Document wrongly click here to 
           <button @click="$router.push('/editsignindocuments')" class="italic underline text-primary">Edit your Contract</button>
          </p>
        
        </h1>
        <h1 v-else-if="isRegistered">
          Go to <RouterLink class="text-primary italic" to="/SigninDocuments"> Sign In Contracts </RouterLink> For your contract
          <p>
           You need to sign-in contracts now
          </p>
        
        </h1>
      
     
        <h1 v-if="student?.registrationStatus == 'rejected'">
          <p>You have been Rejected by {{ student?.universityName }}</p>
          <p>
            due to
            {{ student?.rejectionReason }}
          </p>
        </h1>
        <div v-if="student?.registrationStatus == 'waiting'" class="w-full justify-center mb-[36px] flex">
          <h1 class="font-bold w-[650px] text-[#4E585F] font-dm-sans">
            Please Go and Report to {{ student?.universityName }} In Person!
          </h1>
        </div>
        <svg
        class="justify-center flex w-[893px]"
        width="893"
          height="1"
          viewBox="0 0 893 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line y1="0.5" x2="893" y2="0.5" stroke="#21618C" />
        </svg>
        <div v-if="student?.registrationStatus == 'waiting'" class="justify-center flex">
          <!-- <a
               href="/Profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                >  {{ auth.auth?.user?.name}}</a> -->
                <p class="text-left font-normal mt-[36px] w-[800px]">
    To register at the registrar’s office, first gather the necessary documents, such as your identification. 

          </p>  
                  </div>
        <div class="w-full py-10 justify-center">
          <svg
            class="w-full justify-center"
            width="303"
            height="230"
            viewBox="0 0 303 230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.1"
              d="M151.5 229.402C214.847 229.402 266.201 178.049 266.201 114.701C266.201 51.3534 214.847 0 151.5 0C88.1522 0 36.7988 51.3534 36.7988 114.701C36.7988 178.049 88.1522 229.402 151.5 229.402Z"
              fill="#092537"
            />
            <g opacity="0.2">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M151.212 53.2482C150.883 53.1124 150.531 53.0429 150.175 53.0435L150.172 53.0435C149.453 53.0441 148.764 53.3299 148.256 53.838C147.748 54.3459 147.462 55.0344 147.461 55.7526V59.1629H140.722L140.722 55.748C140.724 53.2439 141.72 50.843 143.49 49.0723C145.261 47.3019 147.661 46.3062 150.165 46.3037L150.166 46.3037C151.407 46.302 152.636 46.5447 153.783 47.0182C154.931 47.492 155.975 48.1875 156.854 49.065C157.733 49.9424 158.43 50.9846 158.906 52.1319C159.382 53.2791 159.627 54.5089 159.627 55.751V59.0367H152.887V55.7509C152.887 55.395 152.817 55.0426 152.68 54.7138C152.544 54.385 152.344 54.0863 152.092 53.8348C151.84 53.5833 151.541 53.384 151.212 53.2482ZM150.166 46.3037L150.165 46.3037L150.166 46.3037Z"
                fill="#092537"
              />
              <path
                d="M150.584 169.296C164.553 169.296 175.877 157.973 175.877 144.004C175.877 130.035 164.553 118.711 150.584 118.711C136.616 118.711 125.292 130.035 125.292 144.004C125.292 157.973 136.616 169.296 150.584 169.296Z"
                fill="#092537"
              />
              <path
                d="M190.492 116.12V96.7152C190.492 86.1311 186.288 75.9804 178.804 68.4963C171.319 61.0122 161.169 56.8076 150.585 56.8076C140 56.8076 129.85 61.0122 122.366 68.4963C114.882 75.9804 110.677 86.1311 110.677 96.7152V116.12C110.677 120.578 109.416 124.945 107.039 128.716C104.662 132.488 101.267 135.509 97.2448 137.432C96.3204 137.873 95.5401 138.566 94.9947 139.433C94.4493 140.299 94.1612 141.303 94.1641 142.327V142.432C94.1634 142.802 94.2356 143.168 94.3767 143.51C94.5177 143.852 94.7248 144.163 94.986 144.424C95.2473 144.686 95.5576 144.894 95.8991 145.035C96.2407 145.177 96.6069 145.25 96.9767 145.25H204.187C204.557 145.25 204.923 145.177 205.265 145.035C205.606 144.894 205.917 144.686 206.178 144.424C206.439 144.163 206.646 143.852 206.787 143.51C206.928 143.168 207.001 142.802 207 142.432V142.327C207 141.306 206.712 140.306 206.167 139.443C205.623 138.58 204.845 137.888 203.924 137.448C199.9 135.524 196.503 132.5 194.126 128.725C191.748 124.951 190.489 120.58 190.492 116.12Z"
                fill="#092537"
              />
            </g>
          </svg>
        </div>
      </div>
      <p v-else>Loading...</p>
    </StudentDataProvider>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
}

.message {
  text-align: center;
  padding: 70px;
  gap: 76px;

  height: 600px;
  width: 1133px;

  border-radius: 8px;
  background-color: #ffffff;
  text: #4e585f;
}

h1 {
  font-family: 'DM Sans', sans-serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 44.27px;
  text-align: center;
}

p {
  color: #666;
  font-family: 'DM Sans', sans-serif;
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  gap: 3px;
  margin: 20px 0;
}

.icon {
  margin-top: 20px;
  font-size: 40px;
}
</style>