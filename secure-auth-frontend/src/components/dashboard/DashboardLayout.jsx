import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#0b1326] text-on-surface relative overflow-hidden font-body-md">
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[360px] h-[360px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[360px] h-[360px] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <Sidebar />
      <Topbar onLogout={onLogout} />

      <main className="pt-24 md:ml-64 px-6 md:px-10 pb-10 relative z-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
