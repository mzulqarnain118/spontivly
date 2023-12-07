import ApiCall from "utils/ApiCall";
export const fetchSkills = async (page) => {
  let api_url = page ? `skills/?page=${page}` : "skills";
  const response = await ApiCall(api_url);
  const filteredResponse=page?{response: response,page:true}:{response: response}
  return filteredResponse;
};
