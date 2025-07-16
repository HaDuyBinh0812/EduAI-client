import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.API_BASE_URL || "http://localhost:5000/api",
    withCredentials: true,
});

export default axiosInstance;
