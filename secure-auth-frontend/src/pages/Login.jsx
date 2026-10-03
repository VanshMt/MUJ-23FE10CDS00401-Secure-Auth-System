// import React, { useState, useEffect } from "react";
// import API from "../services/api";
// import { useNavigate, Link, useLocation} from "react-router-dom";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [error, setError] = useState("");
// //   const [timeLeft, setTimeLeft] = useState(null);

// //   const handleLogin = async () => {
// //     console.log("CLicked");

// //     useEffect(() => {
// //     const params = new URLSearchParams(location.search);
// //     if (params.get("verified") === "true") {
// //       setError("Email verified successfully ✅ You can login now");
// //     }
// //   }, [location]);  

// //     try {
// //       const res = await API.post("/auth/login", { email, password });
// //       console.log(email, password);
// //       console.log(res.data);
// //       localStorage.setItem("token", res.data.accessToken);
// //       navigate("/dashboard");
// //     } catch (err) {
// //       console.log(err.response?.data?.msg || "Login Failed");
// //       setError(err.response?.data?.msg || "Login Failed");
// //     }

// //     //lockUntil
// //     const lockTime = err.response?.data?.lockUntil;
// //     if(lockTime){
// //         localStorage.setItem("lockUntil", lockTime);
// //     }

// //     useEffect(() => {
// //   const lockUntil = localStorage.getItem("lockUntil");

// //   if (lockUntil) {
// //     const interval = setInterval(() => {
// //       const remaining = Math.floor((lockUntil - Date.now()) / 1000);

// //       if (remaining <= 0) {
// //         clearInterval(interval);
// //         localStorage.removeItem("lockUntil");
// //         setTimeLeft(null);
// //       } else {
// //         setTimeLeft(remaining);
// //       }
// //     }, 1000);

// //        return () => clearInterval(interval);
// //         }
// //     }, []);
// //   };

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [timeLeft, setTimeLeft] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ EMAIL VERIFIED MESSAGE
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (params.get("verified") === "true") {
//       setError("Email verified successfully ✅ You can login now");
//     }
//   }, [location]);

//   // ✅ COUNTDOWN TIMER
//   useEffect(() => {
//     const lockUntil = localStorage.getItem("lockUntil");

//     if (lockUntil) {
//       const interval = setInterval(() => {
//         const remaining = Math.floor((lockUntil - Date.now()) / 1000);

//         if (remaining <= 0) {
//           clearInterval(interval);
//           localStorage.removeItem("lockUntil");
//           setTimeLeft(null);
//         } else {
//           setTimeLeft(remaining);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, []);

//   // ✅ LOGIN FUNCTION
//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", { email, password });

//       localStorage.setItem("token", res.data.accessToken);
//       navigate("/dashboard");

//     } catch (err) {
//       const msg = err.response?.data?.msg || "Login Failed";
//       const lockTime = err.response?.data?.lockUntil;

//       setError(msg);

//       if (lockTime) {
//         localStorage.setItem("lockUntil", lockTime);
//       }
//     }
//   };

//   // ✅ FORMAT TIME
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };


//   return (
//     // <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
//     //   <h2>Login</h2>
//     //   <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
//     //   <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
//     //   <button onClick={handleLogin} style={{ width: "100%", padding: "10px" }}>Login</button>
//     //   <p>Don't have an account? <Link to="/signup">Signup</Link></p>
//     // </div>

//     <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
//   <h2>Login</h2>

//   <input
//     placeholder="Email"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//     style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//   />

//   <input
//     type="password"
//     placeholder="Password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
//   />

//   <button
//     onClick={handleLogin}
//     style={{ width: "100%", padding: "10px" }}
//   >
//     Login
//   </button>
//   {error && (
//   <p style={{ color: "red", marginTop: "10px" }}>
//     {error}
//   </p>
//     )}

//     {/* 🔥 ERROR / TIMER */}
//       {timeLeft ? (
//         <p style={{ color: "red" }}>
//           Account locked. Try again in {formatTime(timeLeft)}
//         </p>
//       ) : (
//         error && <p style={{ color: "red" }}>{error}</p>
//       )}
//   <p>
//   Forgot password? <Link to="/forgot-password">Reset here</Link>
//   </p>
//   <p>
//     Don't have an account? <Link to="/signup">Signup</Link>
//   </p>
  
// </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import API from "../services/api";
import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";

import "../styles/auth.css";

const Login = () => {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // EMAIL VERIFIED MESSAGE
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("verified") === "true") {
      setMessage(
        "Email verified successfully ✅ You can login now"
      );
    }
  }, [location]);

  // INITIALIZE LOCK TIMER FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    const lockUntil = localStorage.getItem("lockUntil");
    if (lockUntil) {
      const remaining = Math.floor(
        (parseInt(lockUntil) - Date.now()) / 1000
      );
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        localStorage.removeItem("lockUntil");
      }
    }
  }, []);

  // COUNTDOWN TIMER - RUNS WHEN TIMELEFT IS SET (FROM LOGIN OR LOCALSTORAGE)
  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (!prev || prev <= 1) {
          localStorage.removeItem("lockUntil");
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.accessToken
      );

      navigate("/dashboard");

    } catch (err) {
      const msg =
        err.response?.data?.msg || "Login Failed";

      const lockTime =
        err.response?.data?.lockUntil;

      setError(msg);

      if (lockTime) {
        localStorage.setItem(
          "lockUntil",
          lockTime
        );

        const remaining = Math.floor(
          (parseInt(lockTime) - Date.now()) / 1000
        );
        setTimeLeft(remaining);
      }

    } finally {
      setLoading(false);
    }
  };

  // Added so unverified users can recover through the existing verification route.
  const handleResendVerification = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await API.post("/auth/resend-verification", { email });
      setMessage(response.data.msg || "Verification email sent. Check your inbox.");
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || "Unable to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  // FORMAT TIMER
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#0b1326] relative overflow-hidden flex items-center justify-center px-4">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>

      {/* CYAN GLOW */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      {/* BLUE GLOW */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>

      {/* LOGIN CARD */}
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
        {message && (
          <div className="mb-4 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {error.toLowerCase().includes("verify") && (
          <button
            type="button"
            onClick={handleResendVerification}
            disabled={loading || !email}
            className="mb-4 text-sm text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
          >
            Resend verification email
          </button>
        )}

        {/* LOCK TIMER */}
        {timeLeft && (
          <div className="mb-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-3 rounded-lg">
            Account locked.
            Try again in {formatTime(timeLeft)}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Operator Email
            </label>

            <input
              type="email"
              placeholder="identity@sentinel.ops"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                bg-[#020617]
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                text-white
                placeholder:text-slate-500
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
                transition-all
              "
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex items-center justify-between mb-2">

              <label className="text-sm text-slate-400">
                Access Key
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition"
              >
                Forgot password?
              </Link>
            </div>

            <input
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                bg-[#020617]
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                text-white
                placeholder:text-slate-500
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
                transition-all
              "
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading || timeLeft}
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              font-semibold
              py-3
              rounded-xl
              transition-all
              duration-300
              shadow-lg
              shadow-cyan-500/20
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "ENCRYPTING SESSION..."
              : "AUTHENTICATE SYSTEM"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center">

          <p className="text-slate-400">
            Don’t have an account?{" "}

            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
