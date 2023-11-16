import ApiCall from "../../utils/ApiCall";
export const saveProfile = async (payload) => {
  const response = await ApiCall("profile/", "POST", payload);
  return { response: response.data };
};
