<script setup>
import FormParent from '@/components/FormParent.vue';
import BranchForm from './BranchForm.vue';
import InsurancesDataProvider from '../InsurancesDataProvider.vue';
import FormLoading from '@/components/FormLoading.vue';
import { useApiRequest } from '@composable/useApiRequest'
import { editBranch } from '@/features/branch/api/branchesApi'
import { usebranches } from '@/features/branch/store/branchStore'
import { addToast } from '@/toast';

const props = defineProps({
  branch: {
    type: Object,
    required: true
  }
})


const branchRequest = useApiRequest()
const branchStore = usebranches()

function submit(branch) {
  console.log(branch)
  branchRequest.send(
    () => editBranch(props.branch?.insuranceUuid, branch),
    res => {
      if(res.success) {
        branchStore.update(props.branch?.insuranceUuid, res.data)
        addToast({
          type: 'success',
          message: 'Successfully updataed a branch'
        })
      }
    }
  )
}

</script>
<template>
  <FormParent title='Update Branch'>
    <InsurancesDataProvider v-slot="{ insurances, pending }">
      <BranchForm
        v-if="!pending"
        :pending="branchRequest.pending.value"
        :branch="branch"
        :insurance-options="insurances?.length && insurances.map(el => el.insuranceName)"
        :on-submit="submit"
        btn-text="update"
      />
      <FormLoading v-else />
    </InsurancesDataProvider>
  </FormParent>
</template>