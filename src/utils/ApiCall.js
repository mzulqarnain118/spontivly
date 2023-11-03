import axios from "axios";
import config from "../config";
import ExceptionHandler from './ExceptionHandling'
export default function ApiCall(url, method, data, token) {
  const base_url = `${config.REACT_APP_BACKEND_URL}/api/`;
  return axios({
    url: base_url + url,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    data: data,
    method,
  }).catch((err) => {
    ExceptionHandler(err);
  });
}
