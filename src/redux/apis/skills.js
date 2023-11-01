import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL
export const fetchSkills = async (page) =>{ 
    if(page == undefined){

       const response = await axios.get(url + '/api/skills');
      return ({ response: response.data });
    }
    else{

        const response_1 = await axios.get(url + '/api/skills/?page=' + page);
      return ({ response: response_1.data, page: true });
    }
}