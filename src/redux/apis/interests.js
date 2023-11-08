import ApiCall from "../../utils/ApiCall";
export const fetchInterests = async (page) => {
  let api_url = page ? `interests/?page=${page}` : "interests";
  const response = await ApiCall(api_url, "GET");
  const filteredResponse=page?{response: response.data,page:true}:{response: response.data}
  return filteredResponse;
};
