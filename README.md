<!-- # 🔐 Secure Authentication System

A secure authentication system built using Node.js, Express, and MongoDB with advanced cybersecurity features.

## Project overview

Secure Auth AI is a security-focused authentication system designed to demonstrate modern authentication, session security, suspicious-login detection, and AI-assisted security event analysis.

The system combines traditional authentication controls with an NLP/LLM layer that helps interpret security events and present potential threats through the Security Logs interface.

---

## 🚀 Features

- User Registration & Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Brute Force Protection (Rate Limiting)
- Login Attempt Logging

---

## 🛡️ Security Features

- Prevents brute-force attacks
- Secure password storage using bcrypt
- Token-based authentication using JWT
- Environment variable protection (.env)

---

## 🧪 API Endpoints

### 🧾 Register
POST /auth/register

### 🔐 Login
POST /auth/login

### 🔒 Protected Route
GET /auth/dashboard

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- bcrypt
- express-rate-limit

---

## 📌 How to Run

```bash
npm install
node index.js

## 📌 How to Run

```bash
npm install
node index.js
```

---

## 📷 Demo Screenshots

### 🧾 User Registration

![Register](https://github.com/VanshMt/Secure-Authentication-System-with-Brute-Force-Protection/blob/master/User-registration.png)

### 🔐 User Login (JWT Token)

![Login](https://github.com/VanshMt/Secure-Authentication-System-with-Brute-Force-Protection/blob/master/User-Login.png)

### 🛡️ Brute Force Protection

![Rate Limit](https://github.com/VanshMt/Secure-Authentication-System-with-Brute-Force-Protection/blob/master/Rate-Limiter.png) -->

<!-- # 🔐 Secure Authentication System with Brute Force Protection

A production-ready authentication system built using Node.js, Express, and MongoDB with advanced security features like JWT authentication, account lockout, rate limiting, and email alerts for suspicious activity.

---

## 🚀 Key Highlights

* 🔐 JWT-based authentication system
* 🛡️ Brute-force attack protection (account lockout)
* ⏱️ Rate limiting to prevent abuse
* 🔒 Secure password hashing using bcrypt
* 📧 Email alerts on suspicious login attempts
* 🧠 Login attempt tracking & logging

---

## 💡 Why This Project?

This project demonstrates real-world cybersecurity practices used in modern backend systems to protect user accounts from unauthorized access and attacks.

---

## ⚙️ How It Works

1. User registers → password is hashed using bcrypt
2. User logs in → credentials verified
3. JWT token is generated for authentication
4. Failed login attempts are tracked
5. After 5 failed attempts → account is locked
6. Email alert is sent to user
7. Protected routes require valid JWT token

---

## 🛡️ Security Features

* 🔒 Password hashing (bcrypt)
* 🚫 Brute-force protection (account lock system)
* ⏳ Rate limiting (prevents spam attacks)
* 🔑 JWT authentication
* 📧 Email alerts for suspicious activity
* 🔐 Environment variable protection (.env)

---

## 🧪 API Endpoints

### 📄 Register

POST /auth/register

### 🔐 Login

POST /auth/login

### 🔒 Protected Route

GET /auth/dashboard

---

## 📷 Demo Screenshots

### 🧾 User Registration

![Register](./screenshots/User-registration.png)

### 🔐 User Login (JWT Token)

![Login](./screenshots/User-Login.png)

### 🛡️ Brute Force Protection

![Rate Limit](./screenshots/Rate-Limiter.png)

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB
* JWT
* bcrypt
* express-rate-limit
* Nodemailer

---

## 📁 Project Structure

secure-auth-system/
│── models/
│── routes/
│── middleware/
│── utils/
│── screenshots/
│── .env
│── index.js

---

## 📌 How to Run

```bash
npm install
node index.js
```

---

## 💼 Resume Highlight

Built a secure authentication system using Node.js, Express, and MongoDB implementing JWT-based authentication, password hashing, brute-force protection with account lockout, rate limiting, and real-time email alerts for suspicious login attempts.

--- -->

<!-- # 🔐 Secure Authentication System with Risk-Based Security & Geo Tracking

A production-ready authentication system built using Node.js, Express, and MongoDB with advanced security features like JWT authentication, brute-force protection, geo-location tracking, and intelligent risk-based login detection.

---

## 🚀 Key Highlights

* 🔐 JWT-based authentication (Access + Refresh Tokens)
* 🛡️ Brute-force protection (account lockout)
* ⏱️ Rate limiting to prevent abuse
* 🔒 Secure password hashing using bcrypt
* 📧 Email alerts for suspicious login attempts
* 🌍 Geo-location tracking (IP → Country & Region)
* 📱 Multi-device session management
* 🧠 Risk-based login detection
* ✈️ Impossible travel detection (🔥 advanced feature)

---

## 💡 Why This Project?

This project demonstrates **real-world cybersecurity practices** used in modern backend systems, including behavior-based authentication similar to systems used by Google and other large platforms.

---

## 🧠 How It Works

1. User registers → password is securely hashed
2. User logs in → credentials verified
3. System captures:
   - IP address
   - Device (user-agent)
   - Geo-location
4. Risk score is calculated based on:
   - New device
   - New IP
   - Country change
   - Impossible travel
5. If risk is high:
   - Email alert is triggered
6. Session is stored with location & device details
7. JWT token is issued for authentication

---

## 🛡️ Security Features

* 🔒 Password hashing (bcrypt)
* 🚫 Brute-force protection (account lock system)
* ⏳ Rate limiting (prevents spam attacks)
* 🔑 JWT authentication (Access + Refresh tokens)
* 📧 Email alerts for suspicious activity
* 🌍 Geo-location tracking per session
* 📱 Device & IP tracking
* 🚨 Risk-based anomaly detection
* ✈️ Impossible travel detection
* 🔐 Environment variable protection (.env)

---

## 🧪 API Endpoints

### 📄 Register

POST /auth/register

### 🔐 Login

POST /auth/login


### 🔄 Refresh Token
POST /auth/refresh


### 🚪 Logout
POST /auth/logout


### 📱 Get Sessions
GET /auth/sessions


### ❌ Logout Specific Device
POST /auth/logout-device


---

## 📷 Demo Screenshots

### 🧾 User Registration
![Register](./screenshots/User-registration.png)

### 🔐 User Login (JWT Token)
![Login](./screenshots/User-Login.png)

### 🛡️ Brute Force Protection
![Rate Limit](./screenshots/Rate-Limiter.png)

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcrypt
* express-rate-limit
* Nodemailer
* IPinfo API

---

## 📁 Project Structure
secure-auth-system/
│
├── models/
├── routes/
├── middleware/
├── utils/
├── screenshots/
├── .env
├── index.js
├── package.json

---

## ⚙️ Setup Instructions

```bash
git clone <your-repo-url>
cd secure-auth-system
npm install

