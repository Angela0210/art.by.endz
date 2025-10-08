/*import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
*/
// src/axios/axios.js
import axios from "axios";

// Create a base instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔒 Add an interceptor to include the JWT token automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // or sessionStorage.getItem("token")

        if (token) {
            // Add the Authorization header if token exists
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
