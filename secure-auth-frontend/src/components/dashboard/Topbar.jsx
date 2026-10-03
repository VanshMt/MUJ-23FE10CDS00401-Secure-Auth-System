import React from "react";
import { LogOut, User } from "lucide-react";

const Topbar = ({ onLogout }) => {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-slate-950/90 backdrop-blur-md z-30 flex items-center justify-between px-6 border-b border-white/5">
      <div className="flex items-center gap-4">
        <span className="font-label-caps text-slate-300 uppercase tracking-[0.25em] text-xs">
          Operations / <span className="text-cyan-400 font-bold">Overview</span>
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="font-label-caps text-sm text-slate-300 font-bold">COMMANDER_ALPHA</div>
            <div className="font-label-caps text-[10px] text-cyan-400 font-bold">LEVEL 4 CLEARANCE</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <User className="w-5 h-5" />
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:border-red-400 hover:bg-red-500/20 transition-colors group"
        >
          <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-300" />
          <span className="font-label-caps text-[10px] text-red-400 group-hover:text-red-300 font-bold">LOGOUT</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
