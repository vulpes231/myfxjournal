import axios from "axios";
import { devServer, getAccessToken } from "../constants";

const api = axios.create({
	baseURL: devServer,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add token automatically
api.interceptors.request.use((config) => {
	const token = getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Handle expired session globally
api.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = error.response?.data?.message;

		if (message === "Your session has expired. Please log in again.") {
			// localStorage.removeItem("token")
			sessionStorage.clear();
			window.location.href = "/";
		}

		return Promise.reject(error);
	}
);

export default api;
