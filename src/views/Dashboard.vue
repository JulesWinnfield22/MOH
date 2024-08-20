<script setup lang="ts">
import { ref } from 'vue'

interface User {
  name: string
  email: string
  title: string
  title2: string
  status: string
  role: string
}

const testUser: User = {
  name: 'John Doe',
  email: 'john@example.com',
  title: 'Software Engineer',
  title2: 'Web dev',
  status: 'Active',
  role: 'Owner',
}

const users = ref<User[]>([...Array(10).keys()].map(() => testUser))
</script>

<template>
  <div class="grid grid-cols-3">
    <div class="flex col-span-2 flex-col p-4">
      <!-- <div class="flex items-center justify-between mb-4">
      <<div class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-[#092537] lg:translate-x-0 lg:static lg:inset-0 bg-cover bg-center" style="background-image: url('.../assets/Untitled.jpg');">
        <h1 class="text-2xl font-bold ">
          63 ጤና ሚኒስቴር-ኢትዮጵያ
        </h1>
        <p class="text-sm text-gray-500 ">
          MINISTRY OF HEALTH-ETHIOPIA
        </p>
      </div> -->
      <div
        class="bg-[#092537] p-4 leading-8 h-[210px] max-w-full rounded-2xl relative overflow-hidden"
      >
        <!-- Parent Background -->

        <!-- Inner Background -->
        <div
          class="absolute inset-0 bg-[#85CEFF] p-4 leading-8 h-[100.35px] w-[798.89px] rounded-[0px 0px 10px 0px] transform rotate-[16.16deg] ml-28"
        >
          <!-- Content inside inner div -->
        </div>
        <div
          class="absolute inset-0 bg-[#21618C] p-4 leading-8 h-[100.35px] w-[910.91px] rounded-[0px 0px 10px 0px] transform rotate-[16.16deg] ml-[20rem]"
        >
          <!-- Content inside inner div -->
        </div>
        <div class="flex items-center px-4" style="margin-bottom: 10px;">
          <img class="w-[69px] h-[69px]" src="../assets/Icons/Union.png">
        </div>
        <div class="ml-4 flex flex-col gap-1 w-[175px] h-[28px] text-[#FFFFFF] leading-[21px] text-[14px]" style="margin-bottom: 30px;">
          <span class="text-md whitespace-nowrap font-normal">ጤና ሚኒስቴር-ኢትዮጵያ</span>
          <span class="text-xs  font-dm-sans whitespace-nowrap">MINISTRY OF HEALTH ETHIOPIA</span>
        </div>
        <div class="ml-4 flex flex-col gap-1 font-dm-sans" style="margin-top: 30px;">
          <span class="text-left whitespace-nowrap leading-[21px] text-[14px] font-normal text-[#FFFFFF]">Lorem ipsum dolor sit amet consectetur. Tincidunt consectetur ultrices ipsum felis</span>
          <span class="text-left text-[#FFFFFF] leading-[21px] text-[14px] font-normal whitespace-nowrap">in eu neque. Sit consectetur senectus amet duis.</span>
        </div>
      </div>
      <div class="bg-[#FBFBFB] p-4 rounded-md mb-4">
        <!-- <p class="text-gray-600">
        Lorem ipsum dolor sit amet consectetur. Tincidunt consectetur ultrices ipsum felis
        in au neque. Sit consectetur senectus amet duis.
      </p> -->
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="bg-[#FBFBFB] p-4 rounded-md">
          <h2
            class="text-sm font-normal mb-2 leading-[21px] text-[#4E585F] font-dm-sans"
          >
            Total Applications
          </h2>
          <p class="text-3xl font-bold leading-8 text-[#4E585F]">
            1,345
          </p>
        </div>
        <div class="bg-[#FBFBFB] p-4 rounded-md">
          <h2
            class="text-sm font-normal mb-2 leading-[21px] text-[#4E585F] font-dm-sans"
          >
            Current Residents
          </h2>
          <p class="text-3xl font-bold leading-8 text-[#4E585F]">
            890
          </p>
        </div>
        <div class="bg-[#FBFBFB] p-4 rounded-md">
          <h2
            class="text-sm font-normal mb-2 leading-[21px] text-[#4E585F] font-dm-sans"
          >
            Contacts
          </h2>
          <p class="text-3xl font-bold leading-8 text-[#4E585F]">
            1,870
          </p>
        </div>
      </div>
      <div class="bg-[#FBFBFB] p-4 rounded-md mb-4 text-[#4E585F] w-[704.7px]">
        <h2 class="text-lg font-bold mb-4 leading-6 text-[#4E585F]">
          Latest Signed Contacts
        </h2>
        <table class="w-full">
          <thead>
            <tr class="border-b border-b-[#D9D9D9]">
              <th
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                #
              </th>
              <th
                class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]"
              >
                Resident
              </th>
              <th
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                University
              </th>
              <th
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Location
              </th>
              <th
                class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]"
              >
                Status
              </th>
              <th class="text-left" />
            </tr>
          </thead>
          <tbody>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-2">
                1
              </td>
              <td
                class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]"
              >
                Dr. Girma Lemma
                <div
                  class="text-left leading-[21px] text-[12px] font-normal text-[#4E585F]"
                >
                  Today
                </div>
              </td>
              <td
                class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]"
              >
                Gondar University
              </td>
              <td
                class="text-left leading-[21px] text-[14px] font-normal text-[#4E585F]"
              >
                Gonder
              </td>
              <td class="text-left">
                <span
                  class="text-[#21618C] leading-[21px] text-[14] font-normal"
                >Info Updated</span>
              </td>

              <td class="text-left">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold">open</span>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-2">
                2
              </td>
              <td
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Dr. Abel Tesfaye
                <div
                  class="text-left leading-[21px] text-[12px] font-normal text-[#4E585F]"
                >
                  09 July 2024
                </div>
              </td>
              <td
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Black-lion Hospital
              </td>
              <td
                class="text-left leading-[21px] text-[14px] font-normal text-[#4E585F]"
              >
                Adiss Abeba
              </td>
              <td class="text-left">
                <span
                  class="text-[#36CB56] leading-[21px] text-[14] font-normal"
                >Signed</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-bold">Approved</span>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-2">
                3
              </td>
              <td
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Dr. Fimon Kiros
                <div
                  class="text-left leading-[21px] text-[12px] font-normal text-[#4E585F]"
                >
                  09 July 2024
                </div>
              </td>
              <td
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Ayder Comprehensive Hospital
              </td>
              <td
                class="text-left leading-[21px] text-[14px] font-normal text-[#4E585F]"
              >
                Mekelle
              </td><td class="text-left">
                <span
                  class="text-[#36CB56] leading-[21px] text-[14] font-normal"
                >Signed</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-bold">Approved</span>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-2">
                4
              </td>
              <td
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Dr. Semere Tsadik
                <div
                  class="text-left leading-[21px] text-[12px] font-normal text-[#4E585F]"
                >
                  09 July 2024
                </div>
              </td>
              <td
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Black-lion Hospital
              </td>
              <td
                class="text-left leading-[21px] text-[14px] font-normal text-[#4E585F]"
              >
                Adiss Abeba
              </td><td class="text-left leading-[21px] text-[14] font-bold">
                <span
                  class="text-[#21618C] leading-[21px] text-[14] font-normal"
                >Info Updated</span>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold">open</span>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-2">
                5
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold">
                Dr. Mahlet Mengstu
                <div
                  class="text-left leading-[21px] text-[12px] font-normal text-[#4E585F]"
                >
                  09 July 2024
                </div>
              </td>
              <td
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Ayder Comprehensive Hospital
              </td>
              <td
                class="text-left leading-[21px] text-[14px] font-normal text-[#4E585F]"
              >
                Mekelle
              </td>
              <td class="text-left">
                <span
                  class="text-[#21618C] leading-[21px] text-[14] font-normal"
                >Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold">open</span>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-2">
                6
              </td>
              <td
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Dr. Amanuel Amare
                <div
                  class="text-left leading-[21px] text-[12px] font-normal text-[#4E585F]"
                >
                  09 July 2024
                </div>
              </td>
              <td
                class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]"
              >
                Gondar University
              </td>
              <td
                class="text-left leading-[21px] text-[14px] font-normal text-[#4E585F]"
              >
                Gonder
              </td><td class="text-left">
                <span
                  class="text-[#21618C] leading-[21px] text-[14] font-normal"
                >Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold">open</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="bg-[#FBFBFB] p-4 rounded-[16px 24px 16px 24px] gap-2.5 ml-12 rounded-md w-[297px]" style="margin-bottom: 30px;">
      <h2 class="text-lg font-bold mb-2 " style="margin-bottom: 30px;">
        Activities
      </h2>
      <ul class="space-y-2">
        <li class="flex items-center justify-between mb-4">
          <div class="bg-[#FFFFFF]" style="margin-bottom: 30px;">
            <h3 class="text-[#4E585F] leading-[21px] text-[14px] font-bold">
              New Application
              <span class="text-[#4E585F] text-[12px] ml-[96px] text-right">10 min</span>
            </h3>
            <p class="text-[#4E585F] leading-[18px] text-[12px] font-normal">
              Desta Tegegn has applied a new
            </p>
            <p class="text-[#4E585F] leading-[18px] text-[12px] font-normal">
              applications.
            </p>
          </div>
        </li>
        <li class="flex items-center justify-between">
          <div class="bg-[#FFFFFF]" style="margin-bottom: 30px;">
            <h3 class="text-[#4E585F] leading-[21px] text-[14px] font-bold">
              Application Approved
              <span class="text-[#4E585F] text-[12px] ml-[80px] text-right">1 hr</span>
            </h3>
            <p class="text-[#4E585F] leading-[18px] text-[12px] font-normal">
              Lema Girma has approved the application of a resident.
            </p>
          </div>
        </li>
        <li class="flex items-center justify-between">
          <div class="bg-[#FFFFFF]" style="margin-bottom: 30px;">
            <h3 class="text-[#4E585F] leading-[21px] text-[14px] font-bold">
              Application Rejected
              <span class="text-[#4E585F] text-[12px] ml-[80px] text-right">2 hr</span>
            </h3>
            <p class="text-[#4E585F] leading-[18px] text-[12px] font-normal">
              Dargow Atnafu has rejected an application.
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
