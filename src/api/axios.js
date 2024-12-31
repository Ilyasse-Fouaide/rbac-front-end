import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_URL || 'http://192.168.112.128:8000/api/v1';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.Accept = 'application/json';
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;

    // Handle Unauthorized access
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
    }

    // Handle invalid or expired token
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

      try {
        // Make a request to your auth server to refresh the token.
        const { data } = await axios.post(`${baseURL}/auth/token`, undefined, {
          withCredentials: true, // for reading refreshToken from cookies
        });
        const { accessToken: newAccessToken } = data;

        // Store the new access and refresh tokens.
        localStorage.setItem('accessToken', newAccessToken);

        // Update the authorization header with the new access token.
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('accessToken');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
