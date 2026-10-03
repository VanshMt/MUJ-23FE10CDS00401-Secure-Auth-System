// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//     const token = req.header("Authorization");

//     if (!token) {
//         return res.status(401).json({ msg: "No token, authorization denied" });
//     }

//     try {
//         const decoded = jwt.verify(token, "secretkey");
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ msg: "Token is not valid" });
//     }
// };

// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ msg: "No token, access denied" });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid token" });
//   }
// };

// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ msg: "No token, access denied" });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid token" });
//   }
// };


// const jwt = require("jsonwebtoken");
// const BlacklistToken = require("../models/BlacklistToken");

// module.exports = async function (req, res, next) {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ msg: "No token, access denied" });
//   }

//   try {
//     // 🔥 Extract token (remove "Bearer ")
//     const token = authHeader.split(" ")[1];

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;

//     next();
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid token" });
//   }

// // Black List token
//   const isBlacklisted = await BlacklistToken.findOne({ token });

// if (isBlacklisted) {
//   return res.status(401).json({ msg: "Token is invalid (logged out)" });
// }

// };

const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/BlacklistToken");
const User = require("../models/User");


module.exports = async function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    // Extract token
    const token = authHeader.split(" ")[1];

    // Check blacklist first
    const isBlacklisted = await BlacklistToken.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({ msg: "Token is invalid (logged out)" });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // Verify session still exists
    const user = await User.findById(verified.id);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const sessionExists = user.sessions.some(
      s => s._id.toString() === verified.sessionId
    );

    if (!sessionExists) {
      return res.status(401).json({ msg: "Session expired or revoked" });
    }

    next();

  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};
