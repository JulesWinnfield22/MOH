<script setup>
  import { Form, Input, Select } from '@com/form_elements/'
  import { provide, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useBreadcrumb } from '@/stores/breadCrumbsStore';

  const props = defineProps({
    modelValue: {
      type: String
    }
  })
  const emit = defineEmits(['update:modelValue'])

  const breadcurumbs = useBreadcrumb()

  const perPageConfig = import.meta.env?.v_PAGINATION_START

  const search = ref('')
  const perPage = ref(perPageConfig)

  provide(search)
  provide(perPage)
  
  const status = ref('Active')

  const perPageOptions = [perPageConfig, 50, 100]

  const route = useRoute()

  watch(search, () => emit('update:modelValue', search.value))
</script>
<template>
  <div class="h-full flex flex-col gap-2">
    <div class="flex items-center">
      <RouterLink class="text-sm italic" key="route.name" :to="route.path" v-for="(route, idx) in breadcurumbs.breadcrumbs.slice(1)">
        <div class="flex items-center">
          {{ route.name }}
          <div v-if="idx < breadcurumbs.breadcrumbs.length - 2">
            <h-icon class="rotate-[270deg]" name="hi-solid-chevron-down" />
          </div>
        </div>
      </RouterLink>
    </div>
    <div class='flex items-ce justify-between p-2 bg-white'>
      <div class="min-w-1/3 w-1/3">
        <div class="focus-within:border-primary overflow-hidden h-10 flex border rounded">
          <div class="h-full w-10 grid place-items-center">
            <h-icon name="oi-search" />
          </div>
          <input
            placeholder="Search"
            v-model="search"
            class="h-full px-2 w-full focus:border-none"
          />
        </div>
      </div>
      <div>
        <slot name="right-actions" />
      </div>
    </div>
    <slot :search='search' />
  </div>
</template>