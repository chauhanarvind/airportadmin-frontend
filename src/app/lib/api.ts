import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "/api", // Netlify will redirect this to your Render backend
});

// Attach Authorization header from localStorage if token exists
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Optional: handle unauthorized globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/login") {
        window.localStorage.removeItem("token"); // clear token
        window.location.href = "/login"; // redirect
      }
    }
    return Promise.reject(error);
  }
);

export default api;
