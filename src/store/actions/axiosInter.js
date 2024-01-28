import axios from 'axios';

// Create an axios instance with a predefined base URL
const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

// Axios request interceptor to modify the request configuration before sending
axiosInstance.interceptors.request.use(function (config) {
    // Add the MovieDB API key to the request parameters
    config.params = {
        api_key: '8905e08e3a3707818f8ff36e0dc4df18',
        ...config.params,
    };

    return config;
}, function (error) {
    return Promise.reject(error);
});
export default axiosInstance;