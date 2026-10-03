import React from "react";
import { Shield, LayoutDashboard, Key, Lock, Settings, User, ShieldCheck} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    label: "Security Center",
    icon: ShieldCheck,
    path: "/security-center",
  },
  {
    label: "Sessions",
    icon: Key,
    path: "/sessions",
  },
  {
    label: "Security Logs",
    icon: Lock,
    path: "/security-logs",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
//];

// const Sidebar = () => {
//   return (
//     <aside className="fixed left-0 top-0 h-full w-64 bg-slate-950/95 border-r border-white/5 z-40 hidden md:flex flex-col px-6 py-8">
//       <div className="flex items-center gap-2 mb-12">
//         <Shield className="w-8 h-8 text-cyan-400" />
//         <div>
//           <div className="font-headline-lg text-xl tracking-tighter text-cyan-400 font-bold uppercase">
//             Sentinel Shield
//           </div>
//         </div>
//       </div>

//       <nav className="space-y-2 mb-8">
//         {navItems.map((item) => {
//           const IconComponent = item.icon;
//           return (
//             <button
//               key={item.label}
//               className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
//                 item.active
//                   ? "bg-cyan-500/15 text-cyan-300 border-l-2 border-cyan-400 font-bold"
//                   : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
//               }`}
//             >
//               <IconComponent className="w-5 h-5" />
//               <span className="font-label-caps text-[10px] tracking-[0.2em] uppercase">{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>

//       <div className="mt-auto p-4 rounded-2xl glass-panel border border-cyan-500/20">
//         <div className="flex items-center gap-3">
//           <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
//           <span className="font-label-caps text-[10px] text-cyan-300 uppercase tracking-[0.2em] font-bold">
//             System Armed
//           </span>
//         </div>
//         <div className="font-data-mono text-[10px] text-cyan-400/80 mt-2 font-semibold">
//           NODE: US-EAST-01
//         </div>
//       </div>
//     </aside>
//   );
// };
const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-950/95 border-r border-white/5 z-40 hidden md:flex flex-col px-6 py-8">
      <div className="flex items-center gap-2 mb-12">
        <Shield className="w-8 h-8 text-cyan-400" />
        <div>
          <div className="font-headline-lg text-xl tracking-tighter text-cyan-400 font-bold uppercase">
            Sentinel Shield
          </div>
        </div>
      </div>

      <nav className="space-y-2 mb-8">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-cyan-500/15 text-cyan-300 border-l-2 border-cyan-400 font-bold"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
              }`}
            >
              <IconComponent className="w-5 h-5" />

              <span className="font-label-caps text-[10px] tracking-[0.2em] uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 rounded-2xl glass-panel border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>

          <span className="font-label-caps text-[10px] text-cyan-300 uppercase tracking-[0.2em] font-bold">
            System Armed
          </span>
        </div>

        <div className="font-data-mono text-[10px] text-cyan-400/80 mt-2 font-semibold">
          TELEMETRY: ACTIVE
        </div>
      </div>
    </aside>
  );
};


export default Sidebar;
