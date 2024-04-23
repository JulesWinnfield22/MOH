<script setup>
  import TableWrapper from '@com/TableWrapper.vue';
  import FeaturesPage from '@com/FeaturesPage.vue'
  import RoelsDataProvider from '@roles/components/RoelsDataProvider.vue'
  import TableRowSkeleton from '@skl/TableRowSkeleton.vue';
  import { openModal } from '@/modals';
  import { useRoute } from 'vue-router';

  function formatRoles(roles) {
    if(!roles || roles.lenght == 0) return []

    return roles.reduce((state, role) => {
      role.privis = role.privileges.reduce((state, privilege, idx) => {
        state += privilege
        if(idx != role.privileges.length - 1) {
          state += ', '
        }
        return state
      }, '')
      state.push(role)
      return state
    }, []) 
  }

  function removeRole(id, remove) {
    openModal('Confirmation', {
      message: 'Are you sure you want to delete this role?'
    }, res => {
      if(res) {
        remove(id)
      }
    })
  }

  const route = useRoute()
</script>
<template>
  <FeaturesPage v-slot="{ search, perPage, status }" btnText="Add Role" @add="openModal('AddRoleForm')" >
    <RoelsDataProvider :search="search" :per-page="perPage" v-slot="{ roles, pending, remove }" :status="status">
      <TableWrapper
        :pending="pending"
        :Fallback="TableRowSkeleton"
        :headers="{
          head: ['role', 'privilages', 'role description', 'modify'],
          row: ['roleName', 'privis', 'roleDescription']    
        }"
      >
        <template #row>
          <tr class="z-0 cursor-pointer" :key="row.id"
            v-for="(row, index) in roles">
            <td>{{ index + 1 }}</td>
            <td>
              {{row.roleName}}
            </td>
            <td>
              <div class="flex gap-4 flex-wrap">
                <div class="leading-none flex gap-1 flex-col" :key="privi" v-for="privi in row.privileges">
                  <p class="font-medium">{{ privi?.split && privi.split(",")?.[0] }}</p>
                  <p class="text-primary rounded-xl inline-flex text-xs">{{ privi.split ? privi.split(",")?.[1] : privi?.privilegeName }}</p>
                </div>
              </div>
            </td>
            <td>
              {{ row.roleDescription }}
            </td>
            <td v-if="['role', 'privilages', 'role description', 'modify'].map(head => head.toLowerCase()).includes('modify')">
              <div @click.stop="() => { }" class="flex justify-start gap-2">
                <button class="text-red-500" v-if="route.path?.includes('remove')" @click.prevent="() => removeRole(row.roleUuid, remove)">
                  Delete
                </button>
                <button class="text-red-500" v-if="route.path?.includes('suspend')" @click.prevent="emit('action:suspend', row)">
                  Suspend
                </button>
                <button class="text-primary" v-if="route.path?.includes('edit')" @click.prevent="openModal('EditRoleForm', {role: row})">
                  Edit
                </button>
              </div>
            </td>
          </tr>
        </template>
      </TableWrapper>
    </RoelsDataProvider>
  </FeaturesPage>
</template>