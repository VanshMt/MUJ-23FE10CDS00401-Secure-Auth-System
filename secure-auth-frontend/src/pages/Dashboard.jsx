import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Terminal,
  RefreshCw,
  X,
} from "lucide-react";
import API from "../services/api";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatsCard from "../components/dashboard/StatsCard";
import SessionCard from "../components/dashboard/SessionCard";

/* ===============================================================================
   ORIGINAL DASHBOARD COMPONENT IMPLEMENTATION (RETAINED FOR REFERENCE)
   ===============================================================================
   const Dashboard = () => {
     const navigate = useNavigate();

     const [sessions, setSessions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     const [dashboardData, setDashboardData] = useState({
       activeSessions: 0,
       failedAttempts: 0,
       lastLoginAt: null,
       accountStatus: "Secure",
     });

     useEffect(() => {
       const fetchSessions = async () => {
         try {
           setLoading(true);
           setError("");
           
           const [sessionsRes, dashboardRes] = await Promise.all([
             API.get("/auth/sessions"),
             API.get("/auth/dashboard"),
           ]);
           const res = sessionsRes;

           setDashboardData({
             activeSessions: dashboardRes.data.activeSessions || 0,
             failedAttempts: dashboardRes.data.failedAttempts || 0,
             lastLoginAt: dashboardRes.data.lastLoginAt || null,
             accountStatus: dashboardRes.data.accountStatus || "Secure",
           });
           
           const formattedSessions = (res.data.sessions || []).map((session) => ({
             id: session._id || session.id,
             device: session.device || "Unknown Device",
             browser: session.browser || "Unknown",
             os: session.os || "Unknown",
             ip: session.ip || "N/A",
             location: session.location ? `${session.location.region || ""}, ${session.location.country || ""}`.trim() || "Unknown Location" : "Unknown Location",
             lastActive: session.lastActive || "Never",
             current: session.current || false,
             failedAttempts: session.failedAttempts || 0,
           }));
           
           setSessions(formattedSessions);
         } catch (err) {
           console.log("Dashboard fetch error:", err.response?.status);
           if (err.response?.status === 401) {
             localStorage.removeItem("token");
             navigate("/login");
             return;
           }
           console.error("Failed to fetch sessions:", err);
           setError("Unable to load sessions. Please try again.");
           setSessions([]);
         } finally {
           setLoading(false);
         }
       };

       fetchSessions();
     }, [navigate]);

     const activeSessions = dashboardData.activeSessions;
     const failedLogins = dashboardData.failedAttempts;
     const accountStatus = dashboardData.accountStatus || "Secure";
     const lastLoginAt = dashboardData.lastLoginAt || null;

     const stats = useMemo(
       () => [
         {
           icon: "Users",
           label: "Active Sessions",
           value: activeSessions,
           delta: "+2%",
           progressClass: "bg-cyan-500",
           progressWidth: `${Math.min(activeSessions * 20, 100)}%`,
         },
         {
           icon: "AlertTriangle",
           label: "Failed Login Attempts",
           value: failedLogins.toString().padStart(2, "0"),
           delta: failedLogins > 0 ? "-15%" : "+0%",
           progressClass: "bg-red-500",
           progressWidth: `${Math.min(failedLogins * 20, 100)}%`,
         },
         {
           icon: "Clock",
           label: "Last Login",
           value: lastLoginAt
             ? new Date(lastLoginAt).toLocaleString()
             : "Never",
           delta: "LIVE",
           progressClass: "bg-slate-500",
           progressWidth: "75%",
         },
         {
           icon: "Shield",
           label: "Account Status",
           value: accountStatus,
           delta: "ACTIVE",
           progressClass: "bg-cyan-500",
           progressWidth: "100%",
         },
       ],
       [activeSessions, failedLogins, accountStatus, lastLoginAt]
     );

     const handleLogout = async () => {
       try {
         await API.post("/auth/logout");
       } catch (err) {
         console.error("Logout error:", err);
       }
       localStorage.removeItem("token");
       navigate("/login");
     };

     const handleRevoke = async (sessionId) => {
       try {
         await API.post("/auth/logout-device", { sessionId });
         setSessions((prev) => prev.filter((session) => session.id !== sessionId));
       } catch (err) {
         if (err.response?.status === 401) {
           localStorage.removeItem("token");
           navigate("/login");
           return;
         }
         console.error("Failed to revoke session:", err);
         setError("Failed to revoke session. Please try again.");
       }
     };

     const handleRevokeAll = async () => {
       try {
         await API.post("/auth/logout-all");
         localStorage.removeItem("token");
         navigate("/login");
       } catch (err) {
         if (err.response?.status === 401) {
           localStorage.removeItem("token");
           navigate("/login");
           return;
         }
         console.error("Failed to revoke all sessions:", err);
         setError("Failed to revoke all sessions. Please try again.");
       }
     };

     return (
       <DashboardLayout onLogout={handleLogout}>
         <div className="mb-10">
           <h1 className="font-headline-xl text-4xl text-white">Security Pulse</h1>
           <p className="max-w-2xl text-slate-400 mt-3">
             Real-time threat monitoring and active session control for the SENTINEL_SHIELD architecture.
             All metrics remain within operational parameters.
           </p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {stats.map((item) => (
             <StatsCard key={item.label} {...item} />
           ))}
         </div>

         <section className="mb-10">
           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
             <div className="flex items-center gap-3">
               <h2 className="text-2xl font-semibold text-white">Current Active Sessions</h2>
               <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] uppercase tracking-[0.2em] font-label-caps">
                 Live Feed
               </span>
             </div>
             <button
               onClick={handleRevokeAll}
               className="inline-flex items-center gap-2 text-slate-400 font-label-caps text-xs uppercase tracking-[0.2em] hover:text-white transition-colors"
             >
               REVOKE ALL
               <X className="w-4 h-4" />
             </button>
           </div>

           {error && (
             <div className="glass-panel p-4 rounded-3xl border border-red-500/30 bg-red-500/10 text-red-300 mb-4">
               {error}
             </div>
           )}

           <div className="space-y-4">
             {loading ? (
               <div className="glass-panel p-8 rounded-3xl border border-white/10">
                 <div className="space-y-4">
                   {[1, 2, 3].map((i) => (
                     <div key={i} className="h-24 bg-slate-900/50 rounded-2xl animate-pulse"></div>
                   ))}
                 </div>
               </div>
             ) : sessions.length === 0 ? (
               <div className="glass-panel p-8 rounded-3xl border border-white/10 text-slate-400">
                 No active sessions available. Monitor will refresh when a new session connects.
               </div>
             ) : (
               sessions.map((session) => (
                 <SessionCard key={session.id} session={session} onRevoke={handleRevoke} />
               ))
             )}
           </div>
         </section>
       </DashboardLayout>
     );
   };
   =============================================================================== */

