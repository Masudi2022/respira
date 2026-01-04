import axios from "axios";

// ==============================
// ENVIRONMENT (VITE)
// ==============================
const isDevelopment = import.meta.env.DEV;

// ==============================
// API BASE URL
// ==============================
const API_BASE_URL = isDevelopment
  ? import.meta.env.VITE_LOCAL_API || "http://127.0.0.1:8000"
  : import.meta.env.VITE_PROD_API;

// ==============================
// AXIOS INSTANCE
// ==============================
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // ⚠️ withCredentials NOT required for JWT
  // keep false to avoid CORS confusion
  withCredentials: false,
});

// ==============================
// 🔐 REQUEST INTERCEPTOR (JWT)
// ==============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==============================
// 🚫 RESPONSE INTERCEPTOR (401)
// ==============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid / expired
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
