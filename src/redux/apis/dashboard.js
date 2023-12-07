import ApiCall from "utils/ApiCall";
export const fetchCurrentUser = async (page) => {
  const response = await ApiCall("profile/?me=true");
  return response.results;
};