const Dashboard = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dashboardData, setDashboardData] = useState({
    activeSessions: 0,
    failedAttempts: 0,
    lastLoginAt: null,
    accountStatus: "Secure",
  });

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError("");

      const [sessionsRes, dashboardRes] = await Promise.all([
        API.get("/auth/sessions"),
        API.get("/auth/dashboard"),
      ]);
      const res = sessionsRes;

      setDashboardData({
        activeSessions: dashboardRes.data.activeSessions || 0,
        failedAttempts: dashboardRes.data.failedAttempts || 0,
        lastLoginAt: dashboardRes.data.lastLoginAt || null,
        accountStatus: dashboardRes.data.accountStatus || "Secure",
      });

      const formattedSessions = (res.data.sessions || []).map((session) => ({
        id: session._id || session.id,
        device: session.device || "Unknown Device",
        browser: session.browser || "Unknown",
        os: session.os || "Unknown",
        ip: session.ip || "N/A",
        location: session.location
          ? `${session.location.region || ""}, ${session.location.country || ""}`.trim() ||
            "Unknown Location"
          : "Unknown Location",
        lastActive: session.lastActive
          ? (!isNaN(new Date(session.lastActive).getTime()) ? new Date(session.lastActive).toLocaleString() : session.lastActive)
          : (session.createdAt && !isNaN(new Date(session.createdAt).getTime()) ? new Date(session.createdAt).toLocaleString() : "Never"),
        createdAt: session.createdAt,
        current: session.current || false,
        failedAttempts: session.failedAttempts || 0,
      }));

      setSessions(formattedSessions);
    } catch (err) {
      console.log("Dashboard fetch error:", err.response?.status);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      console.error("Failed to fetch sessions:", err);
      setError("Unable to load sessions. Please try again.");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const activeSessions = dashboardData.activeSessions;
  const failedLogins = dashboardData.failedAttempts;
  const accountStatus = dashboardData.accountStatus || "Secure";
  const lastLoginAt = dashboardData.lastLoginAt || null;

  const stats = useMemo(
    () => [
      {
        icon: "Users",
        label: "Active Sessions",
        value: activeSessions,
        delta: "+2%",
        progressClass: "bg-cyan-500",
        progressWidth: `${Math.min(activeSessions * 20, 100)}%`,
      },
      {
        icon: "AlertTriangle",
        label: "Failed Login Attempts",
        value: failedLogins.toString().padStart(2, "0"),
        delta: failedLogins > 0 ? "-15%" : "+0%",
        progressClass: "bg-red-500",
        progressWidth: `${Math.min(failedLogins * 20, 100)}%`,
      },
      {
        icon: "Clock",
        label: "Last Login",
        value: lastLoginAt
          ? new Date(lastLoginAt).toLocaleString()
          : "Never",
        delta: "LIVE",
        progressClass: "bg-slate-500",
        progressWidth: "75%",
      },
      {
        icon: "Shield",
        label: "Account Status",
        value: accountStatus,
        delta: "ACTIVE",
        progressClass: "bg-cyan-500",
        progressWidth: "100%",
      },
    ],
    [activeSessions, failedLogins, accountStatus, lastLoginAt]
  );

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRevoke = async (sessionId) => {
    try {
      await API.post("/auth/logout-device", { sessionId });
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      console.error("Failed to revoke session:", err);
      setError("Failed to revoke session. Please try again.");
    }
  };

  const handleRevokeAll = async () => {
    try {
      await API.post("/auth/logout-all");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      console.error("Failed to revoke all sessions:", err);
      setError("Failed to revoke all sessions. Please try again.");
    }
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      {/* Top Banner & SOC Operational Telemetry Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                SENTINEL_SHIELD_SOC // OVERVIEW
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                SYSTEM ARMED
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl md:text-4xl text-white font-bold tracking-tight">
              Security Pulse Command
            </h1>
            <p className="max-w-2xl text-slate-400 text-sm mt-2 font-body-sm">
              Real-time threat monitoring and active session control for the SENTINEL_SHIELD architecture.
              All metrics remain within operational parameters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchSessions}
              disabled={loading}
              className="p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all cursor-pointer"
              title="Refresh security pulse"
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Primary SOC Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((item) => (
          <StatsCard key={item.label} {...item} />
        ))}
      </div>

      {/* Active Sessions Live Feed Section */}
      <section className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-white tracking-wide">Current Active Sessions</h2>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] uppercase tracking-[0.2em] font-label-caps font-bold">
              Live Feed
            </span>
          </div>
          <button
            onClick={handleRevokeAll}
            className="inline-flex items-center gap-2 text-slate-400 font-label-caps text-xs uppercase tracking-[0.2em] hover:text-red-400 transition-colors cursor-pointer"
          >
            REVOKE ALL
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="glass-panel p-4 rounded-3xl border border-red-500/30 bg-red-500/10 text-red-300 mb-4 font-body-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="glass-panel p-8 rounded-3xl border border-white/10">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-slate-900/50 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-slate-400 font-body-sm">
              No active sessions available. Monitor will refresh when a new session connects.
            </div>
          ) : (
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} onRevoke={handleRevoke} />
            ))
          )}
        </div>
      </section>

      {/* Terminal Footer Telemetry Line */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-data-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>SENTINEL_PULSE // NODE: US-EAST-01 // TELEMETRY: REAL-TIME SYNC</span>
        </div>
        <div className="text-cyan-400/80 font-bold">
          THREAT_LEVEL: NOMINAL | FREQ: 15s
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
