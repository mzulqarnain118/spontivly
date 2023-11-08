import ApiCall from "../../utils/ApiCall";
export const fetchObjectives = async (page) => {
  let api_url = page ? `objectives/?page=${page}` : "objectives";
  const response = await ApiCall(api_url, "GET");
  const filteredResponse=page?{response: response.data,page:true}:{response: response.data}
  return filteredResponse;
};
