<script setup>
import InputError from '@/components/new_form_elements/InputError.vue';
import InputParent from '@/new_form_builder/InputParent.vue';
import { computed, ref } from 'vue';

const props = defineProps({
  label: String,
  value: String,
  options: {
    type: Array,
    required: true,
  },
  validation: String,
});
const selected = ref([]);

const group = computed(() => {
  return props.options.reduce((state, el) => {
    if (state[el.category]) {
      state[el.category].push(el);
    } else {
      state[el.category] = [el];
    }
    return state;
  }, {});
});

function toggle(id) {
  if (!selected.value.includes(id)) {
    selected.value.push(id);
  } else {
    const idx = selected.value.findIndex((el) => el == id);
    idx > -1 && selected.value.splice(idx, 1);
  }
  console.log(selected.value);
}

const isChecked = computed(() => {
  return (id) => selected.value.includes(id);
});

const isAllChecked = computed(() => {
  return (category) =>
    group.value[category].every((el) =>
      selected.value.includes(el.privilegeUuid)
    );
});

function selectAll(checked, category) {
  const ids = group.value[category].map((el) => el.privilegeUuid);
  selected.value = selected.value.filter((el) => !ids.includes(el));
  if (checked) {
    selected.value = [...selected.value, ...ids];
  }
}
</script>
<template>
  <InputParent
    :validation="validation"
    v-model="selected"
    v-slot="{ setRef, error }"
  >
    <div :ref="setRef" class="flex flex-col gap-2">
      <div class="flex items-center gap-2 border-b py-2">
        <span
          :data-required="
            `${validation}`.includes('required') ? 'true' : 'false'
          "
          :title="label"
          class="text-sm text-secondary font-bold capitalize px-1 truncate"
          v-if="label"
          >{{ label }}</span
        >
        <InputError :error="error" />
      </div>
      <div class="grid grid-cols-4 gap-y-4">
        <div class :key="category" v-for="category in Object.keys(group)">
          <div class="border-b py-2 flex items-center gap-2">
            <input
              :checked="isAllChecked(category)"
              @click="(ev) => selectAll(ev.target.checked, category)"
              class="size-5"
              type="checkbox"
            />
            <p class="font-bold text-primary">{{ category }}</p>
          </div>
          <div
            class="flex items-center py-2 gap-2"
            :key="privilege.privilegeName"
            v-for="privilege in group[category]"
          >
            <input
              :checked="isChecked(privilege.privilegeUuid)"
              @click="toggle(privilege.privilegeUuid)"
              class="size-4"
              type="checkbox"
            />
            <p class="font-medium text-secondary">
              {{ privilege.privilegeName }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </InputParent>
</template>
