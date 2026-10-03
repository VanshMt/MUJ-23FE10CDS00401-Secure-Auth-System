import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Activity,
  ListFilter,
  RefreshCw,
  Search,
  Zap,
} from "lucide-react";
import API from "../services/api";
import DashboardLayout from "../components/dashboard/DashboardLayout";

/* ===============================================================================
   ORIGINAL SECURITY LOGS COMPONENT IMPLEMENTATION (RETAINED FOR REFERENCE)
   ===============================================================================
   const SecurityLogs = () => {
     const [analysis, setAnalysis] = useState(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     const analyzeEvents = async () => {
       setLoading(true);
       setError("");
       try {
         const response = await API.post("/api/security/analyze");
         setAnalysis(response.data.analysis);
       } catch (requestError) {
         setError(requestError.response?.data?.msg || requestError.response?.data?.message || "Unable to analyze security events.");
       } finally {
         setLoading(false);
       }
     };

     return (
       <main className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
         <section className="mx-auto max-w-4xl">
           <h1 className="mb-2 text-3xl font-bold text-cyan-400">Security Logs</h1>
           <p className="mb-6 text-slate-400">Review security events and request an AI analysis of recent activity.</p>
           <button onClick={analyzeEvents} disabled={loading} className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 disabled:cursor-wait disabled:opacity-60">
             {loading ? "Analyzing…" : "Analyze Security Events"}
           </button>
           {error && <p role="alert" className="mt-5 rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-red-300">{error}</p>}
           {analysis && (
             <article className="mt-6 space-y-5 rounded-2xl border border-cyan-500/20 bg-slate-900 p-6">
               <header className="flex flex-wrap items-center justify-between gap-3">
                 <h2 className="text-xl font-semibold">Threat Analysis</h2>
                 <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-sm text-cyan-300">{analysis.severity}</span>
               </header>
               <div><h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Threat Type</h3><p className="mt-1">{analysis.threatType}</p></div>
               <div><h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Summary</h3><p className="mt-1">{analysis.summary}</p></div>
               <div><h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Evidence</h3><ul className="mt-2 list-disc space-y-1 pl-5">{analysis.evidence.map((item, index) => <li key={`evidence-${index}`}>{item}</li>)}</ul></div>
               <div><h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Recommendations</h3><ul className="mt-2 list-disc space-y-1 pl-5">{analysis.recommendations.map((item, index) => <li key={`recommendation-${index}`}>{item}</li>)}</ul></div>
             </article>
           )}
         </section>
       </main>
     );
   };
   =============================================================================== */

