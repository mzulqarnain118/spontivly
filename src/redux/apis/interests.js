import ApiCall from "utils/ApiCall";
export const fetchInterests = async (page) => {
  let api_url = page ? `interests/?page=${page}` : "interests";
  const response = await ApiCall(api_url);
  const filteredResponse=page?{response: response,page:true}:{response: response}
  return filteredResponse;
};
