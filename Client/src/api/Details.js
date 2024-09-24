import axios from "axios";
const API_URL = 'http://localhost:8000/api';
export const getDetails= async (id)=>{
    try{
        const response= await axios.get(`${API_URL}/residency/${id}`);
        if (response.status === 400 || response.status === 500) {
            throw response.data;
          }
        return response.data;
    }
    catch(error){
console.log(`Error Fetching Residency: ${error}`);
    }

}
export const deleteResidence = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/residency/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Error Deleting residency: ${error}`);
    }
  };