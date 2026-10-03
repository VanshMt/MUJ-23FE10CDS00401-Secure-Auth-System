import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (!password) return { label: "", value: 0, color: "bg-slate-700", widthClass: "w-0" };
    if (score <= 2) return { label: "Weak", value: 1, color: "bg-red-400", widthClass: "w-1/4" };
    if (score === 3) return { label: "Fair", value: 2, color: "bg-orange-400", widthClass: "w-2/4" };
    if (score === 4) return { label: "Strong", value: 3, color: "bg-cyan-400", widthClass: "w-3/4" };
    return { label: "Very Strong", value: 4, color: "bg-emerald-400", widthClass: "w-full" };
  };

  const strength = getPasswordStrength();
  const invalidToken = /invalid|expired|token/.test(error.toLowerCase());

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Security key must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      setSuccess("Security keys updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to update security keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] relative overflow-hidden flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className="glass-panel relative z-10 w-full max-w-lg rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 tracking-wide">
            SENTINEL_SHIELD
          </h1>
          <p className="text-slate-400 mt-3">
            Reset security credentials and restore access.
          </p>
        </div>

        {success && (
          <div className="mb-4 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {invalidToken && (
          <div className="mb-4 bg-slate-800/70 border border-slate-600 text-slate-200 px-4 py-3 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-yellow-300">timer_off</span>
              <div>
                <p className="font-semibold">Reset link expired or invalid.</p>
                <p className="text-sm text-slate-400">
                  Request a new link from the login portal to continue.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">New Security Key</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                disabled={loading || invalidToken}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-slate-400">Confirm Security Key</label>
              {password && (
                <span className={`${strength.color} text-xs font-semibold`}>
                  {strength.label}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                disabled={loading || invalidToken}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showConfirmPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Password strength</span>
              <span>{strength.label || "Enter a password"}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
              <div className={`h-full rounded-full transition-all ${strength.color} ${strength.widthClass}`} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || invalidToken}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:hover:bg-cyan-500 text-black font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "UPDATING SECURITY KEYS..." : "RESET PASSWORD"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400">
            Remembered your credentials?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
