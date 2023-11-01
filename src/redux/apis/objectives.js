import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL
export const fetchObjectives = async (page) =>{ 
    if(page == undefined){

       const response = await axios.get(url + '/api/objectives');
      return ({ response: response.data });
    }
    else{

        const response_1 = await axios.get(url + '/api/objectives/?page=' + page);
      return ({ response: response_1.data, page: true });
    }
}