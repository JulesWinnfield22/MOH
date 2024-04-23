<script setup>
import FormParent from '@/components/FormParent.vue';
import BranchForm from './BranchForm.vue';
import InsurancesDataProvider from '../InsurancesDataProvider.vue';
import FormLoading from '@/components/FormLoading.vue';
import { useApiRequest } from '@composable/useApiRequest'
import { addBranch } from '@/features/branch/api/branchesApi'
import { usebranches } from '@/features/branch/store/branchStore'
import { addToast } from '@/toast';

const branchRequest = useApiRequest()
const branchStore = usebranches()

function submit(branch) {
  console.log(branch)
  branchRequest.send(
    () => addBranch(branch),
    res => {
      if(res.success) {
        branchStore.add(res.data)
        addToast({
          type: 'success',
          message: 'Successfully created a branch'
        })
      }
    }
  )
}

</script>
<template>
  <FormParent :error="branchRequest.error.value" class="w-full" title='Add Branch'>
    <InsurancesDataProvider v-slot="{ insurances, pending }">
      <BranchForm
        v-if="!pending"
        :pending="branchRequest.pending.value"
        :insurance-options="insurances?.length && insurances.map(el => el.insuranceName)"
        :on-submit="submit"
        btn-text="Add"
      />
      <FormLoading v-else/>
    </InsurancesDataProvider>
  </FormParent>
</template>