const SecurityLogs = () => {
  const navigate = useNavigate();

  // Preserved state and business logic
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const analyzeEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await API.post("/api/security/analyze");
      setAnalysis(response.data.analysis);
    } catch (requestError) {
      setError(
        requestError.response?.data?.msg ||
          requestError.response?.data?.message ||
          "Unable to analyze security events."
      );
    } finally {
      setLoading(false);
    }
  };

  // Sample live telemetry logs stream for SOC dashboard context
  const sampleLogs = [
    {
      id: "LOG-9021",
      timestamp: "2026-10-04 00:35:12",
      event: "AUTH_BEARER_VALIDATE",
      ip: "192.168.1.104",
      user: "Vansh",
      status: "SUCCESS",
      severity: "LOW",
    },
    {
      id: "LOG-9020",
      timestamp: "2026-10-04 00:22:40",
      event: "SESSION_POLLED_HEALTHCHECK",
      ip: "192.168.1.104",
      user: "Vansh",
      status: "SUCCESS",
      severity: "LOW",
    },
    {
      id: "LOG-9019",
      timestamp: "2026-10-03 23:55:01",
      event: "DEVICE_REGISTERED_US_EAST",
      ip: "10.0.4.12",
      user: "Vansh",
      status: "SUCCESS",
      severity: "LOW",
    },
  ];

  return (
    <DashboardLayout onLogout={handleLogout}>
      {/* Top Banner & Telemetry Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                SENTINEL_SHIELD_SOC // SECURITY_LOGS
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                AI ENGINE: ONLINE
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl md:text-4xl text-white font-bold tracking-tight">
              Security Logs & Threat Intelligence
            </h1>
            <p className="max-w-2xl text-slate-400 text-sm mt-2 font-body-sm">
              Review real-time security telemetry events and execute automated AI threat diagnosis on recent system activity.
            </p>
          </div>

          {/* AI Analysis Trigger Button */}
          <button
            onClick={analyzeEvents}
            disabled={loading}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-label-caps text-xs uppercase tracking-[0.15em] hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center gap-2.5 disabled:opacity-60 cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 text-slate-950 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Analyzing Events..." : "Analyze Security Events"}
          </button>
        </div>
      </div>

      {/* Error Alert Display */}
      {error && (
        <div role="alert" className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 font-body-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* AI Threat Analysis Results Section */}
      {analysis && (
        <article className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/30 bg-slate-950/90 mb-8 relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full"></div>

          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-headline-lg">AI Threat Diagnosis Report</h2>
                <span className="font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">Automated SOC Telemetry Scan</span>
              </div>
            </div>

            <span className="px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 font-label-caps text-xs uppercase tracking-widest font-bold self-start sm:self-auto">
              SEVERITY: {analysis.severity}
            </span>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
            {/* Threat Type */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
              <h3 className="text-xs font-label-caps uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Threat Classification
              </h3>
              <p className="text-lg font-bold text-white font-headline-lg">{analysis.threatType}</p>
            </div>

            {/* Summary */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
              <h3 className="text-xs font-label-caps uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Analysis Summary
              </h3>
              <p className="text-sm text-slate-200 font-body-sm leading-relaxed">{analysis.summary}</p>
            </div>
          </div>

          {/* Evidence List */}
          {analysis.evidence && analysis.evidence.length > 0 && (
            <div className="mb-6 p-5 rounded-2xl bg-slate-900/80 border border-white/10 relative z-10">
              <h3 className="text-xs font-label-caps uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Detected Evidence
              </h3>
              <ul className="space-y-2">
                {analysis.evidence.map((item, index) => (
                  <li key={`evidence-${index}`} className="text-sm text-slate-300 font-data-mono flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations List */}
          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 relative z-10">
              <h3 className="text-xs font-label-caps uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Mitigation Recommendations
              </h3>
              <ul className="space-y-2">
                {analysis.recommendations.map((item, index) => (
                  <li key={`recommendation-${index}`} className="text-sm text-slate-200 font-body-sm flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      )}

      {/* Event Logs Stream Table Card */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 bg-slate-950/80 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ListFilter className="w-5 h-5 text-cyan-400" />
              Live Security Telemetry Feed
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] uppercase font-label-caps font-bold">
              REAL-TIME
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filter logs..."
                className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-data-mono"
              />
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 font-label-caps text-[11px] text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Event Code</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-data-mono">
              {sampleLogs.map((log) => (
                <tr key={log.id} className="hover:bg-cyan-500/5 transition-colors">
                  <td className="py-3.5 px-4 text-cyan-400 font-bold">{log.id}</td>
                  <td className="py-3.5 px-4 text-slate-400">{log.timestamp}</td>
                  <td className="py-3.5 px-4 text-white font-bold">{log.event}</td>
                  <td className="py-3.5 px-4 text-slate-300">{log.ip}</td>
                  <td className="py-3.5 px-4 text-slate-300">{log.user}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terminal Footer Telemetry Line */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-data-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>SENTINEL_TELEMETRY // AI_ENGINE: SENTINEL_V2.4 // LOG_AUDIT: ACTIVE</span>
        </div>
        <div className="text-cyan-400/80 font-bold">
          BUFFER: 100% | AGENT: ACTIVE
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecurityLogs;
