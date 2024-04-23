import { imageExtensions } from '@/utils/utils'

function checkFileType(el, {value}) {
  console.log(value)
  const extension = value.match(/\.([^.]+)$/)?.[1];
  console.log(extension)
  if(imageExtensions.includes(extension)) {
    el.className += 'img '
  }
}

const vPrivilage = {
  mounted: checkFileType,
  updated: checkFileType
}

export default vPrivilage