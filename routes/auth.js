// // const router = require("express").Router();
// // const User = require("../models/User");
// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcrypt");

// // // REGISTER
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = new User({ email, password });
// //     await user.save();

// //     res.json({ msg: "User registered successfully" });
// //   } 
// //     catch (err) {
// //     console.log("REGISTER ERROR 👉", err);  
// //     res.status(500).json({ msg: "Error registering user" });
// //   }
// // });

// // // LOGIN
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ msg: "Invalid credentials" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ msg: "Invalid credentials" });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id },
// //       "secretkey",
// //       { expiresIn: "1h" }
// //     );

// //     res.json({ token });

// //   } catch (err) {
// //     res.status(500).json({ msg: "Login error" });
// //   }
// // });
// // // Protected Route
// // const authMiddleware = require("../middleware/authmiddleware");

// // // PROTECTED ROUTE
// // router.get("/dashboard", authMiddleware, (req, res) => {
// //   res.json({ msg: "Welcome to dashboard 🔐", user: req.user });
// // });

// // // ✅ ALWAYS LAST
// // module.exports = router;

// const router = require("express").Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const authMiddleware = require("../middleware/authmiddleware");

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✅ CHECK IF USER EXISTS
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // 🔐 HASH PASSWORD HERE
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       email,
//       password: hashedPassword
//     });

//     await user.save();

//     res.json({ msg: "User registered successfully" });

//   } catch (err) {
//     console.log("REGISTER ERROR 👉", err);
//     res.status(500).json({ msg: "Error registering user" });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // 🔐 COMPARE HASHED PASSWORD
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ token });

//   } catch (err) {
//     res.status(500).json({ msg: "Login error" });
//   }
// });

// // PROTECTED ROUTE
// router.get("/dashboard", authMiddleware, (req, res) => {
//   res.json({ msg: "Welcome to dashboard 🔐", user: req.user });
// });

// module.exports = router;

// const router = require("express").Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const authMiddleware = require("../middleware/authmiddleware");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");


// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // check existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       email,
//       password: hashedPassword
//     });

//     await user.save();

//     res.json({ msg: "User registered successfully" });

//   } catch (err) {
//     console.log("REGISTER ERROR 👉", err);
//     res.status(500).json({ msg: "Error registering user" });
//   }

//   // const crypto = require("crypto");

// // generate token
//     const verifyToken = crypto.randomBytes(32).toString("hex");

// // hash it
//     const hashedToken = crypto.createHash("sha256").update(verifyToken).digest("hex");
//     user.verifyToken = hashedToken;
//     user.verifyTokenExpire = Date.now() + 15 * 60 * 1000;
// });

// // LOGIN
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     console.log(`Login attempt: ${email}`);

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       console.log(`Failed login: ${email}`);
// //       return res.status(400).json({ msg: "Invalid credentials" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       console.log(`Failed login: ${email}`);
// //       return res.status(400).json({ msg: "Invalid credentials" });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1h" }
// //     );

// //     res.json({ token });

// //   } catch (err) {
// //     res.status(500).json({ msg: "Login error" });
// //   }
// // });
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // 🚫 CHECK IF ACCOUNT LOCKED
//     if (user.lockUntil && user.lockUntil > Date.now()) {
//       return res.status(403).json({
//         msg: "Account locked. Try again later."
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     // ❌ WRONG PASSWORD
//     if (!isMatch) {
//       user.failedAttempts += 1;

//       // 🔒 LOCK AFTER 5 ATTEMPTS
//       // if (user.failedAttempts >= 5) {
//       //   user.lockUntil = Date.now() + 5 * 60 * 1000; // 5 minutes
//       // }
//       if (user.failedAttempts >= 5) {
//   user.lockUntil = Date.now() + 5 * 60 * 1000;

//   // 🚨 SEND EMAIL ALERT
//   await sendEmail(
//     user.email,
//     "🚨 Security Alert: Account Locked",
//     "Your account has been locked due to multiple failed login attempts.\n\nIf this wasn't you, please reset your password immediately."
//   );
// }
//       await user.save();

//       return res.status(400).json({
//         msg: "Invalid credentials"
//       });
//     }

//     // ✅ SUCCESS LOGIN → RESET
//     user.failedAttempts = 0;
//     user.lockUntil = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ token });

