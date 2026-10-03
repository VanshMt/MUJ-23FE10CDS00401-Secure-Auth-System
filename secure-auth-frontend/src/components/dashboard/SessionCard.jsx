import React from "react";
// Previous icon import retained as reference; Chrome and Firefox are not exports in the installed icon package:
// import { Laptop, Smartphone, Monitor, Globe, MapPin, Chrome, Firefox } from "lucide-react";
import { Laptop, Smartphone, Monitor, Globe, MapPin } from "lucide-react";

const getDeviceIcon = (os, browser) => {
  const osLower = os?.toLowerCase() || "";
  // Check OS first for device type
  if (osLower.includes("mac")) {
    return <Laptop className="w-6 h-6" />;
  }
  if (osLower.includes("iphone") || osLower.includes("ios")) {
    return <Smartphone className="w-6 h-6" />;
  }
  if (osLower.includes("windows")) {
    return <Monitor className="w-6 h-6" />;
  }
  if (osLower.includes("android")) {
    return <Smartphone className="w-6 h-6" />;
  }
  
  // Fallback
  return <Laptop className="w-6 h-6" />;
};

const SessionCard = ({ session, onRevoke }) => {
  const deviceDisplay = session.browser && session.os 
    ? `${session.browser} on ${session.os}`
    : session.device || "Unknown Device";
  
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/5 shadow-xl shadow-cyan-500/10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-3xl bg-cyan-500/15 flex items-center justify-center text-cyan-300">
            {getDeviceIcon(session.os, session.browser)}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-white">{deviceDisplay}</h3>
              {session.current && (
                <span className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-200 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Current
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-slate-300 text-sm">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                {session.ip}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {session.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 lg:text-right">
          <div>
            <div className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
              Last active
            </div>
            <div className="font-data-mono text-sm text-cyan-300 mt-1 font-semibold">
              {(() => {
                const raw = session.lastActive && session.lastActive !== "Never" ? session.lastActive : session.createdAt || session.updatedAt || session.timestamp;
                if (!raw) return session.lastActive || "Never";
                const d = new Date(raw);
                return !isNaN(d.getTime()) ? d.toLocaleString() : String(raw);
              })()}
            </div>
          </div>
          <button
            onClick={() => onRevoke(session.id)}
            className="px-5 py-2 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-[0.2em] hover:bg-red-500/25 transition"
          >
            Revoke
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
