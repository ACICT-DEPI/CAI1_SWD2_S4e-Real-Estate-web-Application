import axios from "axios";
const API_URL = "http://localhost:8000/api";
export const getDetails = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/residency/${id}`);
		if (response.status === 400 || response.status === 500) {
			throw response.data;
		}
		return response.data;
	} catch (error) {
		console.log(`Error Fetching Residency: ${error}`);
	}
};
export const deleteResidence = async (id) => {
	try {
		const response = await axios.delete(`${API_URL}/residency/${id}`);
		return response.data;
	} catch (error) {
		console.log(`Error Deleting residency: ${error}`);
	}
};

export const updateRecidency = async (id, residencyData) => {
	try {
		const response = await axios.put(
			`${API_URL}/residency/${id}`,
			residencyData
		);
		return response.data;
	} catch (error) {
		console.log(`Error Updating Residency: ${error}`);
	}
};

export const registerUser = async (userData) => {
	try {
		const response = await axios.post(`${API_URL}/users/register`, userData);
		return response.data;
	} catch (error) {
		throw error.response.data.message || "Failed to register user";
	}
};

export const bookVisit = async (email, residencyId, date) => {
    try {
        const response = await axios.post(
            `${API_URL}/users/bookVisit`,
            { email, residencyId, date } 
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to book visit";
    }
};


export const getAllBookings = async (email) => {
	try {
		const response = await axios.post(`${API_URL}/users/allBookings`, {
			email,
		});
		return response.data;
	} catch (error) {
		throw error.response.data.message || "Failed to retrieve bookings";
	}
};

export const cancelBooking = async (email, residencyId) => {
	try {
		const response = await axios.delete(
			`${API_URL}/users/removeBooking/${residencyId}`,
			{
				data: { email },
			}
		);
		return response.data;
	} catch (error) {
		throw error.response.data.message || "Failed to cancel booking";
	}
};

export const toggleFavorite = async (email, residencyId) => {
	try {
		const response = await axios.post(`${API_URL}/users/toFav/${residencyId}`, {
			email,
		});
		return response.data;
	} catch (error) {
		throw error.response.data.message || "Failed to update favorites";
	}
};

export const getAllFavorites = async (email) => {
	try {
		const response = await axios.post(`${API_URL}/users/allFav`, { email });
		return response.data;
	} catch (error) {
		throw error.response.data.message || "Failed to retrieve favorites";
	}
};

export const removeFavorite = async (email, residencyId) => {
	try {
		const response = await axios.delete(
			`${API_URL}/users/removeFav/${residencyId}`,
			{ data: { email } }
		);
		return response.data;
	} catch (error) {
		throw error.response.data.message || "Failed to remove favorite";
	}
};
