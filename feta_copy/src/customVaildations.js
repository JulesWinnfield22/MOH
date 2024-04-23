import { addValidator } from '@/form_builder'

function requiredMultipleSelect(value, _, __, message) {
  console.log(value)
  function check(ary) {
    if(!(ary instanceof Array) || ary.length == 0) return [false, message || "this field is required"]
    
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

function greaterThanToday(value) {
  var date = new Date(value)
  var now = new Date()
  if(date > now) return [true]
  return [false, 'must be greater than today']
}

function lessThanOrEqualToToday(value) {
  var date = new Date(value)
  var now = new Date()
  if(date <= now) return [true]
  return [false, 'must be less that or equal to today']
}

function greaterThanEffectiveDate(value, name, formId) {
  let form = document.querySelector("#"+formId)
  var effectiveDate = form[name].value
  effectiveDate = new Date(effectiveDate)
  var endDate = new Date(value)
  if(endDate > effectiveDate) return [true]
  return [false, 'must be greater than Effective date']
}

addValidator([lessThanOrEqualToToday, greaterThanToday, greaterThanEffectiveDate, requiredMultipleSelect, requiredMultipleSelectMethods, validateBaseUrl, apiUriValidation])
