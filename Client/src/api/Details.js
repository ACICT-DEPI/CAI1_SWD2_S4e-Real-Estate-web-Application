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

export const bookVisit = async (email, residencyId, date) => {
  try {
    const response = await axios.post(`${API_URL}/user/bookVisit/${residencyId}`, {
      email,
      date
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to book visit';
  }
};


export const getAllBookings = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/user/allBookings`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to retrieve bookings';
  }
};


export const cancelBooking = async (email, residencyId) => {
  try {
    const response = await axios.delete(`${API_URL}/user/removeBooking/${residencyId}`, {
      data: { email }
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to cancel booking';
  }
};


export const toggleFavorite = async (residencyId) => {
  const defaultUserId = "66f32460faedd846d654a99e"; 

  try {
    const response = await axios.post(`${API_URL}/user/toFav/${residencyId}`, { email: "marwaharonnn@gmail.com" });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to update favorites';
  }
};


export const getAllFavorites = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/user/allFav`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to retrieve favorites';
  }
};
