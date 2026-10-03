import React, { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await API.post("/auth/forgot-password", { email });
      setSuccess("Reset link sent. Check your inbox.");
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] relative overflow-hidden flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <div className="glass-panel relative z-10 w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 tracking-wide">
            SENTINEL_SHIELD
          </h1>
          <p className="text-slate-400 mt-3">Recover access to your secure system.</p>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Operator Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="analyst@sentinel.ops"
              className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:hover:bg-cyan-500 text-black font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "SENDING SECURE LINK..." : "SEND RESET LINK"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400">
            Remembered your access?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;