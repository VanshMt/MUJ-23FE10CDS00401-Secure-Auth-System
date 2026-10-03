import React from "react";
import { Users, AlertTriangle, Clock, Shield } from "lucide-react";

const getIcon = (iconName) => {
  const iconMap = {
    Users: <Users className="w-6 h-6" />,
    AlertTriangle: <AlertTriangle className="w-6 h-6" />,
    Clock: <Clock className="w-6 h-6" />,
    Shield: <Shield className="w-6 h-6" />,
  };
  return iconMap[iconName] || <Users className="w-6 h-6" />;
};

const StatsCard = ({ icon, label, value, delta, progressClass, progressWidth }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
      <div className="absolute inset-x-0 top-0 h-1 bg-cyan-500/10"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-300">
          {getIcon(icon)}
        </div>
        <span className={`font-label-caps text-[10px] uppercase tracking-[0.2em] font-bold ${delta.includes("-") ? "text-red-400" : "text-green-400"}`}>
          {delta}
        </span>
      </div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="font-label-caps text-xs text-slate-300 uppercase tracking-[0.2em]">
        {label}
      </div>
      {progressWidth && (
        <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
          <div className={`h-full rounded-full ${progressClass}`} style={{ width: progressWidth }} />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