//   } catch (err) {
//     console.log("LOGIN ERROR 👉", err);
//     res.status(500).json({ msg: "Login error" });
//   }

//   if (!user.isVerified) {
//   return res.status(403).json({ msg: "Please verify your email first" });
// }
// });

// //Forgot Password
// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     // 🔐 Generate token
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     user.resetToken = hashedToken;
//     user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 min

//     await user.save();

//     const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

//     // 📧 Send Email
//     await sendEmail(
//       user.email,
//       "🔐 Password Reset Request",
//       `Click this link to reset your password:\n\n${resetURL}\n\nThis link expires in 15 minutes.`
//     );

//     res.json({ msg: "Password reset email sent" });

//   } catch (err) {
//     console.log("FORGOT ERROR 👉", err);
//     res.status(500).json({ msg: "Error sending reset email" });
//   }
// });

// // PROTECTED ROUTE
// router.get("/dashboard", authMiddleware, (req, res) => {
//   res.json({ msg: "Welcome to dashboard 🔐", user: req.user });
// });

// // Reset Password Route
// router.post("/reset-password/:token", async (req, res) => {
//   try {
//     const { password } = req.body;

//     // const user = await User.findOne({
//     // hash token first
//     const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    
//     // find user with matching token and valid expiry
    
//     const user = await User.findOne({
//         resetToken: hashedToken,
//         resetTokenExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid or expired token" });
//     }

//     // 🔐 Hash new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     user.password = hashedPassword;
//     user.resetToken = undefined;
//     user.resetTokenExpire = undefined;

//     await user.save();

//     res.json({ msg: "Password reset successful" });

//   } catch (err) {
//     console.log("RESET ERROR 👉", err);
//     res.status(500).json({ msg: "Error resetting password" });
//   }

//   //Verify Email Route
//   router.get("/verify-email/:token", async (req, res) => {
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     verifyToken: hashedToken,
//     verifyTokenExpire: { $gt: Date.now() }
//   });

//   if (!user) {
//     return res.status(400).json({ msg: "Invalid or expired token" });
//   }

//   user.isVerified = true;
//   user.verifyToken = undefined;
//   user.verifyTokenExpire = undefined;

//   await user.save();

//   res.json({ msg: "Email verified successfully" });
// });

// });

// module.exports = router;

// const router = require("express").Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const authMiddleware = require("../middleware/authmiddleware");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");


// // ================= REGISTER =================
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // check existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       email,
//       password: hashedPassword
//     });

//     // 🔐 EMAIL VERIFICATION TOKEN
//     const verifyToken = crypto.randomBytes(32).toString("hex");
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(verifyToken)
//       .digest("hex");

//     user.verifyToken = hashedToken;
//     user.verifyTokenExpire = Date.now() + 15 * 60 * 1000;

//     await user.save();

//     // 📧 send verification email
//     const verifyLink = `http://localhost:3000/auth/verify-email/${verifyToken}`;

//     await sendEmail(
//       user.email,
//       "Verify your email",
//       `Click this link to verify your email:\n\n${verifyLink}`
//     );

//     res.json({ msg: "User registered. Please verify your email." });

//   } catch (err) {
//     console.log("REGISTER ERROR 👉", err);
//     res.status(500).json({ msg: "Error registering user" });
//   }
// });


// // ================= LOGIN =================
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // ❌ BLOCK IF NOT VERIFIED
//     if (!user.isVerified) {
//       return res.status(403).json({ msg: "Please verify your email first" });
//     }

//     // 🔒 ACCOUNT LOCK CHECK
//     if (user.lockUntil && user.lockUntil > Date.now()) {
//       return res.status(403).json({
//         msg: "Account locked. Try again later."
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     // ❌ WRONG PASSWORD
//     if (!isMatch) {
//       user.failedAttempts += 1;

//       if (user.failedAttempts >= 5) {
//         user.lockUntil = Date.now() + 5 * 60 * 1000;

//         await sendEmail(
//           user.email,
//           "🚨 Security Alert",
//           "Your account is locked due to multiple failed login attempts."
//         );
//       }

//       await user.save();

//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // ✅ RESET ON SUCCESS
//     user.failedAttempts = 0;
//     user.lockUntil = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ token });

//   } catch (err) {
//     console.log("LOGIN ERROR 👉", err);
//     res.status(500).json({ msg: "Login error" });
//   }
// });