Create .env file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
IPINFO_TOKEN=your_token
EMAIL_USER=your_email
EMAIL_PASS=your_password

▶️ Run the Project
node index.js


---

# 🛠️ WHAT CHANGED 

### 🔥 Added:
- Geo-location tracking 🌍  
- Risk scoring 🧠  
- Impossible travel ✈️  
- Session management 📱  

### 🔥 Improved:
- Structure  
- Readability  
- Professional tone  
- Recruiter appeal  

---

# 🚀 NEXT STEP 

In terminal:

```bash
git add README.md
git commit -m "Upgraded README with advanced security features"
git push -->
<!-- ![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Security](https://img.shields.io/badge/Security-Advanced-red)

# 🔐 Secure Authentication System  
### 🚀 Risk-Based Security • Geo Tracking • Session Management

A production-grade backend authentication system with **advanced cybersecurity features** like geo-location tracking, risk-based login detection, and impossible travel analysis.

---
---

## 🚀 Features

### 🔐 Authentication
- JWT-based login system
- Access + Refresh Tokens
- Protected routes

### 🛡️ Security
- Brute-force protection
- Account lockout
- Rate limiting

### 🌍 Geo Intelligence
- IP → Location tracking
- Country-based detection

### 📱 Sessions
- Multi-device tracking
- Max 3 sessions
- Device + IP storage

### 🚨 Advanced Detection
- Risk scoring system
- Suspicious login alerts
- Impossible travel detection ✈️

---

#### 🧠 Risk-Based Authentication
- Risk score calculated on login based on:
  - New device
  - New IP
  - Country change

#### ✈️ Impossible Travel Detection
- Detects logins from different countries in unrealistic time
- Example:
  - India → USA in 5 minutes = 🚨 flagged

#### 📧 Smart Alerts
- New device alert
- Suspicious login alert
- High-risk login alert

---

## 🧠 System Flow

```text
User Login
   ↓
