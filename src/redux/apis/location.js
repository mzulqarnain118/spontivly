import ApiCall from "../../utils/ApiCall";
export const fetchLocation = async (name) => {
  let api_url = `locations/?name=${name}`;
  const response = await ApiCall(api_url);
  return { response: response };
};
