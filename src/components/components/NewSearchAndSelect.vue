<script setup>
import { ref, watch } from 'vue'
import InputLayout from '../components/new_form_elements/NewInputLayout.vue'
import { useApiRequest } from '../../composables/useApiRequest'
import { InputParent } from '../../new_form_builder'

const props = defineProps({
  modelValue: {
    required: false,
  },
  store: {
    type: Object,
  },
  onInput: {
    type: Function,
    required: true,
  },
  attributes: {
    type: Object,
  },
  value: {
    type: String,
  },
  toBeSelected: {
    type: String,
    default: 'agencyName',
  },
  matchId: {
    type: String,
    default: 'agencyUuid',
  },
})

const emit = defineEmits(['update:modelValue'])

const agencyReq = useApiRequest()

const search = ref('')
const selected = ref(props.value || '')
const agencies = ref([])

let controller
function getAgency() {
  if (controller)
    controller.abort()

  controller = new AbortController()

  agencyReq.send(
    () =>
      props.onInput(
        {
          search: search.value,
        },
        {
          signal: controller.signal,
        },
      ),
    (res) => {
      if (res.success) {
        agencies.value = res.data
        if (props.store && Array.isArray(res.data))
          props.store.set(res.data)
      }

      openDropdown.value = true
    },
  )
}

watch(search, getAgency)
watch(selected, () => {
  console.log(search.value)
  search.value = agencies.value.find(
    el => el?.[props.matchId] == selected.value,
  )?.[props.toBeSelected]
})

const openDropdown = ref(false)

watch(search, () => console.log(search.value))
</script>

<template>
  <InputParent
    v-slot="{ setRef, value, error }"
    v-model="selected"
    :attributes="attributes"
  >
    <InputLayout v-bind="$attrs" :error="error">
      <div :ref="setRef" class="relative focus:border-0 w-full flex">
        <OnClickOutside class="flex-1" @trigger="openDropdown = false">
          <div class="flex h-full">
            <input
              v-model="search"
              class="flex-1 placeholder:text-text-clr placeholder:opacity-60"
              :placeholder="attributes?.placeholder"
              name="search"
            >
            <div
              class="cursor-pointer h-full ml-auto w-8 flex items-center justify-center"
              @click="openDropdown = !openDropdown"
            >
              <h-icon name="fa-angle-down" />
            </div>
          </div>
          <div
            v-if="openDropdown || agencyReq.pending.value"
            class="absolute top-full mt-[1px] z-20 rounded overflow-hidden border-black bg-white border w-full left-0"
          >
            <p
              v-for="agency in agencies"
              v-if="openDropdown"
              :key="agency?.[matchId]"
              tabindex="0"
              class="p-2 bg-white cursor-pointer"
              @click="
                () => {
                  selected = agency?.[matchId];
                  emit('update:modelValue', selected);
                }
              "
            >
              {{ agency?.[toBeSelected] }}
            </p>
            <div
              v-if="agencyReq.pending.value"
              class="p-2 focus:bg-gray-400 bg-white grid place-items-center"
            >
              <h-icon name="fa-spinner" class="animate-spin" />
            </div>
            <div
              v-if="
                !agencyReq.response.value?.length && !agencyReq.pending.value
              "
              class="p-2 bg-white grid place-items-center"
              @click="
                () => {
                  selected = search;
                  emit('update:modelValue', selected);
                }
              "
            >
              no data found (select)
              <p
                class="text-sm italic"
                @click="
                  () => {
                    selected = search;
                    emit('update:modelValue', search);
                  }
                "
              >
                {{ search }}
              </p>
            </div>
          </div>
        </OnClickOutside>
      </div>
    </InputLayout>
  </InputParent>
</template>