Capture:
- IP
- Device
- Location
   ↓
Compare with previous sessions
   ↓
Calculate Risk Score
   ↓
If high risk:
   → Send alert / trigger verification
   ↓
Create session
   ↓
Return JWT tokens
```
---

```md
## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint       |   Description        |
|--------|----------------|----------------------|
| POST   | /auth/register | Register user        |
| POST   | /auth/login    | Login user           |
| POST   | /auth/refresh  | Refresh token        |
| POST   | /auth/logout   | Logout user          |
```
---

#### 🛡️ Security

| Method | Endpoint            | Description                 |
|--------|--------------------|-----------------------------|
| GET    | /auth/sessions     | Get active sessions         |
| POST   | /auth/logout-device| Logout from specific device |

---

#### 🧪 Test Cases

| Scenario            | Expected Result     |
|---------------------|--------------------|
| Same device + IP    | Low risk           |
| New device          | Medium risk        |
| New country         | High risk          |
| Impossible travel   | 🚨 Alert triggered |


---

## 🚨 Advanced Security Highlights

- 🧠 Risk-Based Authentication (like Google)
- 🌍 Geo-location tracking per login
- ✈️ Impossible travel detection
- 📧 Smart alert system
- 📱 Device & session tracking

---

## 📷 Demo Screenshots

### 🧾 User Registration
![Register](./screenshots/User-registration.png)

### 🔐 User Login (JWT Token)
![Login](./screenshots/User-Login.png)

### 🛡️ Brute Force Protection
![Rate Limit](./screenshots/Rate-Limiter.png)

---

## ⚙️ Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt
- express-rate-limit
- Nodemailer
- IPinfo API
- crypto (for hashing tokens)

---


#### 📁 Project Structure
secure-auth-system/
│
├── models/
│   ├── User.js
│   └── BlacklistToken.js
│
├── routes/
│   └── auth.js
│
├── middleware/
│   └── authMiddleware.js
│
├── utils/
│   ├── geoService.js
│   ├── sendEmail.js
│   └── tokenUtils.js
│
├── screenshots/
├── index.js
├── package.json
├── .gitignore

---


### ⚙️ Setup Instructions

## 1️⃣ Clone Repository
- git clone https://github.com/Vansh1320/Secure-Authentication-System-with-Brute-Force-Protection
- cd secure-auth-system

## 2️⃣ Install Dependencies
- npm install

## 3️⃣ Create .env File
- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_secret
- IPINFO_TOKEN=your_token
- EMAIL_USER=your_email
- EMAIL_PASS=your_password

## 4️⃣ Run Server
- node index.js

---

 
#### 🔐 Security Notes
- Passwords are hashed using bcrypt
- Tokens are securely generated and stored
- Sensitive data is protected using environment variables
- System defends against brute-force and replay attacks

---


#### ⚠️ Limitations
- Geo-location accuracy depends on IP
- Localhost testing may show "Unknown" location
- Requires email setup for alerts

---

#### 🚀 Future Improvements
- OTP verification for high-risk login
- Frontend dashboard (React)
- Global logout (all devices)
- AI-based anomaly detection
- Device fingerprinting

---

#### 🏆 Resume Highlight

Built a production-grade authentication system with Node.js, Express, and MongoDB implementing JWT authentication, brute-force protection, geo-location tracking, multi-device session management, and advanced risk-based login detection including impossible travel analysis.

---

## 👨‍💻 Author
 
Built by **Vansh** 🚀
---

# 🏆 THIS README DOES:

- ✅ Explains system clearly  
- ✅ Shows advanced features  
- ✅ Looks professional  
- ✅ Impresses recruiters  
- ✅ Easy to understand  

---

# 🚀 NOW DO THIS

```bash
git add README.md
git commit -m "Added full professional README"
git push -->


