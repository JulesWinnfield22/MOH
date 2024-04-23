<script setup>
  import FormParent from '@/components/FormParent.vue';
  import { useApiRequest } from '@composable/useApiRequest'
  import { formatCurrency } from '@/utils/utils';

  import CertificateForm from './CertificateForm.vue'  // import form goes here
  import { computed, ref } from 'vue';

  // props go gere

  const request = useApiRequest()

  function add(values) {
    console.log(values)
    // request.send(
    //   () => {
    //     // you api call
    //   },
    //   res => {
    //     toasted(res.success, 'Created Successfuly.', res.error)
    //   }
    // )
  }

  const val = ref('')
  const formated = computed(() => {
    const num = +(val.value)
    if(num == NaN) return 'val.value'
    return formatCurrency(num)
  })
  
  function keypressed(ev) {
    console.log(ev)
    if(ev.key == 'Backspace') {
      val.value = val.value.substring(0, val.value.length - 1)
    } else
      val.value += ev.key
  }

</script>
<template>
  <FormParent class="w-full" title="Add New Certificate"> 
    <!-- 
      <div class="relative isolate flex min-h-[2.5rem] rounded border border-black">
        <div tabindex="0" class="items-center flex w-full h-full flex-1 z-10">
          <input v-model="val" class="absolute w-full h-full z-10 bg-transparent" />
          <input :value="formatCurrency(val)" class="absolute w-full h-full z-0" />
        </div>
      </div>
    -->
    <CertificateForm btnText='Add Certificate' :pending='request.pending.value' :onSubmit='add' />    <!-- form goes here -->
  </FormParent>
</template>