// // ================= FORGOT PASSWORD =================
// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");

//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     user.resetToken = hashedToken;
//     user.resetTokenExpire = Date.now() + 15 * 60 * 1000;

//     await user.save();

//     const resetURL = `http://localhost:3000/auth/reset-password/${resetToken}`;

//     await sendEmail(
//       user.email,
//       "Reset Password",
//       `Click here to reset password:\n\n${resetURL}`
//     );

//     res.json({ msg: "Password reset email sent" });

//   } catch (err) {
//     console.log("FORGOT ERROR 👉", err);
//     res.status(500).json({ msg: "Error sending reset email" });
//   }
// });


// // ================= RESET PASSWORD =================
// router.post("/reset-password/:token", async (req, res) => {
//   try {
//     const { password } = req.body;

//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     const user = await User.findOne({
//       resetToken: hashedToken,
//       resetTokenExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid or expired token" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user.password = hashedPassword;
//     user.resetToken = undefined;
//     user.resetTokenExpire = undefined;

//     await user.save();

//     res.json({ msg: "Password reset successful" });

//   } catch (err) {
//     console.log("RESET ERROR 👉", err);
//     res.status(500).json({ msg: "Error resetting password" });
//   }
// });


// // ================= VERIFY EMAIL =================
// router.get("/verify-email/:token", async (req, res) => {
//   try {
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     const user = await User.findOne({
//       verifyToken: hashedToken,
//       verifyTokenExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid or expired token" });
//     }

//     user.isVerified = true;
//     user.verifyToken = undefined;
//     user.verifyTokenExpire = undefined;

//     await user.save();

//     res.json({ msg: "Email verified successfully" });

//   } catch (err) {
//     console.log("VERIFY ERROR 👉", err);
//     res.status(500).json({ msg: "Error verifying email" });
//   }

//   const verifyLink = `http://localhost:3000/auth/verify-email/${verifyToken}`;

//   await sendEmail(
//      user.email,
//     "Verify your email",
//     `Click to verify:\n\n${verifyLink}`
//   );
// });


// // ================= PROTECTED ROUTE =================
// router.get("/dashboard", authMiddleware, (req, res) => {
//   res.json({ msg: "Welcome to dashboard 🔐", user: req.user });
// });


// module.exports = router;

// const router = require("express").Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const authMiddleware = require("../middleware/authmiddleware");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");
// const BlacklistToken = require("../models/BlacklistToken");

// // ================= REGISTER =================
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       email,
//       password: hashedPassword
//     });

//     // 🔐 Email verification token
//     const verifyToken = crypto.randomBytes(32).toString("hex");
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(verifyToken)
//       .digest("hex");

//     user.verifyToken = hashedToken;
//     user.verifyTokenExpire = Date.now() + 15 * 60 * 1000;

//     await user.save();

//     // 📧 Send verification email
//     const verifyLink = `http://localhost:3000/auth/verify-email/${verifyToken}`;

//     await sendEmail(
//       user.email,
//       "Verify your email",
//       `Click this link to verify your email:\n\n${verifyLink}`
//     );

//     res.json({ msg: "User registered. Please verify your email." });

//   } catch (err) {
//     console.log("REGISTER ERROR 👉", err);
//     res.status(500).json({ msg: "Error registering user" });
//   }
// });


// // ================= LOGIN =================
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // ❌ Block if not verified
//     if (!user.isVerified) {
//       return res.status(403).json({ msg: "Please verify your email first" });
//     }

//     // 🔒 Account lock check
//     if (user.lockUntil && user.lockUntil > Date.now()) {
//       return res.status(403).json({
//         msg: "Account locked. Try again later."
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       user.failedAttempts += 1;

//       if (user.failedAttempts >= 5) {
//         user.lockUntil = Date.now() + 5 * 60 * 1000;

//         await sendEmail(
//           user.email,
//           "🚨 Security Alert",
//           "Your account has been locked due to multiple failed login attempts."
//         );
//       }

//       await user.save();

//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // ✅ Reset on success
//     user.failedAttempts = 0;
//     user.lockUntil = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ token });

//   } catch (err) {
//     console.log("LOGIN ERROR 👉", err);
//     res.status(500).json({ msg: "Login error" });
//   }
// });


// // ================= FORGOT PASSWORD =================
// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");

//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     user.resetToken = hashedToken;
//     user.resetTokenExpire = Date.now() + 15 * 60 * 1000;

//     await user.save();

//     const resetURL = `http://localhost:3000/auth/reset-password/${resetToken}`;

//     await sendEmail(
//       user.email,
//       "Reset Password",
//       `Click here to reset your password:\n\n${resetURL}`
//     );

//     res.json({ msg: "Password reset email sent" });

//   } catch (err) {
//     console.log("FORGOT ERROR 👉", err);
//     res.status(500).json({ msg: "Error sending reset email" });
//   }
// });


// // ================= RESET PASSWORD =================
// router.post("/reset-password/:token", async (req, res) => {
//   try {
//     const { password } = req.body;

//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     const user = await User.findOne({
//       resetToken: hashedToken,
//       resetTokenExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid or expired token" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user.password = hashedPassword;
//     user.resetToken = undefined;
//     user.resetTokenExpire = undefined;

//     await user.save();

//     res.json({ msg: "Password reset successful" });

//   } catch (err) {
//     console.log("RESET ERROR 👉", err);
//     res.status(500).json({ msg: "Error resetting password" });
//   }
// });


// // ================= VERIFY EMAIL =================
// router.get("/verify-email/:token", async (req, res) => {
//   try {
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     const user = await User.findOne({
//       verifyToken: hashedToken,
//       verifyTokenExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid or expired token" });
//     }

//     user.isVerified = true;
//     user.verifyToken = undefined;
//     user.verifyTokenExpire = undefined;

//     await user.save();

//     res.json({ msg: "Email verified successfully" });

//   } catch (err) {
//     console.log("VERIFY ERROR 👉", err);
//     res.status(500).json({ msg: "Error verifying email" });
//   }
// });

// // ================= RESEND VERIFY EMAIL =================
// router.post("/resend-verification", async (req, res) => {
//   console.log("RESEND HIT");

//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ msg: "Email is already verified" });
//     }

//     const verifyToken = crypto.randomBytes(32).toString("hex");
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(verifyToken)
//       .digest("hex");

//     user.verifyToken = hashedToken;
//     user.verifyTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

//     await user.save();

//     const verifyLink = `http://localhost:3000/auth/verify-email/${verifyToken}`;

//     await sendEmail(
//       user.email,
//       "Verify your email",
//       `Click to verify:\n\n${verifyLink}`
//     );

//     res.json({ msg: "Verification email sent" });

//   } catch (err) {
//     console.log("RESEND ERROR 👉", err);
//     res.status(500).json({ msg: "Error resending verification email" });
//   }
// });

// // ================= BLACKLIST TOKEN =================

// router.post("/logout", async (req, res) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");

//     await BlacklistToken.create({ token });

//     res.json({ msg: "Logged out successfully" });

//   } catch (err) {
//     console.log("LOGOUT ERROR 👉", err);
//     res.status(500).json({ msg: "Logout error" });
//   }
// });

// // ================= PROTECTED ROUTE =================
// router.get("/dashboard", authMiddleware, (req, res) => {
//   res.json({ msg: "Welcome to dashboard 🔐", user: req.user });
// });


// module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/authmiddleware");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const BlacklistToken = require("../models/BlacklistToken");
const { getLocationFromIP } = require("../utils/geoService");
const UAParser = require("ua-parser-js");
const { analyzeSecurityEvents } = require("../nlp/securityAnalyzer");
const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:3001").replace(/\/$/, "");
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
// Token generation utilities
const {
  generateAccessToken,
  generateRefreshToken,
  hashToken
} = require("../utils/tokenUtils");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName: typeof fullName === "string" ? fullName.trim() : undefined,
      email,
      password: hashedPassword
    });

    const verifyToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    user.verifyToken = hashedToken;
    user.verifyTokenExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const verifyLink = `${backendUrl}/auth/verify-email/${verifyToken}`;

    await sendEmail(
      user.email,
      "Verify your email",
      `Click this link to verify your email:\n\n${verifyLink}`
    );

    res.json({ msg: "User registered. Please verify your email." });

  } catch (err) {
    console.log("REGISTER ERROR 👉", err);
    res.status(500).json({ msg: "Error registering user" });
  }
});


