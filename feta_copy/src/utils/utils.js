import { addToast } from "@/toast"
import numberToWords from 'number-to-words'

export function getQueryFormObject(query) {
  return Object.keys(query) 
  .reduce((querys, q, idx) => {
    querys += `${q}=${query[q]}`
    if(idx != Object.keys(query).length - 1) 
    querys += `&`
    return querys
  }, "?")
}

export const toast = {
  success: (message) => {
    addToast({
      type: 'success',
      message
    })
  },
  error: (message) => {
    addToast({
      type: 'error',
      message
    })    
  }
}

export function toasted(type, succMsg, errMsg) {
  if(type) {
    toast.success(succMsg)
  } else {
    toast.error(errMsg)
  }
}

export function addFullname(data) {
  if(!(data instanceof Array)) return
  return data.reduce((el, payload) => {
    payload.fullname = `${payload.firstName} ${payload.fatherName} ${payload.grandFatherName}`
    el.push(payload)
    return el
  }, [])
}

export function getImageUrlFormBlob(blob) {
  if(!blob) return
  return URL.createObjectURL(blob);
}

export function getExtension(filename) {
  if(!filename) return

  const extension = filename.match(/\.([^.]+)$/)?.[1];
  return extension
}

export function getFileType(filename) {
  if(!filename) return
  const ext = getExtension(filename)
  if(imageExtensions.includes(ext)) return 'img'
  if(documentExtensions.includes(ext)) return 'file'
  if(videoFileTypes.includes(ext)) return 'video'
}

export async function allRequest(funs) {
  try {
    const keys = Object.keys(funs)
    
    const res = await  Promise.all(keys.map(name => funs[name]))

    return {
      success: true,
      data: keys.reduce((state, name, idx) => {
        state[name] = res[idx]?.data
        return state
      }, {}),
      status: 200,
      error: ''
    }
  } catch(err) {
    return {
      success: false,
      data: null,
      status: err?.response?.status,
      error: err?.message
    }
  }
}

export function formatCurrency(currencyValue) {
  if(!currencyValue) return

  console.log(currencyValue)
  if(!currencyValue) return
  const currencyFormat = new Intl.NumberFormat('am-ET', { style: 'currency', currency: 'ETB' }).format(parseInt(currencyValue));
  return currencyFormat
}

export function secondDateFormat(d) {
  if(!d) return
  try {
    const date = new Date(d)
    const dateFormat = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
    console.log(dateFormat);
    return dateFormat
  } catch(err) {
    return ''
  }
}

export function getAgeFormDate(date) {
  const now = (new Date()).getFullYear()
  const age = (new Date(date)).getFullYear()
  return parseInt(now - age)
}

export async function getBgbase64Url(url) {
	return new Promise(async (res) => {
		const logoBlob = await (await fetch(url)).blob()
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64Image = reader.result;
			res(base64Image)
		};
		reader.readAsDataURL(logoBlob);
	})
}

export function addYear(date, year) {
	const givenDate = new Date(date);

// Add two years
	const modifiedDate = new Date(givenDate);
	modifiedDate.setFullYear(modifiedDate.getFullYear() + year);

	console.log(modifiedDate);
	return modifiedDate
}

export async function aggregateFunctionResponse(req) {
  const keys = Object.keys(req)
  try {
    const res = await Promise.all(keys.map(key => req[key]))
    return {
      success: true,
      data: keys.reduce((state, el, idx) => {
        state[el] = res?.[idx]?.data
        return state
      }, {})
    }
  } catch (err) {
    return {
      success: false,
      data: '',
      error: err.message
    }
  }
}

export function toWords(num) {
  return numberToWords.toWords(num)
}

export const imageExtensions = [
  'jpeg',
  'jpg',
  'png',
  'gif',
  'bmp',
  'tiff',
  'tif',
  'webp',
  'svg',
  'ico',
  'jfif',
  'jpe',
  'jif',
  'jfif-tbnl',
  'jfi',
  'jp2',
  'jpx',
  'j2k',
  'j2c',
  'fpx',
  'pcd',
];

export const documentExtensions = [
  'txt',
  'doc',
  'docx',
  'rtf',
  'pdf',
  'odt',
  'xls',
  'xlsx',
  'csv',
  'ppt',
  'pptx',
  'pps',
  'odp',
  'ods',
  'odp',
  'odg',
  'odf',
  'odc',
  'odm',
  'ott',
  'oth',
  'odft',
  'pub',
  'pages',
  'numbers',
  'key',
];

const videoFileTypes = [
  'mp4',
  'webm',
  'ogg',
  'mpeg',
  '3gpp',
  '3gpp2',
  'x-ms',
  'x-flv',
  'x-matroska',
  'x-ms-wmv',
  'quicktime',
  'x-ms-asf',
  'x-ms-dvr',
  'x-ms-dxv',
  'x-ms-wvx',
  'x-la-asf',
  'x-ms-vob',
  'x-ms-wmx',
  'vnd.dlna.mpeg-tts',
  'vnd.dlna.mpeg-tts-protected',
  'vnd.sealed.mpeg1',
  'vnd.sealed.mpeg4',
  'vnd.sealed.swf',
  'vnd.sealedmedia.softseal.mov',
  'x-f4v',
  'x-fli',
  'x-flic',
  'x-m4v',
  'x-mng',
  'x-ms-ivf',
  'x-sgi-movie',
  'x-smv',
  'x-swf',
  'x-vob',
];