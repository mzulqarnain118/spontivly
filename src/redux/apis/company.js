import ApiCall from "../../utils/ApiCall";
export const fetchCompanyStages = async () => {
  let api_url = 'company-stages';
  const response = await ApiCall(api_url);
  return { response: response };
};