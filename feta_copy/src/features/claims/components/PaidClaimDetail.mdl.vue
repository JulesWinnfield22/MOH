<script setup>
import FormLayout from '@/components/FormLayout.vue';
import FormParent from '@/components/FormParent.vue';
import { Input } from '@/components/form_elements';
import { ModalParent } from '@/modals';


</script>
<template>
  <ModalParent class="inset-0 flex justify-end" v-slot="{ modal }" name="PaidClaimDetail">
    <div class="flex flex-col gap-2 h-full bg-white">
      <FormParent class="w-[50rem]" title="Claim Payment Detail">
        <FormLayout>
          <template
            :key="name"
            v-for="name in Object.keys(modal.data?.claim).toSorted()"
          >
            <Input
              v-if="!['claimUuid', 'incidentDate', 'insuredPersonUuid'].includes(name)"
              :label="name.replace(/([A-Z])+/g, ' $1')"
              :value="modal.data?.claim[name]"
            />
          </template>
          <!-- <Input
            label="fullname"
            :value="modal.data?.claim?.fullname"
          />
          <Input
            label="Agency Phone"
            :value="modal.data?.claim?.agencyName"
          />
          <Input
            label="fullname"
            :value="modal.data?.claim?.fullname"
          /> -->
        </FormLayout>
      </FormParent>
    </div>
  </ModalParent>
</template>