// ================= LOGIN =================
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     if (!user.isVerified) {
//       return res.status(403).json({ msg: "Please verify your email first" });
//     }

//     if (user.lockUntil && user.lockUntil > Date.now()) {
//       return res.status(403).json({
//         msg: "Account locked. Try again later."
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       user.failedAttempts += 1;

//       if (user.failedAttempts >= 5) {
//         user.lockUntil = Date.now() + 5 * 60 * 1000;

//         await sendEmail(
//           user.email,
//           "🚨 Security Alert",
//           "Your account has been locked due to multiple failed login attempts."
//         );
//       }

//       await user.save();
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // ✅ RESET ON SUCCESS
//     user.failedAttempts = 0;
//     user.lockUntil = null;

//     // 🔥 NEW TOKEN SYSTEM
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken();

//     const hashed = hashToken(refreshToken);

//     // user.refreshTokens.push({
//     //   tokenHash: hashed,
//     //   expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
//     // });
//     const userAgent = req.headers["user-agent"] || "Unknown Device";
//     const ip = req.ip || "Unknown IP";

//     user.sessions.push({
//       tokenHash: hashed,
//       device: userAgent,
//       ip: ip, 
//       expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
//     });

//     await user.save();

//     // 🍪 SEND REFRESH TOKEN IN COOKIE
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });

