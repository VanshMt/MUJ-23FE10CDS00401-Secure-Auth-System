import axios from "axios";

const configuredApiUrl = process.env.REACT_APP_API_URL;
const hostnameApiUrl = `http://${window.location.hostname || "localhost"}:3000`;

const API = axios.create({
  // Previous implementation, retained for reference:
  // baseURL: process.env.REACT_APP_API_URL,
  // Previous behavior required REACT_APP_API_URL to be set, often to a changing LAN IP.
  // Prefer the explicit configuration and use the current host as a local-dev fallback.
  baseURL: configuredApiUrl || hostnameApiUrl,
  withCredentials: true, // For sending cookies (refresh token)
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔐 Handle 401 responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Previous debug output included the bearer token; kept disabled to avoid exposing it:
    // console.log("API Error Status:", error.response?.status);
    // console.log("API URL:", error.config?.url);
    // console.log("Token Before Removal:", localStorage.getItem("token"));
    // console.log("Interceptor hit");
    // console.log("Interceptor status:", error.response?.status);
    // console.log("Response status:", error.response?.status);
    if (error.response?.status === 401) {
      // Clear auth token
      localStorage.removeItem("token");
      // Redirect to login
      // Commented redirect temporarily during debug to avoid redirect loops while investigating public route access.
      // If this causes redirect issues on public pages, we can re-enable after confirming only protected routes call this.
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default API;
