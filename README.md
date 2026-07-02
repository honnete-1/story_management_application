# Story Manager — Story Management App

![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![React_Query](https://img.shields.io/badge/React_Query-5-red) ![Express](https://img.shields.io/badge/Express-Backend-green) ![JWT](https://img.shields.io/badge/Auth-JWT-black)

Story Manager is a full-stack CRUD application for creating, browsing, editing, and deleting short stories, secured with real user authentication — including email verification via OTP, JWT access + refresh tokens, and password reset — built on top of a live REST API.

**Live Demo:** https://story-management-application-three.vercel.app/

---

## Table of Contents

- [Features](#features)
- [APIs Used](#apis-used)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Setup](#local-setup)
- [Authentication Flow](#authentication-flow)
- [Notes](#notes)

---

## Features

- Browse all stories, view story details, add, edit, and delete stories
- User registration with email verification (OTP sent to email)
- Login with JWT access + refresh token pair
- Forgot password / reset password flow via OTP
- Persistent sessions — refreshing the page keeps you logged in
- Auth-aware navbar that reflects login state in real time via Context API
- Loading and error states on every page — no blank screens on failed requests

## APIs Used

All authentication and story data comes from a live Express REST API deployed on Railway:

- `POST /api/auth/register` — create an account, sends OTP
- `POST /api/auth/verify-email` — activate account with OTP
- `POST /api/auth/resend-verification` — resend OTP
- `POST /api/auth/login` — returns access + refresh token
- `POST /api/auth/refresh-token` — rotate tokens
- `POST /api/auth/logout` — revoke refresh token
- `POST /api/auth/forgot-password` / `POST /api/auth/reset-password` — password recovery
- `GET/POST/PUT/DELETE /api/stories` — story CRUD

Full interactive docs: `https://sms-express-app-1-production-a843.up.railway.app/api-docs/`

## Tech Stack

- **Frontend:** React 18, Vite, React Router
- **Data fetching:** TanStack React Query (`useQuery` / `useMutation`)
- **State management:** React Context API (authentication state)
- **HTTP client:** Axios
- **Backend:** Express REST API with JWT-based auth (deployed separately on Railway)
- **Deployment:** Vercel

## Project Structure

```
src
├── components
│   └── Navbar.jsx          # Auth-aware navigation
├── context
│   └── AuthContext.jsx     # Token, refresh token, role, login/logout
├── pages
│   ├── StoryList.jsx       # Read all + Delete
│   ├── AddStory.jsx        # Create
│   ├── StoryDetails.jsx    # Read one
│   ├── EditStory.jsx       # Update
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── VerifyEmail.jsx
│   ├── ForgotPassword.jsx
│   └── ResetPassword.jsx
├── services
│   ├── storyService.js     # Story CRUD requests
│   └── authService.js      # Auth requests
├── App.jsx                 # Routes + Navbar
├── main.jsx                # React + Router + React Query + AuthProvider bootstrap
└── index.css
```

## Local Setup

```bash
npm install
npm run dev
```

Starts a local dev server (default: http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Authentication Flow

```
Register (email + password)
      ↓
Account created (unverified), OTP emailed
      ↓
Verify Email (enter OTP)
      ↓
Account activated
      ↓
Login → access token (15 min) + refresh token (7 days) issued
      ↓
Tokens stored via AuthContext (persisted in localStorage)
      ↓
Navbar and all pages reflect the logged-in state instantly
      ↓
Logout → refresh token revoked server-side, local session cleared
```

## Notes

- Access tokens expire after 15 minutes; refresh-token rotation is available via `/api/auth/refresh-token` but not yet wired into an automatic interceptor.
- Failed requests show clear error messages (e.g. wrong password, unverified email, expired OTP) rather than generic failures.
