import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Shield,
  Lock,
  Clock,
  Terminal,
  Save,
  RotateCcw,
  CheckCircle2,
  X,
  ShieldCheck,
} from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

/* ===============================================================================
   ORIGINAL SETTINGS COMPONENT IMPLEMENTATION (RETAINED FOR REFERENCE)
   ===============================================================================
   const Settings = () => {
     return (
       <div className="p-8">
         <h1 className="text-3xl font-bold mb-4">System Settings</h1>
         <p className="text-gray-400">Configure Sentinel Shield operational settings.</p>
       </div>
     );
   };
   =============================================================================== */

const Settings = () => {
  const navigate = useNavigate();

  // Local settings configuration state
  const [settings, setSettings] = useState({
    emailAlerts: true,
    webhookNotifications: true,
    anomalyPulse: true,
    sessionTimeout: "30",
    maxSessions: "3",
    mfaEnforced: false,
  });

  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setNotification("System settings saved successfully.");
      setTimeout(() => setNotification(""), 4000);
    }, 1000);
  };

  const handleReset = () => {
    setSettings({
      emailAlerts: true,
      webhookNotifications: true,
      anomalyPulse: true,
      sessionTimeout: "30",
      maxSessions: "3",
      mfaEnforced: false,
    });
    setNotification("Reset settings to default security posture parameters.");
    setTimeout(() => setNotification(""), 4000);
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      {/* Top Telemetry Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                SENTINEL_SHIELD_SOC // SYSTEM_SETTINGS
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                POLICY: ENCRYPTED
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl md:text-4xl text-white font-bold tracking-tight">
              System Settings & Security Policy
            </h1>
            <p className="max-w-2xl text-slate-400 text-sm mt-2 font-body-sm">
              Configure operational parameters, security alerts, session timeouts, and threat notification preferences for Sentinel Shield.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/30 font-label-caps text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              Reset Defaults
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

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Alert & Telemetry Notifications */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/20 bg-slate-950/80">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Alert & Notification Telemetry</h2>
              <p className="text-xs text-slate-400 font-label-caps uppercase tracking-wider">Configure Threat Alert Channels</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/20 transition-all">
              <div>
                <div className="text-white font-bold text-sm">Email Security Notifications</div>
                <p className="text-xs text-slate-400 mt-1">Receive immediate alert emails when suspicious logins or failed access attempts occur.</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("emailAlerts")}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                  settings.emailAlerts ? "bg-cyan-500" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    settings.emailAlerts ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/20 transition-all">
              <div>
                <div className="text-white font-bold text-sm">High-Severity Webhook Dispatch</div>
                <p className="text-xs text-slate-400 mt-1">Dispatch high-severity threat payloads to connected SOC monitoring webhooks.</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("webhookNotifications")}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                  settings.webhookNotifications ? "bg-cyan-500" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    settings.webhookNotifications ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/20 transition-all">
              <div>
                <div className="text-white font-bold text-sm">Real-Time Anomaly Pulse Monitoring</div>
                <p className="text-xs text-slate-400 mt-1">Enable continuous background threat scanning and IP reputation checking.</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("anomalyPulse")}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                  settings.anomalyPulse ? "bg-cyan-500" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    settings.anomalyPulse ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Session & Auth Policy Controls */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/20 bg-slate-950/80">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Session & Authentication Policies</h2>
              <p className="text-xs text-slate-400 font-label-caps uppercase tracking-wider">Configure Bearer & Authorization Limits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
              <label className="block text-xs font-label-caps text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Session Inactivity Timeout
              </label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleChange("sessionTimeout", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs font-data-mono cursor-pointer"
              >
                <option value="15">15 Minutes (Strict)</option>
                <option value="30">30 Minutes (Recommended)</option>
                <option value="60">1 Hour (Standard)</option>
                <option value="240">4 Hours (Extended)</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
              <label className="block text-xs font-label-caps text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                Max Concurrent Session Devices
              </label>
              <select
                value={settings.maxSessions}
                onChange={(e) => handleChange("maxSessions", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs font-data-mono cursor-pointer"
              >
                <option value="1">1 Active Device (Maximum Hardening)</option>
                <option value="3">3 Active Devices (Standard Baseline)</option>
                <option value="5">5 Active Devices (Flexible)</option>
                <option value="10">Unlimited Devices</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-label-caps text-xs uppercase tracking-[0.15em] hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_25px_rgba(34,211,238,0.25)] flex items-center gap-2.5 disabled:opacity-60 cursor-pointer"
          >
            <Save className={`w-4 h-4 text-slate-950 ${saving ? "animate-spin" : ""}`} />
            {saving ? "Saving Configurations..." : "Save System Configuration"}
          </button>
        </div>
      </form>

      {/* Terminal Telemetry Footer Banner */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-data-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>SENTINEL_SETTINGS // POLICY_VER: 4.2.0 // NODE: US-EAST-01</span>
        </div>
        <div className="text-cyan-400/80 font-bold">
          CIPHER: AES-256-GCM | TLS: v1.3
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
