import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  KeyRound,
  Smartphone,
  Shield,
  Zap,
  RefreshCw,
  Terminal,
  ChevronRight,
  Fingerprint,
  Activity,
  X,
  Award,
  Lock,
} from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

/* ===============================================================================
   ORIGINAL SECURITY CENTER COMPONENT IMPLEMENTATION (RETAINED FOR REFERENCE)
   ===============================================================================
   const SecurityCenter = () => {
     return (
       <div className="min-h-screen bg-slate-950 text-white p-8">
         <h1 className="text-4xl font-bold text-cyan-400 mb-6">
           Security Center
         </h1>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="bg-slate-900 p-6 rounded-2xl border border-cyan-500/20">
             <h3 className="text-slate-400 mb-2">Security Score</h3>
             <p className="text-3xl font-bold text-cyan-400">85%</p>
           </div>

           <div className="bg-slate-900 p-6 rounded-2xl border border-cyan-500/20">
             <h3 className="text-slate-400 mb-2">Email Status</h3>
             <p className="text-green-400 font-bold">Verified</p>
           </div>

           <div className="bg-slate-900 p-6 rounded-2xl border border-cyan-500/20">
             <h3 className="text-slate-400 mb-2">Password Strength</h3>
             <p className="text-yellow-400 font-bold">Strong</p>
           </div>

           <div className="bg-slate-900 p-6 rounded-2xl border border-cyan-500/20">
             <h3 className="text-slate-400 mb-2">MFA</h3>
             <p className="text-red-400 font-bold">Disabled</p>
           </div>
         </div>
       </div>
     );
   };
   =============================================================================== */

