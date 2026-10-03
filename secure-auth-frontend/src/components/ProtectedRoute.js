import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  // Previous debug logs are kept disabled because one printed the access token:
  // console.log("ProtectedRoute token:", token);
  // console.log("Current path:", window.location.pathname);

  return token ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
