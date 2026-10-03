# Secure Auth AI

Secure Auth AI is an authentication and account-security application with an NLP/LLM feature that analyzes meaningful security events. It uses React, Node.js, Express, MongoDB, JWT sessions, NLP preprocessing, and the Gemini API.

## Security features

- Password hashing, JWT access tokens, refresh token rotation, and embedded session management
- Failed-login tracking and temporary account lockout
- Email verification and password reset
- Security events for failed logins, lockouts, and suspicious logins
- Device, IP, and location signals for suspicious-login detection
- Session revocation and logout

## NLP security analysis

Authentication events are stored as structured MongoDB objects. The preprocessing layer converts those objects into a compact event summary and text for the prompt in `prompts/threat-analysis.txt`. Gemini returns structured JSON with a threat type, severity, summary, evidence, and recommendations. Automatic analysis runs asynchronously for account lockouts and suspicious logins; normal known-device logins do not trigger Gemini. Users can also request an analysis of their own recent events from Security Logs.

The Gemini key stays on the backend. `POST /api/security/analyze` requires the existing JWT and only reads the authenticated user's events.

## Requirements

- Node.js and npm
- MongoDB connection string
- Gemini API key for LLM analysis
- SMTP credentials for email flows

## Setup

1. Install backend dependencies from `secure-auth-system`:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` in `secure-auth-system` and fill in the values. Do not commit `.env`.

3. Install frontend dependencies:

   ```bash
   cd secure-auth-frontend
   npm install
   ```

4. Copy `secure-auth-frontend/.env.example` to `secure-auth-frontend/.env` if the API URL differs from `http://localhost:3000`.

5. Start the backend from `secure-auth-system`:

   ```bash
   node index.js
   ```

6. In another terminal, start CRA from `secure-auth-system/secure-auth-frontend`:

   ```bash
   npm start
   ```

Set `FRONTEND_URL` to the browser-facing frontend origin and `BACKEND_URL` to the backend origin. Verification email links use the backend verification endpoint; successful verification redirects to the frontend login page. Password reset links use the frontend reset page.

## Environment variables

See `.env.example` for the backend variable names: `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `FRONTEND_URL`, `BACKEND_URL`, `EMAIL_USER`, `EMAIL_PASS`, and optional `IPINFO_TOKEN`. Never put credentials in frontend variables. The frontend only needs `REACT_APP_API_URL`.

## API highlights

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/auth/register` | Register and send verification email |
| POST | `/auth/login` | Authenticate and create a session |
| GET | `/auth/verify-email/:token` | Verify email |
| POST | `/auth/forgot-password` | Send password reset email |
| POST | `/auth/reset-password/:token` | Reset password and revoke sessions |
| POST | `/auth/refresh` | Rotate refresh token |
| POST | `/auth/logout` | Revoke current session |
| POST | `/api/security/analyze` | Analyze the authenticated user's recent security events |

## Verification status for existing users

An absent `isVerified` value continues to behave as unverified. The application does not modify existing user records automatically. Legacy users must complete verification using the resend-verification flow or receive a deliberate, reviewed migration outside this application.
