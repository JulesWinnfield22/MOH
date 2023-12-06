import { addValidator } from '@/form_builder'

function requiredMultipleSelect(value) {
  console.log(value)
  function check(ary) {
    if(!(ary instanceof Array) || ary.length == 0) return [false, "this field is required"]
    
    return [true]
  }
  if(value && value.includes(",")) {
    return check(value.split(","))
  }
  return check(value)
}

function requiredMultipleSelectMethods(value) {
  console.log(value)
  function check(ary) {
    if(!(ary instanceof Array) || ary.length == 0) return [false, "this field is required"]
    
    const found = value.find(el => el.actions.length == 0)

    if(found) return [false, `${found.privilege} needs at least one method`]
    return [true]
  }
  if(value && value.includes(",")) {
    return check(value.split(","))
  }
  return check(value)
}

function apiUriValidation(value) {
  const apiRegex = /^\/api\/v\d+(\/[a-zA-Z0-9_-]+)+$/
  if(apiRegex.test(value)) return [true]
  return [false, "not a valid API route"]
}

function validateBaseUrl(value) {
  const dnsNameOrIPv4WithPortRegex = /^http:\/\/(?:[a-zA-Z0-9.-]+|(?:\d{1,3}\.){3}\d{1,3})(?::\d+)?$/;
  if(dnsNameOrIPv4WithPortRegex.test(value)) return [true]

  return [false, "not a valid base url"]
}

addValidator([requiredMultipleSelect, requiredMultipleSelectMethods, validateBaseUrl, apiUriValidation])
