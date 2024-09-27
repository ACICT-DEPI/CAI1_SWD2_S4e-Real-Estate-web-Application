import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  

export const getAllProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}/Residencies`);
    return response.data;
  } catch (error) {
    console.log(`Error Fetching Properties: ${error}`);
    
  }
};