<script setup>
import NewFormParent from '@/components/components/NewFormParent.vue';
import UniversityForm from '../form/UniversityForm.vue';
import ProgramDataProvider from '@/features/programs/components/ProgramDataProvider.vue';
import Button from '@/components/Button.vue';
import icons from '@/utils/icons';
import { useForm } from '@/new_form_builder/useForm';
import { useUniversity } from '../../university/store/uniStore';
import { useApiRequest } from '@/composables/useApiRequest';
import { crateUniversity } from '../../university/api/uniApI';
import { toasted } from '@/utils/utils';

const { submit } = useForm('universityForm');
const role = useUniversity();

</script>
<template>
  <NewFormParent class="!p-0" size="xl" title="Add University">
    <ProgramDataProvider :pre-page="50" v-slot="{ programs, pending }">
      <UniversityForm v-if="!pending" :programs="programs" />
      <p v-else>Loading...</p>
    </ProgramDataProvider>
    <!-- <template #bottom>
      <div class="flex items-center justify-end">
        <Button
          :pending="req.pending.value"
          @click.prevent="submit(create)"
          type="primary"
          class="gap-2 m-2 flex items-center"
        >
          <i class="pb-1" v-html="icons.plus" />
          Add University
        </Button>
      </div>
    </template> -->
  </NewFormParent>
</template>
