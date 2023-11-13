import ApiCall from "../../utils/ApiCall";
export const uploadProfile = async (payload) => {
  const response = await ApiCall("upload", "POST", payload);

  console.log("🚀 ~ file: uploadProfile.js:5 ~ uploadProfile ~ response:", response)

  return { response: response.data };
};
