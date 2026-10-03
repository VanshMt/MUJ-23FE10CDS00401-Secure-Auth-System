import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  ShieldCheck,
  Key,
  Clock,
  Calendar,
  Lock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Terminal,
  Fingerprint,
  BadgeCheck,
  X,
} from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";

/* ===============================================================================
   ORIGINAL PROFILE COMPONENT IMPLEMENTATION (RETAINED FOR REFERENCE)
   ===============================================================================
   const Profile = () => {
     const user = {
       username: "Vansh",
       email: "vansh@example.com",
       role: "User",
       emailVerified: true,
       createdAt: "12 June 2026",
       lastLogin: "Today",
     };

     return (
       <div className="p-6">
         <h1 className="text-3xl font-bold mb-6">Profile</h1>

         <div className="bg-white shadow-md rounded-xl p-6">
           <div className="space-y-4">

             <div>
               <p className="text-gray-500">Username</p>
               <p className="font-semibold">{user.username}</p>
             </div>

             <div>
               <p className="text-gray-500">Email</p>
               <p className="font-semibold">{user.email}</p>
             </div>

             <div>
               <p className="text-gray-500">Role</p>
               <p className="font-semibold">{user.role}</p>
             </div>

             <div>
               <p className="text-gray-500">Email Verified</p>
               <p className="font-semibold text-green-600">
                 {user.emailVerified ? "Verified" : "Not Verified"}
               </p>
             </div>

             <div>
               <p className="text-gray-500">Account Created</p>
               <p className="font-semibold">{user.createdAt}</p>
             </div>

             <div>
               <p className="text-gray-500">Last Login</p>
               <p className="font-semibold">{user.lastLogin}</p>
             </div>
           </div>

           <div className="flex gap-4 mt-8">
             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
               Change Password
             </button>

             <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
               Change Email
             </button>
           </div>
         </div>
       </div>
     );
   };
   =============================================================================== */

