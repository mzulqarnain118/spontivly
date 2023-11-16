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

export { ApiCall, getLocal, setLocal, parseJSON, AL, rmLocal, generatePayload };
