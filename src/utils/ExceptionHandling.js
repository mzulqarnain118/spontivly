import Toast from "../components/common/Toast/Toast";
export default function getError(error) {
  if (error.response) {
    let status = error?.response?.data?.code;
    if (status === 401) {
      Toast("Your session has expired", "success");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      window.location = "/login";
    } else if (status === 403)
      Toast("This Role is restricted to access to this request.", "error");
    else if (status === 500) Toast("Internal Server Error", "error");
    else if (status === 422) Toast("Cannot Process Please Try Again", "error");
    else if (status === 405) Toast("Not Found", "error");
    else if (status === 406) Toast("Already Exist", "error");
    else if (status === 404) Toast("API Not Found", "error");
    else if (status === 444) Toast("Invalid Data", "error");
    else if (status === 430) Toast(error.response.data, "error");
    else Toast("Unkown Error", "error");
  } else Toast("No Internet Connection", "error");
}