const Profile = () => {
  const navigate = useNavigate();

  // Preserved original user object
  const user = {
    username: "Vansh",
    email: "vansh@example.com",
    role: "User",
    emailVerified: true,
    createdAt: "12 June 2026",
    lastLogin: "Today",
  };

  // Interactive password and email change states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirmPass: "" });
  const [emailForm, setEmailForm] = useState({ newEmail: "", password: "" });
  
  const [notification, setNotification] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setNotification("Password change request submitted successfully.");
    setShowPasswordModal(false);
    setPasswordForm({ current: "", newPass: "", confirmPass: "" });
    setTimeout(() => setNotification(""), 4000);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setNotification("Email update verification sent to new email address.");
    setShowEmailModal(false);
    setEmailForm({ newEmail: "", password: "" });
    setTimeout(() => setNotification(""), 4000);
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      {/* Top Telemetry & Banner Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                SENTINEL_SHIELD_SOC // USER_PROFILE
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-label-caps text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                SECURITY OPERATIONAL
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl md:text-4xl text-white font-bold tracking-tight">
              User Security Profile
            </h1>
            <p className="max-w-2xl text-slate-400 text-sm mt-2 font-body-sm">
              Manage account authentication credentials, access authorization, and operational security metrics.
            </p>
          </div>

          {/* System Badge */}
          <div className="glass-panel p-3.5 rounded-2xl border border-cyan-500/20 bg-slate-900/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <div className="font-label-caps text-[10px] text-slate-400 uppercase tracking-wider">SEC CLEARANCE</div>
              <div className="font-label-caps text-xs text-cyan-300 font-bold tracking-widest">LEVEL 4 - OPERATOR</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Notification Toast */}
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

      {/* Hero Profile Overview Card */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 bg-slate-950/80 mb-8 relative overflow-hidden">
        {/* Ambient Glow Backdrop Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            {/* Avatar Shield Frame */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-slate-900 border-2 border-cyan-400/50 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                <span className="text-3xl font-bold font-headline-lg text-cyan-400">
                  {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-slate-950">
                <BadgeCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white tracking-wide">{user.username}</h2>
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-label-caps font-bold">
                  {user.role}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1 flex items-center gap-2 font-data-mono">
                <Mail className="w-4 h-4 text-cyan-400/80" />
                {user.email}
              </p>
            </div>
          </div>

          {/* Verification Status Pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-label-caps uppercase tracking-wider">Email Verification</div>
                <div className={`text-xs font-bold font-label-caps uppercase tracking-wider flex items-center gap-1.5 ${user.emailVerified ? "text-emerald-400" : "text-amber-400"}`}>
                  {user.emailVerified ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Not Verified
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Profile Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Username */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Username</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <User className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-bold text-white font-headline-lg">{user.username}</p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>IDENTITY_HANDLE</span>
            <span className="text-cyan-400/80 font-bold">@SENTINEL</span>
          </div>
        </div>

        {/* Card 2: Email */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Email Address</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <p className="text-lg font-bold text-white truncate font-data-mono">{user.email}</p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>STATUS</span>
            <span className="text-emerald-400 font-bold">{user.emailVerified ? "PRIMARY_VERIFIED" : "UNVERIFIED"}</span>
          </div>
        </div>

        {/* Card 3: Role */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Role</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-bold text-white font-headline-lg">{user.role}</p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>PERMISSIONS</span>
            <span className="text-cyan-400/80 font-bold">STANDARD_OPERATOR</span>
          </div>
        </div>

        {/* Card 4: Email Verified */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Email Verified</span>
            <div className={`p-2 rounded-xl ${user.emailVerified ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
              {user.emailVerified ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
          </div>
          <p className={`text-xl font-bold font-label-caps ${user.emailVerified ? "text-emerald-400" : "text-amber-400"}`}>
            {user.emailVerified ? "Verified" : "Not Verified"}
          </p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>SECURITY_STATE</span>
            <span className={user.emailVerified ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
              {user.emailVerified ? "SECURE_VALIDATED" : "PENDING_CHECK"}
            </span>
          </div>
        </div>

        {/* Card 5: Account Created */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Account Created</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-bold text-white font-data-mono">{user.createdAt}</p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>REGISTRATION</span>
            <span className="text-cyan-400/80 font-bold">PROVISIONED</span>
          </div>
        </div>

        {/* Card 6: Last Login */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/50 hover:border-cyan-400/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Last Login</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-bold text-white font-data-mono">{user.lastLogin}</p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-data-mono">
            <span>SESSION_MONITOR</span>
            <span className="text-cyan-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              ACTIVE
            </span>
          </div>
        </div>

      </div>

      {/* Security Operations & Authentication Controls Section */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/20 bg-slate-950/90 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-cyan-400" />
              Authentication & Security Actions
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Manage your credentials and authentication details securely.
            </p>
          </div>
          <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 self-start sm:self-auto font-bold">
            ENCRYPTED_CONTROLS
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-label-caps text-xs uppercase tracking-[0.15em] hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center gap-2.5 group cursor-pointer"
          >
            <Lock className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
            Change Password
          </button>

          <button
            onClick={() => setShowEmailModal(true)}
            className="px-6 py-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/15 hover:border-cyan-400 font-bold font-label-caps text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-2.5 group cursor-pointer"
          >
            <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            Change Email
          </button>
        </div>
      </div>

      {/* Terminal Telemetry Log Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-data-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>SENTINEL_SHIELD_ID // OPERATOR: Vansh // SEC_STATE: ENCRYPTED_TLS_V1.3</span>
        </div>
        <div className="text-cyan-400/80 font-bold">
          LATENCY: 12ms | PROXIMITY: LOCALHOST
        </div>
      </div>

      {/* Interactive Modal: Change Password */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-900 w-full max-w-md shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Change Password</h3>
                <p className="text-xs text-slate-400 font-label-caps uppercase tracking-wider">Authentication Security</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label-caps text-slate-300 uppercase tracking-wider mb-2">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm font-data-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-label-caps text-slate-300 uppercase tracking-wider mb-2">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm font-data-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-label-caps text-slate-300 uppercase tracking-wider mb-2">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPass: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm font-data-mono"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="w-1/2 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-label-caps uppercase tracking-wider font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-cyan-500 text-slate-950 text-xs font-label-caps uppercase tracking-wider font-bold hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Modal: Change Email */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-900 w-full max-w-md shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Change Email Address</h3>
                <p className="text-xs text-slate-400 font-label-caps uppercase tracking-wider">Account Communication</p>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label-caps text-slate-300 uppercase tracking-wider mb-2">New Email Address</label>
                <input
                  type="email"
                  required
                  value={emailForm.newEmail}
                  onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                  placeholder="newemail@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm font-data-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-label-caps text-slate-300 uppercase tracking-wider mb-2">Current Password Verification</label>
                <input
                  type="password"
                  required
                  value={emailForm.password}
                  onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm font-data-mono"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="w-1/2 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-label-caps uppercase tracking-wider font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-cyan-500 text-slate-950 text-xs font-label-caps uppercase tracking-wider font-bold hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  Update Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Profile;