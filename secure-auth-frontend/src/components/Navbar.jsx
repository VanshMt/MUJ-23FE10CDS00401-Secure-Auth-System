// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", padding: "15px", background: "#1f2937", color: "#fff" }}>
//       <h3>SecureAuth Dashboard</h3>
//       <button onClick={logout} style={{ padding: "8px 12px", cursor: "pointer" }}>Logout</button>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#111",
        color: "#fff",
      }}
    >
      <h3>SecureAuth Dashboard</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;