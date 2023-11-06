export const AL = data => alert(JSON.stringify(data));
export const parseJSON = data => data !== "undefined" && JSON.parse(data);
export const getLocal = key => parseJSON(window.localStorage.getItem(key));
export const setLocal = (key, value) =>localStorage.setItem(key, JSON.stringify(value));
export const rmLocal = key => localStorage.removeItem(key);
