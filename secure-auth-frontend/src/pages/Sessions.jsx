import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Key,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Monitor,
  RefreshCw,
  Terminal,
  AlertOctagon,
  CheckCircle2,
  X,
} from "lucide-react";
import API from "../services/api";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import SessionCard from "../components/dashboard/SessionCard";

/* ===============================================================================
   ORIGINAL SESSIONS COMPONENT IMPLEMENTATION (RETAINED FOR REFERENCE)
   ===============================================================================
   const Sessions = () => {
     const [sessions, setSessions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");

     useEffect(() => {
       const fetchSessions = async () => {
         try {
           setLoading(true);
           const res = await API.get("/auth/sessions");
           setSessions(res.data.sessions || []);
         } catch (err) {
           setError("Failed to load active sessions.");
         } finally {
           setLoading(false);
         }
       };
       fetchSessions();
     }, []);

     const handleRevoke = async (sessionId) => {
       try {
         await API.post("/auth/logout-device", { sessionId });
         setSessions((prev) => prev.filter((s) => (s._id || s.id) !== sessionId));
       } catch (err) {
         setError("Failed to revoke session.");
       }
     };

     const handleRevokeAll = async () => {
       try {
         await API.post("/auth/logout-all");
         localStorage.removeItem("token");
         window.location.href = "/login";
       } catch (err) {
         setError("Failed to revoke all sessions.");
       }
     };

     return (
       <div className="p-8">
         <h1 className="text-3xl font-bold mb-4">Active Sessions</h1>
         {error && <p className="text-red-500 mb-4">{error}</p>}
         <button onClick={handleRevokeAll} className="mb-6 px-4 py-2 bg-red-600 text-white rounded">
           Revoke All Sessions
         </button>
         {loading ? (
           <p>Loading...</p>
         ) : (
           <ul>
             {sessions.map((s) => (
               <li key={s._id || s.id} className="mb-2 p-4 border rounded">
                 {s.device || s.browser} - {s.ip}
                 <button onClick={() => handleRevoke(s._id || s.id)} className="ml-4 text-red-500">
                   Revoke
                 </button>
               </li>
             ))}
           </ul>
         )}
       </div>
     );
   };
   =============================================================================== */

const Sessions = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/auth/sessions");

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
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      console.error("Failed to fetch active sessions:", err);
      setError("Unable to load active sessions from authorization server.");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRevoke = async (sessionId) => {
    try {
      await API.post("/auth/logout-device", { sessionId });
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
      setNotification("Session revoked successfully.");
      setTimeout(() => setNotification(""), 4000);
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
      {/* Top Banner & Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                SENTINEL_SHIELD_SOC // SESSION_MANAGER
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                ACTIVE: {sessions.length} NODES
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl md:text-4xl text-white font-bold tracking-tight">
              Active Access Sessions
            </h1>
            <p className="max-w-2xl text-slate-400 text-sm mt-2 font-body-sm">
              Manage authorized bearer sessions, inspect device telemetry, and invalidate remote tokens across Sentinel Shield nodes.
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchSessions}
              disabled={loading}
              className="p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all cursor-pointer"
              title="Refresh session list"
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleRevokeAll}
              className="px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 hover:border-red-400 font-bold font-label-caps text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-2 cursor-pointer"
            >
              <AlertOctagon className="w-4 h-4 text-red-400" />
              Revoke All Devices
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="mb-6 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-body-sm flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification("")} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div role="alert" className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 font-body-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError("")} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Overview Stat Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 bg-slate-900/50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Active Sessions</span>
            <Key className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-headline-lg">{sessions.length}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 bg-slate-900/50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Primary Node</span>
            <Monitor className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-lg font-bold text-cyan-300 font-data-mono truncate">
            {sessions.find((s) => s.current)?.browser || "Current Device"}
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 bg-slate-900/50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Token State</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-lg font-bold text-emerald-400 font-label-caps">ENCRYPTED JWT</p>
        </div>
      </div>

      {/* Active Sessions List Container */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Authenticated Device Inventory
          </h2>
          <span className="text-xs font-label-caps text-slate-400 uppercase tracking-wider">
            Showing {sessions.length} sessions
          </span>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-slate-900/50 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center text-slate-400 font-body-sm">
              No active sessions detected. Authenticate from a device to register new sessions.
            </div>
          ) : (
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} onRevoke={handleRevoke} />
            ))
          )}
        </div>
      </section>

      {/* Terminal Telemetry Footer Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-data-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>SENTINEL_SESSIONS // POLLING: 15s // REVOCATION_KEY: AES-256</span>
        </div>
        <div className="text-cyan-400/80 font-bold">
          STATE: SECURE | REFRESH: SYNCED
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
