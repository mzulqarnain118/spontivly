import ApiCall from "../../utils/ApiCall";
export const uploadProfile = async (payload) => {
  const response = await ApiCall("upload", "POST", payload);
  return { response: response.data };
};