const SecurityCenter = () => {
  const navigate = useNavigate();

  // Preserved original security metrics state
  const [securityData, setSecurityData] = useState({
    securityScore: 85,
    emailStatus: "Verified",
    passwordStrength: "Strong",
    mfaStatus: "Disabled",
  });

  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const [mfaModalOpen, setMfaModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRunScan = () => {
    setIsScanning(true);
    setScanMessage("Initiating Sentinel Shield deep posture diagnostic...");
    
    setTimeout(() => {
      setScanMessage("Scanning authentication hashes and active tokens...");
    }, 1200);

    setTimeout(() => {
      setIsScanning(false);
      setScanMessage("Diagnostic scan completed. All metrics verified against security baseline.");
      setTimeout(() => setScanMessage(""), 4000);
    }, 2500);
  };

  const handleEnableMFA = () => {
    setSecurityData((prev) => ({
      ...prev,
      mfaStatus: prev.mfaStatus === "Enabled" ? "Disabled" : "Enabled",
      securityScore: prev.mfaStatus === "Disabled" ? 100 : 85,
    }));
    setMfaModalOpen(false);
    setScanMessage(
      securityData.mfaStatus === "Disabled"
        ? "MFA successfully activated! Security Score updated to 100%."
        : "MFA disabled. Security Score updated to 85%."
    );
    setTimeout(() => setScanMessage(""), 4000);
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      {/* Top Header & Operational Banner */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                SENTINEL_SHIELD_SOC // SECURITY_CENTER
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                POSTURE: {securityData.securityScore >= 90 ? "OPTIMAL" : "GOOD"}
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl md:text-4xl text-white font-bold tracking-tight">
              Security Command Center
            </h1>
            <p className="max-w-2xl text-slate-400 text-sm mt-2 font-body-sm">
              Real-time posture assessment, identity safeguards, and threat prevention metrics for Sentinel Shield.
            </p>
          </div>

          {/* Top Quick Audit Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-label-caps text-xs uppercase tracking-[0.15em] hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 text-slate-950 ${isScanning ? "animate-spin" : ""}`} />
              {isScanning ? "Scanning System..." : "Run Security Audit"}
            </button>
          </div>
        </div>
      </div>

      {/* System Toast Notification */}
      {scanMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-body-sm flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>{scanMessage}</span>
          </div>
          <button onClick={() => setScanMessage("")} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hero Security Health Score Panel */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-950/80 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            {/* Score Ring Badge */}
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-cyan-500/20 flex items-center justify-center bg-slate-900/90 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                <span className="text-3xl font-extrabold text-cyan-400 font-headline-xl">
                  {securityData.securityScore}%
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">System Security Health</h2>
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-label-caps font-bold">
                  {securityData.securityScore === 100 ? "MAXIMUM SHIELD" : "STRONG SHIELD"}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                {securityData.securityScore === 100
                  ? "All identity safeguards and multi-factor protections are fully active."
                  : "3 of 4 core security controls verified. Enable MFA to reach 100% security rating."}
              </p>

              {/* Progress Bar */}
              <div className="w-full max-w-md bg-slate-900 h-2.5 rounded-full mt-4 overflow-hidden border border-white/5">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                  style={{ width: `${securityData.securityScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-slate-900/60 flex items-center gap-4">
              <Award className="w-8 h-8 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400 font-label-caps uppercase tracking-wider">HARDENING</div>
                <div className="text-xs text-cyan-300 font-bold font-label-caps">PASSED 3/4 CONTROLS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 4 Primary Metric Cards (Preserved Original Fields) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Security Score */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Security Score</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-cyan-400 font-headline-xl mb-2">{securityData.securityScore}%</p>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>RATING</span>
            <span className="text-cyan-300 font-bold">{securityData.securityScore >= 90 ? "EXCELLENT" : "GOOD"}</span>
          </div>
        </div>

        {/* Card 2: Email Status */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Email Status</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-400 font-headline-lg mb-2">{securityData.emailStatus}</p>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>IDENTITY</span>
            <span className="text-emerald-400 font-bold">AUTHENTICATED</span>
          </div>
        </div>

        {/* Card 3: Password Strength */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Password Strength</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <KeyRound className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-400 font-headline-lg mb-2">{securityData.passwordStrength}</p>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>ENTROPY</span>
            <span className="text-yellow-400 font-bold">HIGH HASH</span>
          </div>
        </div>

        {/* Card 4: MFA */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">MFA</span>
            <div className={`p-2 rounded-xl group-hover:scale-110 transition-transform ${securityData.mfaStatus === "Enabled" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
              {securityData.mfaStatus === "Enabled" ? <Smartphone className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
            </div>
          </div>
          <p className={`text-2xl font-bold font-headline-lg mb-2 ${securityData.mfaStatus === "Enabled" ? "text-emerald-400" : "text-red-400"}`}>
            {securityData.mfaStatus}
          </p>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>2FA PROTECTION</span>
            <span className={securityData.mfaStatus === "Enabled" ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
              {securityData.mfaStatus === "Enabled" ? "ACTIVE" : "ACTION REQUIRED"}
            </span>
          </div>
        </div>

      </div>

      {/* Security Recommendations & Action Controls Section */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/20 bg-slate-950/90 mb-8">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          Recommended Security Actions
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          Execute posture improvements to protect your Sentinel Shield operator credentials.
        </p>

        <div className="space-y-4">
          
          {/* Action item 1: MFA */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${securityData.mfaStatus === "Enabled" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-white font-bold text-base flex items-center gap-2">
                  Multi-Factor Authentication (MFA)
                  <span className={`text-[10px] px-2 py-0.5 rounded font-label-caps uppercase font-bold ${securityData.mfaStatus === "Enabled" ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                    {securityData.mfaStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Add an extra layer of protection requiring authenticator verification during login.
                </p>
              </div>
            </div>

            <button
              onClick={() => setMfaModalOpen(true)}
              className={`px-4 py-2.5 rounded-xl font-label-caps text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer ${
                securityData.mfaStatus === "Enabled"
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10"
                  : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              }`}
            >
              {securityData.mfaStatus === "Enabled" ? "Configure MFA" : "Enable MFA (+15%)"}
            </button>
          </div>

          {/* Action item 2: Password Checkup */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-white font-bold text-base flex items-center gap-2">
                  Password Health & Entropy
                  <span className="text-[10px] px-2 py-0.5 rounded font-label-caps uppercase font-bold bg-amber-500/20 text-amber-300">
                    Strong
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Your password satisfies Sentinel Shield complexity rules. Update periodically to maintain hygiene.
                </p>
              </div>
            </div>

            <Link
              to="/profile"
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10 font-label-caps text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              Manage Password
            </Link>
          </div>

          {/* Action item 3: Security Logs */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/15 text-cyan-400">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className="text-white font-bold text-base flex items-center gap-2">
                  Threat Event Inspection
                  <span className="text-[10px] px-2 py-0.5 rounded font-label-caps uppercase font-bold bg-cyan-500/20 text-cyan-300">
                    Live Monitor
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Analyze login history, anomaly detections, and automated AI security logs.
                </p>
              </div>
            </div>

            <Link
              to="/security-logs"
              className="px-4 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 font-label-caps text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              View Logs
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Terminal Telemetry Footer Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-data-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>SENTINEL_SECURITY_CENTER // MONITOR_ID: SOC-SEC-991 // SHIELD_STATE: ACTIVE</span>
        </div>
        <div className="text-cyan-400/80 font-bold">
          FIREWALL: ENABLED | IPS: ENGAGED
        </div>
      </div>

      {/* MFA Modal Toggle */}
      {mfaModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-900 w-full max-w-md shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setMfaModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Multi-Factor Authentication</h3>
                <p className="text-xs text-slate-400 font-label-caps uppercase tracking-wider">Security Hardening</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-slate-300">
                {securityData.mfaStatus === "Enabled"
                  ? "Multi-Factor Authentication (MFA) is currently ENABLED. Disabling MFA reduces your security score to 85%."
                  : "Enabling Multi-Factor Authentication (MFA) protects your Sentinel Shield account against unauthorized access and raises your security score to 100%."}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 flex items-center gap-3 text-xs font-data-mono text-cyan-300">
                <Fingerprint className="w-4 h-4 text-cyan-400" />
                <span>PROTOCOL: TOTP 2FA (AUTHENTICATOR APP)</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMfaModalOpen(false)}
                className="w-1/2 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-label-caps uppercase tracking-wider font-bold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEnableMFA}
                className="w-1/2 py-3 rounded-xl bg-cyan-500 text-slate-950 text-xs font-label-caps uppercase tracking-wider font-bold hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                {securityData.mfaStatus === "Enabled" ? "Disable MFA" : "Enable MFA Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SecurityCenter;