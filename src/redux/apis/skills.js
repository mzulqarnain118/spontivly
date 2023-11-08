import ApiCall from "../../utils/ApiCall";
export const fetchSkills = async (page) => {
  let api_url = page ? `skills/?page=${page}` : "skills";
  const response = await ApiCall(api_url, "GET");
  const filteredResponse=page?{response: response.data,page:true}:{response: response.data}
  return filteredResponse;
};