//     // 📤 SEND ACCESS TOKEN
//     res.json({ accessToken });

//   } catch (err) {
//     console.log("LOGIN ERROR 👉", err);
//     res.status(500).json({ msg: "Login error" });
//   }
// });

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ msg: "Please verify your email first" });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({
        msg: "Account locked. Try again later.",
        lockUntil: user.lockUntil
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // user.failedAttempts += 1;

      // if (user.failedAttempts >= 5) {
      //   user.lockUntil = Date.now() + 5 * 60 * 1000;

      //   await sendEmail(
      //     user.email,
      //     "🚨 Security Alert",
      //     "Your account has been locked due to multiple failed login attempts."
      //   );
      // }

      // // await user.save();
      // return res.status(400).json({ msg: "Invalid credentials" });
      // increment attempts
          await User.updateOne(
            { _id: user._id },
            { $inc: { failedAttempts: 1 } }
          );

          // Get updated user
          const updatedUser = await User.findById(user._id);
          //AI
          await User.updateOne(
            { _id: user._id },
            {
              $push: {
                securityEvents: {
                  type: "FAILED_LOGIN",
                  description: `Failed login attempt from IP ${req.ip || "Unknown IP"}`,
                  ip: req.ip || "Unknown IP"
                }
              }
            }
          );

          // Lock logic
          if (updatedUser.failedAttempts >= 5) {
            const lockUntil = Date.now() + 5 * 60 * 1000;
                    await User.updateOne(
            { _id: user._id },
            {
              $set: {
                lockUntil
              }
            }
          );
           // Record security event
            await User.updateOne(
                { _id: user._id },
                {
                  $push: {
                    securityEvents: {
                      type: "ACCOUNT_LOCKED",
                      description: "Account locked after multiple failed login attempts.",
                      ip: req.ip || "Unknown IP"
                    }
                  }
                }
            );

          analyzeSecurityEvents(await User.findById(user._id).select("securityEvents").then(record => record.securityEvents.slice(-20)))
            .then(({ aiAnalysis, processedData }) => User.updateOne(
              { _id: user._id },
              { $set: { aiSecurityAnalysis: { ...aiAnalysis, analyzedAt: new Date(), eventCount: processedData.totalEvents } } }
            ))
            .catch(error => console.error("Automatic security analysis failed:", error.message));

          sendEmail(user.email, "Security Alert", "Your account has been locked due to multiple failed login attempts.")
            .catch(error => console.error("Lockout alert email failed:", error.message));

          return res.status(403).json({
            msg: "Account locked due to too many attempts",
            lockUntil: lockUntil
          });
        }

        return res.status(400).json({ msg: "Invalid credentials" });


    }

    // Login successful - reset failed attempts
    user.failedAttempts = 0;
    user.lockUntil = null;
    // user.lastLogin = new Date(); // legacy field name kept for reference
    user.lastLoginAt = new Date();
    // Token generation - create refresh token first
    const refreshToken = generateRefreshToken();
    const hashed = hashToken(refreshToken);

    // Filter out expired sessions
    user.sessions = user.sessions.filter(
      s => s.expiresAt > Date.now()
    );

    // Limit sessions to maximum of 3
    while (user.sessions.length >= 3) {
      user.sessions.shift();
    }

    // Device parsing
    const userAgent = req.headers["user-agent"] || "Unknown Device";
    const parser = new UAParser(userAgent);
    const browserName = parser.getBrowser().name || "Unknown";
    const browserVersion = parser.getBrowser().version || "";
    const osName = parser.getOS().name || "Unknown";
    const osVersion = parser.getOS().version || "";
    
    const displayBrowser = browserVersion ? `${browserName} ${browserVersion}` : browserName;
    const displayOS = osVersion ? `${osName} ${osVersion}` : osName;

    // �🌍 Get real IP
    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "Unknown IP";

    // Clean IPv6 format
    if (ip?.includes("::ffff:")) {
      ip = ip.split("::ffff:")[1];
    }

    // Get location from IP
    console.log("IP Detected:", ip);
    const location = await getLocationFromIP(ip);

    // Calculate risk score
    let risk = 0;

    // 📱 New device check
    const knownDevice = user.sessions.find(
      s => s.device === userAgent
    );

    if (!knownDevice) {
      risk += 30;
    }

    // Check for country changes
    const lastSession = user.sessions[user.sessions.length - 1];
    // Detect impossible travel - same user in different countries within 1 hour
    if (lastSession && lastSession.location) {
      const prevTime = new Date(lastSession.createdAt).getTime();
      const currentTime = Date.now();

      const timeDiffMinutes = (currentTime - prevTime) / (1000 * 60);

      const prevCountry = lastSession.location.country;
      const currentCountry = location.country;

      if (
        prevCountry &&
        currentCountry &&
        prevCountry !== currentCountry &&
        timeDiffMinutes < 60 // within 1 hour
      ) {
        risk += 70;

        await sendEmail(
          user.email,
          "Impossible Travel Detected",
          `We detected a suspicious login:

          Previous Location: ${prevCountry}
          New Location: ${currentCountry}
          Time Difference: ${Math.round(timeDiffMinutes)} minutes

          If this wasn't you, secure your account immediately.`
        );
      }
    }

    if (
      lastSession &&
      lastSession.location?.country !== location.country
    ) {
      risk += 50;
    }

    // Check for new IP
    const knownIP = user.sessions.find(
      s => s.ip === ip
    );

    if (!knownIP) {
      risk += 20;
    }

    // Risk scoring complete
    if (risk >= 70) {
      await sendEmail(
        user.email,
        "High Risk Login Detected",
        `High-risk login detected:

        Device: ${userAgent}
        IP: ${ip}
        Location: ${location.region}, ${location.country}`
      );
    }

    // Check if device already exists
    const existingSession = user.sessions.find(
      s => s.device === userAgent && s.ip === ip
    );

    const suspiciousLogin = !existingSession || risk >= 50;
    if (suspiciousLogin) {
      const reasons = [];
      if (!existingSession) reasons.push("new device or IP");
      if (risk >= 50) reasons.push("unusual location or travel risk");
      user.securityEvents.push({
        type: "SUSPICIOUS_LOGIN",
        description: `Successful login flagged for ${reasons.join(" and ")}.`,
        ip,
        device: userAgent,
        location: { country: location.country, region: location.region }
      });
    }

    // Send alert for new device
    if (!existingSession) {
      await sendEmail(
        user.email,
        "New Login Detected",
        `New login detected:

        Device: ${userAgent}
        IP: ${ip}
        Location: ${location.region}, ${location.country}

        If this wasn't you, please secure your account immediately.`
      );
    }

    // Check for suspicious login from different IP
    const suspicious = user.sessions.find(
      s => s.ip !== ip
    );

    if (suspicious) {
      await sendEmail(
        user.email,
        "Suspicious Login Detected",
        `Login from a different IP detected:

        New IP: ${ip}
        Location: ${location.region}, ${location.country}
        Previous IP: ${suspicious.ip}

        If this wasn't you, change your password immediately.`
      );
    }

    // ✅ SAVE SESSION
    // user.sessions.push({
    //   tokenHash: hashed,
    //   device: userAgent,
    //   ip: ip,
    //   location:{
    //     country: location.country,
    //     region: location.region
    //   },
    //   expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    // });

    // await user.save();

      // await User.updateOne(
      //   { _id: user._id },
      //   {
      //     $push: {
      //       sessions: {
      //         tokenHash: hashed,
      //         device: userAgent,
      //         browser: displayBrowser,
      //         os: displayOS,
      //         ip: ip,
      //         location: {
      //           country: location.country,
      //           region: location.region
      //         },
      //         expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
      //       }
      //     }
      //   }
      // );

      // ✅ SAVE NEW SESSION
        user.sessions.push({
          tokenHash: hashed,
          device: userAgent,
          browser: displayBrowser,
          os: displayOS,
          ip: ip,
          location: {
            country: location.country,
            region: location.region
          },
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
        });

        // 💾 SAVE EVERYTHING
        await user.save();

        if (suspiciousLogin) {
          analyzeSecurityEvents(user.securityEvents.slice(-20))
            .then(({ aiAnalysis, processedData }) => User.updateOne(
              { _id: user._id },
              { $set: { aiSecurityAnalysis: { ...aiAnalysis, analyzedAt: new Date(), eventCount: processedData.totalEvents } } }
            ))
            .catch(error => console.error("Automatic security analysis failed:", error.message));
        }

        // ✅ Generate access token WITH sessionId (must be after save so session has _id)
        const sessionId = user.sessions[user.sessions.length - 1]._id;
        const accessToken = generateAccessToken(user, sessionId);

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Return access token
    res.json({ accessToken });

} catch (err) {
  console.log("LOGIN ERROR 👉", err);

  res.status(500).json({
    msg: "Server error"
  });
}
});



