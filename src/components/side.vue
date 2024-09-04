<script>
export default {
  name: 'App',
}
</script>

<template>
  <div class="flex">
    <div class="bg-gray-800 w-64 p-4">
      <div class="mb-4">
        <h1 class="text-xl font-bold text-white">
          63 ጤና ሚኒስቴር-ኢትዮጵያ
        </h1>
        <p class="text-sm text-gray-400">
          MINISTRY OF HEALTH ETHIOPIA
        </p>
      </div>
      <ul class="space-y-2">
        <li>
          <router-link to="/Dashboard" class="flex items-center text-gray-400 hover:text-white">
            <svg
              class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1"
              />
            </svg>
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/HRDI" class="flex items-center text-gray-400 hover:text-white">
            <svg
              class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 11l-7-7m0 0l-7 7m7-7v10m-7 3l7 7"
              />
            </svg>
            HRDI
          </router-link>
        </li>
        <li>
          <router-link to="/settings" class="flex items-center text-gray-400 hover:text-white">
            <svg
              class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h3m-3 0l-2-2m0 0l2-2m-2 2v4" />
            </svg>
            Settings
          </router-link>
        </li>
        <li>
          <router-link to="/repost" class="flex items-center text-gray-400 hover:text-white">
            <svg
              class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Repost
          </router-link>
        </li>
        <li>
          <router-link to="/users" class="flex items-center text-gray-400 hover:text-white">
            <svg
              class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-18 0 9 9 0 0018 0z"
              />
            </svg>
            Users
          </router-link>
        </li>
        <li>
          <router-link to="/roles" class="flex items-center text-gray-400 hover:text-white">
            <svg
              class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Roles
          </router-link>
        </li>
        <li>
          <router-link to="/privileges" class="flex items-center text-gray-400 hover:text-white">
            <svg
              class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Privileges
          </router-link>
        </li>
      </ul>
    </div>
    <div class="flex-1 p-4">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold">
            ጤና ሚኒስቴር-ኢትዮጵያ
          </h1>
          <p class="text-sm text-gray-500">
            MINISTRY OF HEALTH-ETHIOPIA
          </p>
        </div>
        <div>
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            class="w-16 h-8" alt="Google Logo"
          >
        </div>
      </div>
      <div class="bg-blue-100 p-4 rounded-md mb-4">
        <p class="text-gray-600">
          Lorem ipsum dolor sit amet consectetur. Tincidunt consectetur ultrices ipsum felis
          in au neque. Sit consectetur senectus amet duis.
        </p>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="bg-white p-4 rounded-md">
          <h2 class="text-lg font-bold mb-2">
            Total Applications
          </h2>
          <p class="text-3xl font-bold text-gray-700">
            1,345
          </p>
        </div>
        <div class="bg-white p-4 rounded-md">
          <h2 class="text-lg font-bold mb-2">
            Current Residents
          </h2>
          <p class="text-3xl font-bold text-gray-700">
            890
          </p>
        </div>
        <div class="bg-white p-4 rounded-md">
          <h2 class="text-lg font-bold mb-2">
            Contacts
          </h2>
          <p class="text-3xl font-bold text-gray-700">
            1,870
          </p>
        </div>
      </div>
      <div class="bg-white p-4 rounded-md">
        <h2 class="text-lg font-bold mb-2">
          Latest Signed Contacts
        </h2>
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">
                #
              </th>
              <th class="text-left">
                Resident
              </th>
              <th class="text-left">
                University
              </th>
              <th class="text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">
                1
              </td>
              <td class="text-left">
                Dr. Girma Lemma
              </td>
              <td class="text-left">
                Gondar University
              </td>
              <td class="text-left">
                <span class="text-green-500 font-bold">Info Updated</span>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                2
              </td>
              <td class="text-left">
                Dr. Abel Tesfaye
              </td>
              <td class="text-left">
                Black-lion Hospital
              </td>
              <td class="text-left">
                <span class="text-green-500 font-bold">Signed</span>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                3
              </td>
              <td class="text-left">
                Dr. Fimon Kiros
              </td>
              <td class="text-left">
                Ayder Comprehensive Hospital
              </td>
              <td class="text-left">
                <span class="text-green-500 font-bold">Signed</span>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                4
              </td>
              <td class="text-left">
                Dr. Semere Tsadik
              </td>
              <td class="text-left">
                Black-lion Hospital
              </td>
              <td class="text-left">
                <span class="text-green-500 font-bold">Info Updated</span>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                5
              </td>
              <td class="text-left">
                Dr. Mahlet Mengstu
              </td>
              <td class="text-left">
                Ayder Comprehensive Hospital
              </td>
              <td class="text-left">
                <span class="text-green-500 font-bold">Info Updated</span>
              </td>
            </tr>
            <tr>
              <td class="text-left">
                6
              </td>
              <td class="text-left">
                Dr. Amanuel Amare
              </td>
              <td class="text-left">
                Gondar University
              </td>
              <td class="text-left">
                <span class="text-green-500 font-bold">Info Updated</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-white p-4 rounded-md">
        <h2 class="text-lg font-bold mb-2">
          Activities
        </h2>
        <ul class="space-y-2">
          <li class="flex items-center justify-between">
            <div>
              <h3 class="text-gray-700 font-bold">
                New Application
              </h3>
              <p class="text-sm text-gray-500">
                Desta Tegegn has applied a new applications.
              </p>
            </div>
            <div class="text-gray-500">
              10m
            </div>
          </li>
          <li class="flex items-center justify-between">
            <div>
              <h3 class="text-gray-700 font-bold">
                Application Approved
              </h3>
              <p class="text-sm text-gray-500">
                Lema Girma has approved the application of a resident.
              </p>
            </div>
            <div class="text-gray-500">
              1hr
            </div>
          </li>
          <li class="flex items-center justify-between">
            <div>
              <h3 class="text-gray-700 font-bold">
                Application Rejected
              </h3>
              <p class="text-sm text-gray-500">
                Dargow Atnafu has rejected an application.
              </p>
            </div>
            <div class="text-gray-500">
              2hr
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

  <style scoped>
  body {
    background-color: #f5f5f5;
    font-family: "Arial", sans-serif;
  }

  .table {
    border-collapse: collapse;
    width: 100%;
  }

  .table th,
  .table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  </style>
