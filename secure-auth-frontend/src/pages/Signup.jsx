import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Calculate password strength
  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { level: 0, text: "", color: "" },
      { level: 1, text: "Weak", color: "text-red-400" },
      { level: 2, text: "Fair", color: "text-orange-400" },
      { level: 3, text: "Good", color: "text-yellow-400" },
      { level: 4, text: "Strong", color: "text-cyan-400" },
      { level: 5, text: "Very Strong", color: "text-green-400" },
    ];

    return levels[strength] || levels[5];
  };

  const passwordStrength = getPasswordStrength();

  // Validate form
  const validateForm = () => {
    if (!fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);
    try {
      await API.post("/auth/register", {
        fullName,
        email,
        password,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.msg || err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
  //     <h2>Signup</h2>
  //     <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
  //     <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
  //     <button onClick={handleSignup} style={{ width: "100%", padding: "10px" }}>Signup</button>
  //     <p>Already have an account? <Link to="/login">Login</Link></p>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-[#0b1326] relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>

      {/* CYAN GLOW */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      {/* BLUE GLOW */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>

      {/* SIGNUP CARD */}
      <div className="glass-panel relative z-10 w-full max-w-md rounded-2xl p-8 shadow-2xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 tracking-wide">
            SENTINEL_SHIELD
          </h1>
          <p className="text-slate-400 mt-3">
            Secure Authentication Terminal
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mb-4 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg">
            Account created successfully! Redirecting to login...
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* FULL NAME */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
              disabled={loading}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Operator Email
            </label>
            <input
              type="email"
              placeholder="identity@sentinel.ops"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
              disabled={loading}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-slate-400">Access Key</label>
              {passwordStrength.level > 0 && (
                <span className={`text-xs ${passwordStrength.color}`}>
                  {passwordStrength.text}
                </span>
              )}
            </div>
            <input
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
              disabled={loading}
            />
            {password && (
              <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    passwordStrength.level === 1
                      ? "w-1/5 bg-red-500"
                      : passwordStrength.level === 2
                      ? "w-2/5 bg-orange-500"
                      : passwordStrength.level === 3
                      ? "w-3/5 bg-yellow-500"
                      : passwordStrength.level === 4
                      ? "w-4/5 bg-cyan-500"
                      : "w-full bg-green-500"
                  }`}
                ></div>
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Confirm Access Key
            </label>
            <input
              type="password"
              placeholder="••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
              disabled={loading}
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* SIGNUP BUTTON */}
          <button
            type="submit"
            disabled={loading || !fullName || !email || !password || !confirmPassword}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:hover:bg-cyan-500 text-black font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE SECURE ACCOUNT"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
 
