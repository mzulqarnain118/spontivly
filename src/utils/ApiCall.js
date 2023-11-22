import axios from "axios";
import config from "../config";
import ExceptionHandler from "./ExceptionHandler";
import { getLocal } from "./index";

export default function ApiCall(
  url,
  setLoading = null,
  method = "GET",
  data = null
) {
  const api_url =
    method === "GET" ? (url.includes("?") ? url : `${url}/`) : url;
  const token = getLocal("token");
  const base_url = config.REACT_APP_BACKEND_URL;
  const headers = {};

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const performApiCall = async () => {
    try {
      if (setLoading) {
        setLoading(true);
      }

      const response = await axios({
        url: base_url + api_url,
        headers,
        data: data,
        method,
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        // Handle other status codes if needed
        // For example, throw an error, log a message, etc.
        // throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      ExceptionHandler(err);
      // You might want to re-throw the error if you want the caller to handle it
      // throw err;
    } finally {
      if (setLoading) {
        setLoading(false);
      }
    }
  };

  return performApiCall();
}
