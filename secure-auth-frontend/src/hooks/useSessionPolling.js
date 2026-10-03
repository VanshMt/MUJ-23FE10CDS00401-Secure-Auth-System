import { useEffect } from "react";
import API from "../services/api";

/**
 * Hook for automatic revoked-session detection via polling.
 * Polls the authenticated /auth/sessions endpoint every 15 seconds.
 * If the token is revoked/blacklisted, the API interceptor will handle the 401 response.
 * 
 * @param {number} intervalSeconds - Polling interval in seconds (default: 15)
 */
const useSessionPolling = (intervalSeconds = 5) => {
  useEffect(() => {
    // Only poll if user has a token
    // const token = localStorage.getItem("token");
    // if (!token) return;

    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Polling skipped: no token present");
        return;
      }

      console.log("Polling request running");
      console.log("Polling session check...");
      try {
        await API.get("/auth/sessions");
      } catch (error) {
        // 401 errors are handled by API interceptor (clears token & redirects to /login)
        // Other errors are logged but won't break the app
        console.log("Polling error status:", error.response?.status);
        console.log("Polling error:", error.response?.status);
        console.debug("Session validation check failed:", error.response?.status);
      }
    };

    // Check immediately and then at interval
    checkSession();

    const interval = setInterval(checkSession, intervalSeconds * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [intervalSeconds]);
};

export default useSessionPolling;
