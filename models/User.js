// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// // Hash password before saving
// // userSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();

// //   this.password = await bcrypt.hash(this.password, 10);
// //   next();
// // });
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// // ✅ WORKING HASHING (TESTED)
// // userSchema.pre("save", async function (next) {
// //   try {
// //     if (!this.isModified("password")) return next();

// //     const hashed = await bcrypt.hash(this.password, 10);
// //     this.password = hashed;
// //     next();
// //   } catch (err) {
// //     next(err);
// //   }
// // });

// module.exports = mongoose.model("User", userSchema);

const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  failedAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  },

  // lastLoginAt must exist at the user level so the dashboard can show the
  // user's most recent successful login across all sessions.
  // Storing this timestamp inside a session object is incorrect because the
  // dashboard metric is global to the user, not tied to one specific session.
  lastLoginAt: {
    type: Date,
    default: null
  },

  resetToken: {
    type: String
  },
  resetTokenExpire: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },

  verifyToken: {
    type: String
  },
  verifyTokenExpire: {
    type: Date
  },
  refreshTokens: [{
    tokenHash: String,
    expiresAt: Date,
  }],

  securityEvents: [
    {
      type: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      ip: String,
      device: String,
      location: {
        country: String,
        region: String
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],

  aiSecurityAnalysis: {
    threatType: String,
    severity: String,
    summary: String,
    evidence: [String],
    recommendations: [String],
    analyzedAt: Date,
    eventCount: Number
  },

  sessions: [
  {
    tokenHash: String,
    device: String,
    browser: String,
    os: String,
    ip: String,

    location: {
    ip: String,
    country: String,
    region: String,
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: Date,
  }],

});

module.exports = mongoose.model("User", UserSchema);