// ================= REFRESH TOKEN =================
router.post("/refresh", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ msg: "No refresh token" });
    }

    const hashed = hashToken(token);

    const user = await User.findOne({
      "sessions.tokenHash": hashed,
      "sessions.expiresAt": { $gt: Date.now() }
    });

    if (!user) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    // ✅ Find the session that needs refresh (before any filtering)
    const sessionIndex = user.sessions.findIndex(s => s.tokenHash === hashed);
    if (sessionIndex === -1) {
      return res.status(403).json({ msg: "Session expired or revoked" });
    }

    // ✅ Get sessionId from existing session
    const sessionId = user.sessions[sessionIndex]._id;

// 🔁 GENERATE NEW TOKENS
const newAccessToken = generateAccessToken(user, sessionId);
const newRefreshToken = generateRefreshToken();

const newHashed = hashToken(newRefreshToken);

// // ✅ SAVE NEW TOKEN
// user.refreshTokens.push({
//   tokenHash: newHashed,
//   expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
// });

// const userAgent = req.headers["user-agent"] || "Unknown Device";
const userAgent = req.headers["user-agent"] || "";
const parser = new UAParser(userAgent);
const browserName = parser.getBrowser().name || "Unknown";
const browserVersion = parser.getBrowser().version || "";
const osName = parser.getOS().name || "Unknown";
const osVersion = parser.getOS().version || "";

