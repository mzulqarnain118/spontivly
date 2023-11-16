import ApiCall from "../../utils/ApiCall";
export const saveProfile = async (payload) => {
  const response = await ApiCall("profile", "PATCH", payload);
  return { response: response.data };
};
