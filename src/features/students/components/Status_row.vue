<script setup>
// import { openModal } from "@customizer/modal-x";
import { getColumnValue, toasted } from '@/utils/utils';
const props = defineProps({
  rowData: {
    type: Array,
    required: true,
  },
  headKeys: {
    type: Array,
  },
  rowKeys: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['row']);
console.log(props?.rowData);
</script>

<template>
  <tr
    @click.self="emit('row', row)"
    class="bg-white border-b-[0.2px]"
    :key="idx "
    v-for="(row, idx) in rowData"
  >
    <td class="p-3">{{ idx + 1 }}</td>
    <td class="p-3" :key="key" v-for="key in rowKeys">
      <div class="truncate flex gap-4" v-if="key == 'registrationStatus'">
        <p
          v-if="row?.registrationStatus == 'registered'"
          class="bg-[#00B69B] text-white px-4 py-1 rounded-full"
        >
          {{ row?.registrationStatus }}
        </p>
        <p
          v-else-if="row?.registrationStatus == 'waiting'"
          class="bg-[#FCBE2D] px-4 py-1 rounded-full text-white"
        >
          {{ row?.registrationStatus }}
        </p>
        <p
          v-else-if="row?.registrationStatus == 'rejected'"
          class="bg-[#ff0000] px-4 py-1 rounded-full text-white"
        >
          {{ row?.registrationStatus }}
        </p>
      </div>
      <div class="truncate flex gap-4" v-else-if="key == 'campusStatus'">
        <p
          v-if="row?.campusStatus == 'Attending'"
          class="bg-[#00B69B] text-white px-4 py-1 rounded-full"
        >
          {{ row?.campusStatus }}
        </p>
        <p
          v-if="row?.campusStatus == 'Graduated'"
          class="bg-gray-300 text-white px-4 py-1 rounded-full"
        >
          {{ row?.campusStatus }}
        </p>
        <p
          v-else-if="row?.campusStatus == 'Suspended'"
          class="bg-[#FCBE2D] px-4 py-1 rounded-full text-white"
        >
          {{ row?.campusStatus }}
        </p>
        <p
          v-else-if="row?.campusStatus == 'Dismissed'"
          class="bg-[#ff0000] px-4 py-1 rounded-full text-white"
        >
          {{ row?.campusStatus }}
        </p>
        <p
          v-else-if="row?.campusStatus == 'withdraw'"
          class="bg-blue-400 px-4 py-1 rounded-full text-white"
        >
          {{ row?.campusStatus }}
        </p>
      </div>

      <span v-else>
        {{ getColumnValue(key, row) }}
      </span>
    </td>
    <td
      class="p-3 flex gap-3"
      v-if="headKeys.find((head) => head.toLowerCase() == 'actions')"
    >
          <div
            v-if="isRoleHrdi && row?.registrationStatus == 'waiting'"
            class="flex gap-2"
          >
            <button @click="showEachModal(row.ernpId)">
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 0.409912C5.67157 0.409912 5 1.08149 5 1.90991V2.90991C5 3.73834 5.67157 4.40991 6.5 4.40991H11.5C12.3284 4.40991 13 3.73834 13 2.90991V1.90991C13 1.08149 12.3284 0.409912 11.5 0.409912H6.5Z"
                  fill="#FF4040"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.87868 3.28685C1.44798 2.71755 2.24209 2.5171 3.5 2.44653V2.90991C3.5 4.56677 4.84315 5.90991 6.5 5.90991H11.5C13.1569 5.90991 14.5 4.56677 14.5 2.90991V2.44653C15.7579 2.5171 16.552 2.71755 17.1213 3.28685C18 4.16553 18 5.57975 18 8.40817V14.4082C18 17.2366 18 18.6508 17.1213 19.5295C16.2426 20.4082 14.8284 20.4082 12 20.4082H6C3.17157 20.4082 1.75736 20.4082 0.87868 19.5295C0 18.6508 0 17.2366 0 14.4082V8.40817C0 5.57975 0 4.16553 0.87868 3.28685ZM9.00001 11.8493L7.03033 9.87958C6.73744 9.58669 6.26256 9.58669 5.96967 9.87958C5.67678 10.1725 5.67678 10.6473 5.96967 10.9402L7.93935 12.9099L5.96969 14.8796C5.6768 15.1725 5.6768 15.6473 5.96969 15.9402C6.26258 16.2331 6.73746 16.2331 7.03035 15.9402L9.00001 13.9706L10.9696 15.9402C11.2625 16.2331 11.7374 16.2331 12.0303 15.9402C12.3232 15.6473 12.3232 15.1725 12.0303 14.8796L10.0607 12.9099L12.0303 10.9403C12.3232 10.6474 12.3232 10.1725 12.0303 9.8796C11.7374 9.58671 11.2626 9.58671 10.9697 9.8796L9.00001 11.8493Z"
                  fill="#FF4040"
                />
              </svg>
            </button>
            <button @click="confirmeachSelection(row.ernpId)">
              <svg
                v-if="!sent.includes(row.ernpId)"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.54497 9.13996C2 10.2095 2 11.6096 2 14.4099C2 17.2102 2 18.6103 2.54497 19.6799C3.02433 20.6207 3.78924 21.3856 4.73005 21.8649C5.79961 22.4099 7.19974 22.4099 10 22.4099H14C16.8003 22.4099 18.2004 22.4099 19.27 21.8649C20.2108 21.3856 20.9757 20.6207 21.455 19.6799C22 18.6103 22 17.2102 22 14.4099C22 11.6096 22 10.2095 21.455 9.13996C20.9757 8.19915 20.2108 7.43425 19.27 6.95488C18.2004 6.40991 16.8003 6.40991 14 6.40991H10C7.19974 6.40991 5.79961 6.40991 4.73005 6.95488C3.78924 7.43425 3.02433 8.19915 2.54497 9.13996ZM15.0595 12.9094C15.3353 12.6005 15.3085 12.1263 14.9995 11.8505C14.6905 11.5746 14.2164 11.6014 13.9406 11.9104L10.9286 15.2838L10.0595 14.3104C9.78359 14.0014 9.30947 13.9746 9.0005 14.2505C8.69152 14.5263 8.66468 15.0005 8.94055 15.3094L10.3691 16.9094C10.5114 17.0688 10.7149 17.1599 10.9286 17.1599C11.1422 17.1599 11.3457 17.0688 11.488 16.9094L15.0595 12.9094Z"
                  fill="#36CB56"
                />
                <path
                  d="M20.5348 3.87438C19.0704 2.40991 16.7133 2.40991 11.9993 2.40991C7.28525 2.40991 4.92823 2.40991 3.46377 3.87438C2.70628 4.63187 2.3406 5.62815 2.16406 7.06589C2.69473 6.47523 3.33236 5.98319 4.04836 5.61837C4.82984 5.22019 5.66664 5.05871 6.59316 4.98301C7.48829 4.90988 8.58971 4.90989 9.93646 4.90991H14.0621C15.4089 4.90989 16.5103 4.90988 17.4054 4.98301C18.332 5.05871 19.1688 5.22019 19.9502 5.61837C20.6662 5.98319 21.3039 6.47523 21.8345 7.06589C21.658 5.62815 21.2923 4.63187 20.5348 3.87438Z"
                  fill="#36CB56"
                />
              </svg>
              <p v-else>...</p>
            </button>
          </div>
          <div v-else-if="row?.registrationStatus == 'rejected'">
           
            
            <button
            class="items-center bg-[#092537] text-white flex gap-2 font-dm-sans p-2 rounded-md"
            @click="openEditModal(row)"
          >
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.05539 0.636889C6.90458 -0.212296 8.28138 -0.212296 9.13056 0.636889C9.97975 1.48607 9.97975 2.86288 9.13056 3.71206L4.89204 7.95058C4.65316 8.18949 4.50728 8.33539 4.34468 8.46221C4.15311 8.61163 3.94583 8.73974 3.72651 8.84426C3.54036 8.93298 3.34462 8.99821 3.0241 9.10503L1.53239 9.60227L1.17425 9.72165C0.853682 9.8285 0.500255 9.74507 0.261318 9.50613C0.022381 9.2672 -0.0610511 8.91377 0.0458046 8.5932L0.662419 6.74336C0.76924 6.42283 0.834476 6.22709 0.923191 6.04094C1.02771 5.82162 1.15582 5.61434 1.30524 5.42277C1.43206 5.26017 1.57797 5.11429 1.81688 4.8754L6.05539 0.636889ZM1.51307 8.72621L1.04124 8.25438L1.4478 7.0347C1.56617 6.67958 1.61507 6.53519 1.67896 6.40113C1.75732 6.2367 1.85337 6.0813 1.96539 5.93767C2.05673 5.82057 2.16401 5.71227 2.42869 5.44758L5.71668 2.1596C5.8524 2.50006 6.08203 2.91097 6.46926 3.2982C6.85648 3.68543 7.2674 3.91506 7.60786 4.05077L4.31987 7.33876C4.05519 7.60345 3.94688 7.71072 3.82978 7.80206C3.68615 7.91409 3.53075 8.01013 3.36633 8.08849C3.23226 8.15239 3.08787 8.20128 2.73276 8.31965L1.51307 8.72621ZM8.27496 3.38367C8.20585 3.3685 8.11943 3.34567 8.02118 3.31158C7.75103 3.21785 7.39567 3.04062 7.06125 2.7062C6.72683 2.37178 6.5496 2.01642 6.45587 1.74627C6.42179 1.64802 6.39896 1.5616 6.38378 1.49249L6.64739 1.22889C7.16962 0.706651 8.01633 0.706651 8.53857 1.22889C9.0608 1.75112 9.0608 2.59783 8.53857 3.12006L8.27496 3.38367ZM1.13634e-05 11.5814C1.13634e-05 11.3502 0.187427 11.1628 0.418616 11.1628H9.34885V12H0.418616C0.187427 12 1.13634e-05 11.8126 1.13634e-05 11.5814Z"
                fill="white"
              />
            </svg>
            Reassign
          </button>
          </div>
        
    </td>
  </tr>
</template>