// import React from "react";
// import API from "../services/api";

// const SessionCard = ({ session, refresh }) => {
//   const handleLogout = async () => {
//     await API.post("/auth/logout-device", { sessionId: session._id });
//     refresh();
//   };

//   return (
//     <div style={{ border: "1px solid #ddd", padding: "20px", margin: "10px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//       <p><b>Device:</b> {session.device}</p>
//       <p><b>IP:</b> {session.ip}</p>
//       <p><b>Location:</b> {session.location}</p>
//       <button onClick={handleLogout} style={{ marginTop: "10px", padding: "8px", cursor: "pointer" }}>Logout Device</button>
//     </div>
//   );
// };

// export default SessionCard;

import React from "react";
import API from "../services/api";

const SessionCard = ({ session, refresh }) => {
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout-device", {
        sessionId: session._id,
      });

      refresh();
    } catch (err) {
      alert("Failed to logout device");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        margin: "10px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <p><b>Device:</b> {session.device}</p>
      <p><b>IP:</b> {session.ip}</p>
      <p><b>Country:</b> {session.location?.country}</p>
      <p><b>Region:</b> {session.location?.region}</p>

      <button onClick={handleLogout}>Logout Device</button>
    </div>
  );
};

export default SessionCard;