const displayBrowser = browserVersion ? `${browserName} ${browserVersion}` : browserName;
const displayOS = osVersion ? `${osName} ${osVersion}` : osName;
const ip = req.ip || "Unknown IP";

// ✅ UPDATE existing session (rotate token while preserving session _id)
user.sessions[sessionIndex].tokenHash = newHashed;
user.sessions[sessionIndex].expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

await user.save();

// 🍪 SEND NEW REFRESH TOKEN
res.cookie("refreshToken", newRefreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

// 📤 SEND NEW ACCESS TOKEN
res.json({ accessToken: newAccessToken });

  } catch (err) {
    console.log("REFRESH ERROR 👉", err);
    res.status(500).json({ msg: "Refresh error" });
  }
});


// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetURL = `${frontendUrl}/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Reset Password",
      `Click here to reset your password:\n\n${resetURL}`
    );

    res.json({ msg: "Password reset email sent" });

  } catch (err) {
    console.log("FORGOT ERROR 👉", err);
    res.status(500).json({ msg: "Error sending reset email" });
  }
});


// ================= RESET PASSWORD =================
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    user.sessions = [];
    user.refreshTokens = [];

    await user.save();

    res.json({ msg: "Password reset successful" });

  } catch (err) {
    console.log("RESET ERROR 👉", err);
    res.status(500).json({ msg: "Error resetting password" });
  }
});


