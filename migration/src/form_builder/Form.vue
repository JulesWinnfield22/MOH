<script setup>
import { ref, provide, nextTick, reactive, watch } from "vue";

const form = ref();
const validateAll = reactive({
  validate: false,
  first: true
});

const valid = ref(false);

const reset = ref(false);

function resetValue() {
  reset.value = true
  nextTick(() => {
    reset.value = false
  })
}

const id = "form_" + Math.floor(Math.random() * 10000);

provide("validateAll", validateAll);
provide("reset", reset);
provide("id", id);

function submit(fun = (f) => f) {
  validateAll.validate = true;

  nextTick(() => {
    if (!form.value) return false;
    var res = [...form.value.querySelectorAll('.custom-input')]
      .map((el) => {
        return el
      })
      .filter((el) => el.classList.contains("custom-input"))
      .reduce((state, el) => {
        state.values[el.name] = el.val || el.getAttribute("val")
        state.valid.push(el.getAttribute("valid") == "true")
        state.both[el.name] = state.valid.at(-1)
        return state
      }, { values: {}, valid: [], both: {} })

    let allValid = res.valid.every(el => el == true)
    if (allValid) {
      fun({ values: res.values, reset: resetValue });
    }

    valid.value = allValid;
    validateAll.validate = false;
    validateAll.first = false;
  });
}
</script>
<template>
  <form autocomplete="off" :id="id" ref="form" action="">
    <slot :valid="valid" :submit="submit"></slot>
  </form>
</template>
