<script setup>
import { watchEffect, useAttrs, inject, ref, onMounted, watch, computed, onUpdated, nextTick } from "vue";

import { getValidators } from "./util/validators.js";
import { validationKeys } from "./util/validationUtils";

let validators = getValidators();
const attrs = useAttrs()
const attrss = ref(useAttrs())

const props = defineProps({
  modelValue: {
    required: false,
  },
  validation: {
    type: [Object, String]
  },
  asyncValidation: {
    type: [Object, String],
  },
  label: String,
  updateModel: Function
});

const emit = defineEmits(["async:validation", "update:modelValue"]);

const validateAll = inject("validateAll");
const id = inject("id");
const reset = inject("reset");

const error = ref("");
const input = ref();
const dirty = ref(false);
const asyncValidating = ref(false)

const value = ref('')

async function validate(checkAsyncValidation = true) {

  if (!dirty.value) dirty.value = true;

  if (!props.validation) {
    input.value.setAttribute("valid", "true");
    return;
  }

  function getValidation(validation) {
    return validation instanceof Object
      ? validation
      : (validationKeys(validation));
  }

  value.value = getValue()

  let validation = getValidation(props.validation)

  if (!validation.required && !value.value) {
    input.value.setAttribute("valid", "true");
    return;
  }

  let keys = Object.keys(validation);

  let validator = validators[input.value?.type?.split('-')[0] || 'text']

  // keys = keys.reduce((keys, key) => {
  //   if (Object.keys(validator).includes(key))
  //     keys.push(key)
  //   return keys
  // }, [])

  for (let key of keys) {
    if (!validation[key]?.args && !validation[key]?.message) {
      validation[key] = {
        args: validation[key],
        message: null
      }
    }
    const [res, msg] = validator[key](value.value, validation[key]?.args, id, validation[key]?.message);
    if (!res) {
      error.value = msg;
      input.value.setAttribute("valid", "false");

      return false;
    }
  }


  if (!props.asyncValidation) {
    error.value = "";
    input.value?.setAttribute("valid", "true");
    return true;
  }

  // this helps with when on form submit.
  // if the input is valid we dont need to check for validity
  // since the async validaity is chekced when after done typying
  if (!checkAsyncValidation) return;


  error.value = "";

  //wait for the response to make it valid
  input.value.setAttribute("valid", "fasle");

  asyncValidating.value = true;

  validation = getValidation(props.asyncValidation)

  keys = Object.keys(validation);
  const asyncFuns = keys.map((funName) => {
    if (!validation[funName]?.args && !validation[funName]?.message) {
      validation[funName] = {
        args: validation[funName],
        message: null
      }
    }
    return validator[funName](
      value.value,
      validation[funName].args,
      id,
      validation[funName]?.message
    );
  });

  const response = await Promise.all(asyncFuns);

  asyncValidating.value = false;

  for (let i = 0; i < response.length; i++) {
    if (!response[i][0]) {
      error.value = response[i][1];
      input.value.setAttribute("valid", "fasle");

      return false;
    }
  }

  error.value = "";
  input.value.setAttribute("valid", "true");
  return true;
}

const modelValue = computed(() => input?.value?.value);

function inputRef(el) {
  input.value = el
}

watch(modelValue, () => {
  dirty.value && validate();
});

watch(validateAll, (val) => {
  if (val.validate && val.first)
    validate();
  else if (val.validate)
    validate(false);
});

watch(reset, (val) => {
  if (val && input.value) {
    input.value.value = ""
    dirty.value = false,
      value.value = ''
    input.value.checked = false
  };
})

function setValue(value) {
  value.value = value
  input.value.value = value
  input.value.val = value
}

onMounted(() => {
  if (!input.value) return

  const keys = Object.keys(attrs)

  if (props.modelValue) {
    value.value = props.modelValue
    input.value.val = props.modelValue


    if (attrs.type == 'file') {
      keys.forEach(key => {
        if (key != 'value') {
          input.value[key] = attrs?.[key]
        }
      })
    } else if (attrs.type == 'checkbox') {
      input.value.value = props.modelValue
      input.value.checked = !!props.modelValue
      keys.forEach(key => {
        if (key != 'value') {
          input.value[key] = attrs?.[key]
        }
      })
    } else {
      input.value.value = props.modelValue ? props.modelValue : ''
      keys.forEach(key => {
        if (key != 'value') {
          input.value[key] = attrs?.[key]
        }
      })
    }
  } else {
    value.value = attrs.value
    input.value.val = attrs.value
    if (input.value.type == 'file') {
      Object.keys(attrs)
        .forEach(key => {
          if (key != 'value') {
            input.value[key] = attrs?.[key]
          }
        })
    } else {
      input.value.value = attrs.value ? attrs.value : ''
      Object.keys(attrs)
        .forEach(key => {
          input.value[key] = attrs[key]
        })
    }
  }

  input.value.setAttribute("valid", "false");

  input.value.addEventListener("input", () => {
    dirty.value && validate()
  })

});

// function updateAttrs() {
//   Object.keys(attrs)
//   .forEach(key => {
//     console.log(key)
//     if(key != 'value' || key != 'val')
//       input.value[key] = attrs[key]
//   })
// }

// onUpdated(() => {
//   updateAttrs()
// })

function getValue() {
  if (input.value?.type == "file") {
    if (input.value?.multiple) return input.value.files
    return input.value?.files?.[0]
  }

  if (input.value?.type == "checkbox") {
    return input.value?.checked
  }

  return input.value?.value || input.value?.getAttribute('val')
}

onMounted(() => {
  if (!input.value) return

  input.value.className += ' custom-input'
  input.value.addEventListener('blur', blurHandler)
  input.value.addEventListener('input', changeValue)
  input.value.addEventListener('change', changeValue)
})

function blurHandler() {
  !dirty.value && validate()
}

function changeValue(ev) {
  let target = ev.target  

  if (target.type == "file" && target?.multiple) {
    target.val = target?.files
    value.value = target?.files
    emit("update:modelValue", target?.files)
  } else if (target.type == "file") {
    target.val = target?.files?.[0]
    value.value = target?.files?.[0]
    emit("update:modelValue", target?.files?.[0])
  } else if (target.type == "checkbox") {
    target.val = target?.checked
    value.value = target?.checked
    emit("update:modelValue", target?.checked)
  } else if(!target.type) {
    target.setAttribute("val", target?.val || target?.value)
    value.value = target?.val || target?.value
    validate()
    emit("update:modelValue", target?.val || target?.value)
  } else {
    target.val = target?.value
    value.value = target?.val || target?.value
    emit("update:modelValue", target?.val || target?.value)
  }
}

function emitCustom(val = "update:modelValue") {
  return (value) => {
    input.value.value = value
    input.value.val = value
    changeValue({ target: input.value })
    // emit(val, value)
  }
}

</script>
<template>
  <slot
    :modelValue="value"
    :setRef='inputRef'
    :asyncValidating='asyncValidating'
    :label='label'
    :error='error'
    :attrs='$attrs'
    :emit='emitCustom()'
  />
</template>