// ================= VERIFY EMAIL =================
router.get("/verify-email/:token", async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      verifyToken: hashedToken,
      verifyTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();

    // res.json({ msg: "Email verified successfully" });
    res.redirect(`${frontendUrl}/login?verified=true`);

  } catch (err) {
    console.log("VERIFY ERROR 👉", err);
    res.status(500).json({ msg: "Error verifying email" });
  }
});


// ================= RESEND VERIFY EMAIL =================
router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: "Email already verified" });
    }

    //cool down
    if (user.verifyTokenExpire && user.verifyTokenExpire > Date.now()) {
  return res.status(400).json({ msg: "Please wait before requesting again" });
    }

    const verifyToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    user.verifyToken = hashedToken;
    user.verifyTokenExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const verifyLink = `${backendUrl}/auth/verify-email/${verifyToken}`;

    await sendEmail(user.email, "Verify your email", `Click here to verify your email:\n\n${verifyLink}`);

    res.json({ msg: "Verification email sent" });

  } catch (err) {
    console.log("RESEND ERROR 👉", err);
    res.status(500).json({ msg: "Error resending email" });
  }
});


// ================= LOGOUT =================
router.post("/logout", async (req, res) => {
  try {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if (accessToken) {
      await BlacklistToken.create({ token: accessToken });
    }

    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const hashed = hashToken(refreshToken);

      await User.updateOne(
        // { "refreshTokens.tokenHash": hashed },
        // { $pull: { refreshTokens: { tokenHash: hashed } } }
        { "sessions.tokenHash": hashed },
        { $pull: { sessions: { tokenHash: hashed } } }
      );
    }

    res.clearCookie("refreshToken");

    res.json({ msg: "Logged out successfully" });

  } catch (err) {
    console.log("LOGOUT ERROR 👉", err);
    res.status(500).json({ msg: "Logout error" });
  }
});

// ================= GET ALL SESSIONS =================
router.get("/sessions", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // ✅ Filter out expired sessions
    const activeSessions = user.sessions.filter(s => s.expiresAt > Date.now());

    const sessions = activeSessions.map(s => ({
      id: s._id,
      device: s.device,
      browser: s.browser || "Unknown",
      os: s.os || "Unknown",
      ip: s.ip,
      location: s.location || { country: "Unknown", region: "Unknown" },
      lastActive: s.lastActive,
      createdAt: s.createdAt,
      expiresAt: s.expiresAt
    }));

    res.json({ sessions });

  } catch (err) {
    console.log("SESSIONS ERROR 👉", err);
    res.status(500).json({ msg: "Error fetching sessions" });
  }
});

// ================= LOGOUT ONE DEVICE =================
router.post("/logout-device", authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.body;

    await User.updateOne(
      { _id: req.user.id },
      { $pull: { sessions: { _id: sessionId } } }
    );

    res.json({ msg: "Device logged out successfully" });

  } catch (err) {
    console.log("LOGOUT DEVICE ERROR 👉", err);
    res.status(500).json({ msg: "Error logging out device" });
  }
});


// ================= LOGOUT ALL DEVICES =================
router.post("/logout-all", authMiddleware, async (req, res) => {
  try {

    await User.updateOne(
      { _id: req.user.id },
      { $set: { sessions: [] } }
    );

    res.clearCookie("refreshToken");

    res.json({
      msg: "All devices logged out successfully"
    });

  } catch (err) {
    console.log("LOGOUT ALL ERROR 👉", err);

    res.status(500).json({
      msg: "Error logging out all devices"
    });
  }
});


// ================= PROTECTED =================
router.get("/dashboard", authMiddleware, async (req, res) => {
  try{
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    let accountStatus = "Secure";

    if (user.lockUntil && user.lockUntil > Date.now()) {
      accountStatus = "Locked";
    } else if (user.failedAttempts > 0) {
      accountStatus = "Warning";
    }

  res.json({
    activeSessions: user.sessions.length,
    failedAttempts: user.failedAttempts,
    lastLoginAt: user.lastLoginAt,
    accountStatus
  });
} catch (err) {
  console.log("DASHBOARD ERROR 👉", err);
  res.status(500).json({ msg: "Error fetching dashboard data" });
}

  // res.json({ msg: "Welcome to dashboard 🔐", user: req.user });
});

module.exports = router;
