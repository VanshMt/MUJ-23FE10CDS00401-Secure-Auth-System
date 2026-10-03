// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import useSessionPolling from "./hooks/useSessionPolling";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/profile";
import SecurityCenter from "./pages/SecurityCenter";
import SecurityLogs from "./pages/SecurityLogs";
import Settings from "./pages/Settings";
import Sessions from "./pages/Sessions";


function App() {
  // Enable automatic revoked-session detection via polling
  useSessionPolling(15);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Dashboard is a protected route requiring authentication */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path="/security-center" element={<ProtectedRoute><SecurityCenter /></ProtectedRoute>}/>
        <Route path="/security-logs" element={<ProtectedRoute><SecurityLogs /></ProtectedRoute>}/>
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}/>
        <Route path="/sessions" element={<ProtectedRoute><Sessions /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;