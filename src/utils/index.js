import ApiCall from "./ApiCall";

const AL = (data) => alert(JSON.stringify(data));
const parseJSON = (data) => data !== "undefined" && JSON.parse(data);
const getLocal = (key) => parseJSON(window.localStorage.getItem(key));
const setLocal = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
const rmLocal = (key) => localStorage.removeItem(key);
const generatePayload = (selectedChips) => {
  return selectedChips.reduce((acc, cur) => {
    acc.push(cur.id);
    return acc;
  }, []);
};

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const reduceArrayByKeys = (array, keys) =>
  array.flatMap((item) => keys.map((key) => item[key]));

const readFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target.result;
    callback(result);
  };
  reader.readAsDataURL(file);
};

function encodeParam(param) {
  return encodeURIComponent(param);
}

export {
  ApiCall,
  getLocal,
  setLocal,
  readFile,
  parseJSON,
  AL,
  rmLocal,
  encodeParam,
  debounce,
  generatePayload,
  reduceArrayByKeys,
};
