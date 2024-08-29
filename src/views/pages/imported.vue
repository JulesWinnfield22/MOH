<template>
  <div class="bg-[#FBFBFB]">
    <div class="flex justify-between items-center">
      <div class="p-4  text-[#4E585F] font-dm-sans text-[16px] font-bold leading-[24px] text-left">
        Batches
      </div><div />
      <div class="p-4">
        <input ref="fileInput" type="file" hidden @change="handleFileUpload">
        <button
          class="w-[205px] h-[40px] px-4 py-2 gap-2.5 rounded-2xl bg-[#21618C] hover:bg-[#21618C] text-white font-bold   focus:outline-none focus:shadow-outline"
          @click="$refs.fileInput.click()"
        >
          <i class="fas fa-upload mr-2 font-dm-sans text-[16px] font-bold leading-[24px] text-left bg-white" />Import New Batch
        </button>
      </div>
    </div>

    <div class="bg-[#FBFBFB] p-4 rounded-md mb-4 text-[#4E585F]">
      <table class="w-full">
        <thead>
          <tr
            class="border-b border-b-[#D9D9D9]"
          >
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              #
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              IHRS Id
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              Full Name
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              Program
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              University
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              Duration
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              Gender
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              Monthly salary
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
             Contract Amount
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              Total Training Cost
            </th>
            <th class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
            <td class="text-left p-4">
              1
            </td>
            <td class="text-left leading-[21px] text-[14px] font-normal font-dm-sans text-[#4E585F]">
              RCB878/24
            </td>
            <td class="text-left leading-[21px] text-[14px] font-normal font-dm-sans text-[#4E585F]">
              Dr Girma Lema
            </td>
            <td class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]">
              Gondar University
            </td>
            <td class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]">
              Gondar University
            </td>
            <td class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]">
              G336
            </td>
            <td class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]">
              M
            </td>
            <td class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]">
              5000
            </td>
            <td class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]">
              60,000
            </td>
            <td class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]">
              120,000
            </td>
            <td class="text-left  flex items-center pt-2 ">
              <div>
                <button
                  class=" bg-[#092537] rounded-lg hover:bg-[#092537] py-2 px-4 flex justify-center items-center text-white font-bold"
                  @click="open = true"
                >
                  Edit
                </button>

                <div
                  :class="`modal ${
                    !open && 'opacity-0 pointer-events-none'
                  } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
                >
                  <div
                    class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
                    @click="open = false"
                  />

                  <div
                    class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
                  >
                    <div
                      class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
                    >
                      <svg
                        class="text-white fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <path
                          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                        />
                      </svg>
                      <span class="text-sm">(Esc)</span>
                    </div>

                    <!-- Add margin if you want to see some of the overlay behind the modal -->
                    <div class="px-6 py-4 text-left modal-content">
                      <!-- Title -->
                      <div class="flex items-center justify-between pb-3">
                        <p class="text-2xl font-bold">
                          Modal Title
                        </p>
                        <div class="z-50 cursor-pointer modal-close" @click="open = false">
                          <svg
                            class="text-black fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                          >
                            <path
                              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                            />
                          </svg>
                        </div>
                      </div>

                      <!-- Body -->
                      <p>Modal content.</p>

                      <!-- Footer -->
                      <div class="flex justify-end pt-2">
                        <button
                          class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
                          @click="open = false"
                        >
                          Close
                        </button>
                        <button
                          class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
                          @click="open = false"
                        >
                          Action
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class=" bg-[#092537] rounded-lg  hover:bg-[#092537] py-2 px-4 flex justify-center items-center ">
                  <a href="" class=" text-white font-bold">
                    Edit
                  </a>
                </div> -->
            </td>
          </tr>
          <!-- <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                2
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Dr. Abel Tesfaye
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  09 July 2024
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Black-lion Hospital
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Adiss Abeba
                </div>
              </td>
              <td class="text-left">
                <span class="text-[#36CB56] leading-[21px] text-[14] font-normal ">Signed</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-bold ">Approve</span>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                3
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Dr. Fimon Kiros
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  09 July 2024
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Ayder Comprehensive Hospital
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Mekelle
                </div>
              </td>
              <td class="text-left">
                <span class="text-[#36CB56] leading-[21px] text-[14] font-normal ">Signed</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-bold ">Approve</span>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                4
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Dr. Semere Tsadik
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  09 July 2024
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Black-lion Hospital
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Adiss Abeba
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold ">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold ">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold ">open</span>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                5
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold ">
                Dr. Mahlet Mengstu
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  09 July 2024
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Ayder Comprehensive Hospital
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Mekelle
                </div>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td><td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold">open</span>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                6
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Dr. Amanuel Amare
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  09 July 2024
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Gondar University
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Gonder
                </div>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold ">open</span>
              </td>

              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                6
              </td>
              <td class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]">
                Dr. Girma Lemma
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  Today
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14px] font-bold text-[#4E585F]">
                Gondar University
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Gonder
                </div>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>

              <td class="text-left">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold ">open</span>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                7
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Dr. Abel Tesfaye
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  09 July 2024
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Black-lion Hospital
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Adiss Abeba
                </div>
              </td>
              <td class="text-left">
                <span class="text-[#36CB56] leading-[21px] text-[14] font-normal ">Signed</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-bold ">Approve</span>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                8
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Dr. Fimon Kiros
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  09 July 2024
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Ayder Comprehensive Hospital
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Mekelle
                </div>
              </td>
              <td class="text-left">
                <span class="text-[#36CB56] leading-[21px] text-[14] font-normal ">Signed</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-bold ">Approve</span>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                9
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Dr. Semere Tsadik
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  09 July 2024
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Black-lion Hospital
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Adiss Abeba
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold ">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold ">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold ">open</span>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
            <tr class="border-b-[0.3px] border-b-[#D9D9D9]">
              <td class="text-left p-4">
                10
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold ">
                Dr. Mahlet Mengstu
                <div class="text-left leading-[21px] text-[12px]  font-normal text-[#4E585F]">
                  09 July 2024
                </div>
              </td>
              <td class="text-left leading-[21px] text-[14] font-bold text-[#4E585F]">
                Ayder Comprehensive Hospital
                <div class="text-left leading-[21px] text-[14px]  font-normal text-[#4E585F]">
                  Mekelle
                </div>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td><td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#21618C] leading-[21px] text-[14] font-normal ">Info Updated</span>
              </td>
              <td class="text-left">
                <span class="text-[#092537] leading-[21px] text-[14] font-bold">open</span>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
              <td
                class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr> -->
        </tbody>
      </table>
      <div class="p-4 flex flex-col items-center">
        <div class="w-full">
          <!-- Your content goes here -->
        </div>
        <div class="p-4 flex justify-end items-center w-full mt-4">
          <button class="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 mr-4" @click="prevPage">
            <span class="flex items-center">
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              PREV
            </span>
          </button>
          <div class="flex">
            <button
              v-for="page in totalPages"
              :key="page"
              class="bg-gray-200 px-3 py-2 rounded-md mx-1 hover:bg-gray-300"
              :class="{ 'bg-gray-400': currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          <button class="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-[#21618C] ml-4" @click="nextPage">
            <span class="flex items-center">
              NEXT
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
