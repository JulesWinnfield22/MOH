<script setup>
import InputParent from "../../new_form_builder/InputParent.vue";
import InputLayout from "./NewInputLayout.vue";
</script>
<template>
  <InputParent v-slot="{ setRef, error, value, changeValue }">
    <InputLayout :error="error" :label="$attrs?.label">
      <div class="flex w-full">
        <slot class="" name="left" />
        <input
          :ref="setRef"
        />
        <slot name="right" />
      </div>
    </InputLayout>
  </InputParent>
</template>