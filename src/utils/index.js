import qs from 'qs'
import { ApiCall } from './ApiCall'

const encodeParams = (params, customArrayFormat = 'comma') => {
  let arrayFormat

  switch (customArrayFormat) {
    case 'brackets':
      arrayFormat = 'brackets'
      break
    case 'comma':
    default:
      arrayFormat = 'comma'
  }

  return qs.stringify(params, { arrayFormat })
}

const AL = (data) => alert(JSON.stringify(data))
const parseJSON = (data) => data !== 'undefined' && JSON.parse(data)
const getLocal = (key) => parseJSON(window.localStorage.getItem(key))
const setLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const rmLocal = (key) => localStorage.removeItem(key)
const generatePayload = (selectedChips) => {
  return selectedChips.reduce((acc, cur) => {
    acc.push(cur.id)

    return acc
  }, [])
}

const debounce = (func, delay) => {
  let timeoutId

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

const reduceArrayByKeys = (array, keys, obj) => array.flatMap((item) => keys.map((key) => (obj ? item[obj][key] : item[key])))

const readFile = (file, callback) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    const result = e.target.result

    callback(result)
  }

  reader.readAsDataURL(file)
}

const handleShowYoutubeThumbnail = (url, type) => {
  if (type === 'youtube') {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
    const videoId = videoIdMatch ? videoIdMatch[1] : null

    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
  }

  return null
}

export const handleOpenUrlInNewTab = (url, type, navigate) => {
  if (type === 'pdf') {
    navigate(`/pdf-viewer?${encodeURIComponent(url)}`)
  } else {
    window.open(url, '_blank')
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function isImageFile(filePath) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']
  const lowerCaseFilePath = filePath?.toLowerCase()

  return imageExtensions.some((ext) => lowerCaseFilePath.endsWith(`.${ext}`))
}

export {
  ApiCall,
  getLocal,
  setLocal,
  readFile,
  parseJSON,
  AL,
  rmLocal,
  encodeParams,
  debounce,
  generatePayload,
  reduceArrayByKeys,
  handleShowYoutubeThumbnail,
  capitalizeFirstLetter,
  isImageFile
}
