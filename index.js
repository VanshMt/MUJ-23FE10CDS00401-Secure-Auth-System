// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const rateLimit = require("express-rate-limit");
// const app = express();
// app.use(express.json());


// // Routes
// const authRoutes = require("./routes/auth");
// app.use("/auth", authRoutes);

// // Connect DB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected ✅"))
//   .catch(err => console.log(err));

// app.get("/", (req, res) => {
//   res.send("Server running ");
// });

// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });

// const rateLimit = require("express-rate-limit");

// // Limit login attempts
// const loginLimiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 5, // max 5 requests per minute
//   message: "Too many login attempts. Try again later."
// });

// // Apply only to login route
// app.use("/auth/login", loginLimiter);

// // const authRoutes = require("./routes/auth");
// // app.use("/auth", authRoutes);

require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();
app.set("trust proxy", 1); // For rate limiter to work behind proxies

// Legacy CORS configuration retained; machine-specific LAN origins were removed because they change:
// app.use(cors({
//   origin: [process.env.CLIENT_URL, "http://localhost:3001", "http://localhost:3000", "<LAN_FRONTEND_ORIGIN>", "<LAN_BACKEND_ORIGIN>"],
//   credentials: true
// }));

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// COOKIE PARSER (For refresh token in cookies)
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// RATE LIMITER (Brute force protection)
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // max 5 attempts
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    const lockUntil = Date.now() + 1 * 60 * 1000; // Lock for 1 minute
    res.status(429).json({
      msg: "Too many login attempts. Try again later.",
      lockUntil,
    });
  }
});

// Apply limiter ONLY to login
app.use("/auth/login", loginLimiter);

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
const securityRoutes = require("./routes/security");
app.use("/api/security", securityRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  // Previous handler printed the entire connection error; retained disabled to avoid leaking connection details:
  // .catch(err => console.log(err));
  .catch(err => console.error("MongoDB connection failed:", err.name));

// Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("Server started on port 3000");
});

