import axios from "axios";
import config from "../config";
import ExceptionHandler from "./ExceptionHandler";
import { getLocal } from "./index";

export default function ApiCall(url, method="GET", data) {
  const token = getLocal("token");
  const base_url = `${config.REACT_APP_BACKEND_URL}/api/`;
  const headers = {};
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }
  return axios({
    url: base_url + url,
    headers,
    data: data,
    method,
  }).catch((err) => {
    ExceptionHandler(err);
  });
}
