// Detect environment
const isDevelopment = process.env.NODE_ENV === "development";

// Choose correct API URL
const API_BASE_URL = isDevelopment
  ? process.env.REACT_APP_LOCAL_API
  : process.env.REACT_APP_PROD_API;

export default API_BASE_URL;