# 🔐 Secure Authentication & Session Management Platform

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Security](https://img.shields.io/badge/Security-Advanced-red)

A full-stack authentication and account security platform built with **React, Node.js, Express, MongoDB, and JWT**.

This project goes beyond basic authentication by implementing **multi-device session management, brute-force protection, risk-based login detection, geo-location monitoring, suspicious login alerts, and advanced account security controls** commonly found in production-grade applications.

---

# 🚀 Highlights

* JWT Authentication with Refresh Token Rotation
* Email Verification System
* Password Reset via Email
* Brute Force Protection & Account Lockout
* Multi-Device Session Management
* Active Session Monitoring Dashboard
* Individual Device Revocation
* Revoke All Sessions
* Browser & Operating System Detection
* IP & Location Tracking
* Risk-Based Login Detection
* Suspicious Login Alerts
* Impossible Travel Detection
* Security Monitoring Dashboard

---

# 🛡️ Security Features

## Authentication

* Secure User Registration
* User Login & Logout
* JWT Access Tokens
* Refresh Token Rotation
* Protected Routes
* Session-Based Authentication

## Account Protection

* Password Hashing with bcrypt
* Account Lockout After Multiple Failed Attempts
* Failed Login Tracking
* Email Verification
* Password Reset Workflow
* Secure Environment Variables

## Session Management

* Multi-Device Login Support
* Session Persistence
* Session Expiration Handling
* Active Session Tracking
* Individual Device Revocation
* Revoke All Sessions
* Session-Aware JWT Validation

## Device Intelligence

* Browser Detection
* Operating System Detection
* Device Tracking
* IP Address Monitoring
* Login Location Tracking
* New Device Detection

## Risk Monitoring

* Risk Score Calculation
* Suspicious Login Detection
* Impossible Travel Detection
* Security Alert Emails
* Session Activity Monitoring

---

# 🧠 How It Works

```text
User Login
    │
    ▼
Capture:
- IP Address
- Browser
- Device
- Location
    │
    ▼
Compare With Previous Sessions
    │
    ▼
Calculate Risk Score
    │
    ├── New Device
    ├── New IP
    ├── Country Change
    └── Travel Analysis
    │
    ▼
Determine Risk Level
    │
    ├── Low Risk → Login
    ├── Medium Risk → Alert
    └── High Risk → Security Alert
    │
    ▼
Create Session
    │
    ▼
Issue JWT Tokens
```

---

# 📱 Session Management Flow

```text
Login From Device
      │
      ▼
Create Session
      │
      ▼
Store:
- Device
- Browser
- OS
- IP
- Location
      │
      ▼
Display In Dashboard
      │
      ├── Revoke Device
      └── Revoke All Sessions
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| POST   | /auth/register        | Register User          |
| POST   | /auth/login           | Login User             |
| POST   | /auth/verify-email    | Verify Email           |
| POST   | /auth/forgot-password | Request Password Reset |
| POST   | /auth/reset-password  | Reset Password         |
| POST   | /auth/refresh         | Refresh Access Token   |
| POST   | /auth/logout          | Logout Current Session |

---

## Session Management

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | /auth/sessions      | Get Active Sessions    |
| POST   | /auth/logout-device | Revoke Specific Device |
| POST   | /auth/logout-all    | Revoke All Sessions    |

---

## Protected Routes

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | /auth/dashboard | Protected Dashboard |

---

# 🧪 Security Test Cases

| Scenario               | Expected Result  |
| ---------------------- | ---------------- |
| Same Device + Same IP  | Low Risk         |
| New Device             | Medium Risk      |
| New IP Address         | Medium Risk      |
| New Country            | High Risk        |
| Multiple Failed Logins | Account Lock     |
| Revoked Session        | 401 Unauthorized |
| Impossible Travel      | Security Alert   |

---

# 📷 Screenshots

## User Registration

![Register](https://github.com/VanshMt/Secure-Authentication-System-with-Brute-Force-Protection/blob/master/User-registration.png)

## User Login

![Login](https://github.com/VanshMt/Secure-Authentication-System-with-Brute-Force-Protection/blob/master/User-Login.png)

## Brute Force Protection

![Rate Limit](https://github.com/VanshMt/Secure-Authentication-System-with-Brute-Force-Protection/blob/master/Rate-Limiter.png)

## Security Dashboard

![User-registration_UI](https://github.com/VanshMt/Secure-Authentication-System-with-Brute-Force-Protection/blob/master/User-registration_UI.png)

<!-- ## Session Management

*Add session management screenshot here* -->

---

# ⚙️ Tech Stack

## Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React
* Stitch AI (UI Design & Prototyping)

## Backend

* Node.js
* Express.js
* JWT
* bcrypt
* cookie-parser

### AI / NLP

* Google Gemini API
* NLP preprocessing
* Structured threat analysis

## Database

* MongoDB
* Mongoose

## Security & Utilities

* Nodemailer
* Crypto
* UA Parser JS

---
# 🎨 Frontend Design

The frontend interface was initially designed and prototyped using Stitch AI to accelerate UI development and layout planning.

The authentication workflows, dashboard integration, API communication, session management features, and security-related functionality were subsequently integrated, customized, and extended within the React application.
---
# 📁 Project Structure

<!-- ```text
secure-auth-system/
│
├── secure-auth-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── BlacklistToken.js
│
├── routes/
│   └── auth.js
│
├── utils/
│   ├── geoService.js
│   ├── sendEmail.js
│   └── tokenUtils.js
│
├── screenshots/
├── .env
├── index.js
└── package.json
``` -->

```text
secure-auth-system/
│
├── secure-auth-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── dashboard/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── LLM/
│   └── llmClient.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── BlacklistToken.js
│
├── nlp/
│   └── securityAnalyzer.js
│
├── prompts/
│   └── threat-analysis.txt
│
├── routes/
│   └── auth.js
│
├── utils/
│   ├── geoService.js
│   ├── sendEmail.js
│   └── tokenUtils.js
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── project-structure.txt
├── test-llm.js
└── test-nlp.js
---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/VanshMt/Secure-Authentication-System-with-Brute-Force-Protection.git
```

## Backend Setup

```bash
npm install
node index.js
```

## Frontend Setup

```bash
cd secure-auth-frontend
npm install
npm start
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:3001

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

GEMINI_API_KEY=your_gemini_api_key
```

## Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3000
```
---
## Testing and verification

The project was verified through:

- Backend startup and health checks
- MongoDB connectivity
- Frontend production build
- JWT authentication and protected-route checks
- NLP preprocessing tests
- Gemini API integration tests
- Security event analysis
- Session management and revocation
- Password reset and email verification flows
- Account lockout and failed-login handling

The frontend was also manually tested for the main authentication and security-management flows.
---
---

# 🚀 Future Improvements

* Two-Factor Authentication (2FA)
* Google OAuth Authentication
* GitHub OAuth Authentication
* Admin Monitoring Dashboard
* Device Fingerprinting
* Adaptive Authentication Policies

---

# 🏆 Resume Highlight

Built a production-grade authentication and session management platform using React, Node.js, Express, MongoDB, and JWT. Implemented multi-device session management, brute-force protection, account lockout mechanisms, email verification, password reset workflows, risk-based login detection, geo-location monitoring, suspicious login alerts, and advanced session revocation controls.

---

# 🙌 Acknowledgements

- Stitch AI for assisting with UI design and layout prototyping.
- React, Express, MongoDB, and other open-source tools used throughout development.

---

# 👨‍💻 Author

**Vansh Mathur**

Cybersecurity-focused authentication project demonstrating secure authentication workflows, device-aware session management, risk-based login monitoring, and modern account protection mechanisms.

---
