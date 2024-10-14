<script setup>
import { Form } from '@/components/new_form_elements';
import { ref, watch } from 'vue';
import Input from '@/components/new_form_elements/Input.vue';
import Textarea from '@/components/new_form_elements/Textarea.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import Button from '@/components/Button.vue';
import icons from '@/utils/icons';
import { crateUniversity } from '../api/uniApI';
import { toasted } from '@/utils/utils';
import { useForm } from '@/new_form_builder/useForm';
const req = useApiRequest();
const { submit } = useForm('universityForm');

const props = defineProps({

  programs: {
    type: Array,
    required: true,
  },
 
});
const selectedPrograms=ref([])

function selectAll(id){
   const idx=selectedPrograms.value.findIndex((el)=>el===id )
   if(idx > -1){
    selectedPrograms.value.splice(idx,1)

   }
   else{
    selectedPrograms.value.unshift(id)
  

   }

}

function create({ values }) {
  values.programUuid=selectedPrograms.value
  req.send(
    () => crateUniversity(values),
    (res) => {
      if (res.success) {
      }
      toasted(res.success, 'University Created', res.error);
    }
  );
}



</script>
<template>
  <div class=" flex h-full  justify-between flex-col">
    <div>

<Form class="grid grid-cols-3 gap-4"  id="universityForm" v-slot="{}">
  <Input 
    name="universityName"
    validation="required"
    label="University Name"
    :value="roles?.roleName || ''"
    :attributes="{
      placeholder: 'Enter University Name',
    }"
  />
  <div class="grid grid-cols-3 col-span-3">
    <div v-for="(pro, idx) in props.programs" :key="pro.programmeUuid" class=" flex gap-2 items-center">

      <input  @click="selectAll(pro.programmeUuid)"  type="checkbox"/>

      <div>{{pro.programName}}</div>
    </div>

  </div>
 
 
</Form>
</div>
<div class="flex items-center justify-end">
    <Button
    @click.prevent="submit(create)"
      type="primary"
      class="gap-2 m-2 flex items-center"
    >
      <i class="pb-1" v-html="icons.plus" />
      Add University
    </Button>
  </div>
  </div>
  
  
</template>
