# 🚀 Installation Guide

This guide walks through every step required to run **Blindly** locally and deploy it to production.

---

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | ≥ 18 | [Download](https://nodejs.org/) |
| npm | ≥ 9 | Bundled with Node.js |
| Firebase CLI | ≥ 13 | `npm install -g firebase-tools` |
| Git | Any | For cloning the repository |
| Firebase Account | — | Free Spark plan is sufficient |

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/Kaelith69/blindly.git
cd blindly
```

---

## Step 2 — Install Dependencies

```bash
npm install
```

This installs all runtime and development dependencies defined in `package.json`:

**Runtime dependencies:**
- `firebase` ^11.3.0 — Auth & Firestore SDK
- `framer-motion` ^12.x — Animation engine
- `lucide-react` ^0.474.0 — Icon set
- `react` ^19.0.0 — UI framework
- `react-dom` ^19.0.0 — DOM renderer
- `react-router-dom` ^7.1.0 — Client-side router

**Dev dependencies:**
- `vite` ^6.1.0 — Build tool
- `@vitejs/plugin-react` ^4.3.0 — JSX transform
- `firebase-admin` ^13.x — Used only by `scripts/seed-profiles.mjs`
- `gh-pages` ^6.x — GitHub Pages deployment

---

## Step 3 — Firebase Project Setup

### 3.1 Create a Firebase Project

1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click **"Add project"** and follow the setup wizard.
3. Disable Google Analytics if not needed.

### 3.2 Enable Authentication

1. In Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Phone** (requires app verification setup for production)

### 3.3 Enable Firestore

1. In Firebase Console → **Firestore Database** → **Create database**
2. Start in **test mode** initially (you will deploy proper rules in Step 5).
3. Choose a region close to your users.

### 3.4 Register a Web App

1. In Firebase Console → Project Settings → **Your apps** → **Add app** → Web
2. Give the app a nickname (e.g., "blindly-web")
3. Copy the `firebaseConfig` object provided.

---

## Step 4 — Configure Firebase in the Project

Edit `src/firebase.js` and replace the config with your project's values:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
}
```

> ⚠️ **Security note**: These Firebase Web API keys are designed to be public-facing. They are scoped by Firebase Security Rules, not kept secret. Do not store backend service account keys in the frontend.

---

## Step 5 — Deploy Firestore Security Rules

### 5.1 Log in to Firebase CLI

```bash
firebase login
```

### 5.2 Set the active project

```bash
firebase use --add
# Select your project from the list
```

Or edit `.firebaserc` manually:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### 5.3 Deploy rules

```bash
firebase deploy --only firestore:rules
```

This deploys `firestore.rules` to your project, enforcing server-side authorization.

---

## Step 6 — Run the Development Server

```bash
npm run dev
```

Vite will start a local dev server, typically at `http://localhost:5173`, with hot module replacement (HMR) enabled.

---

## Step 7 — (Optional) Seed Test Profiles

The `scripts/seed-profiles.mjs` script populates your Firestore with sample user profiles for testing the swipe deck.

### Requirements

- You need a **Firebase service account key** (JSON). Download from:
  Firebase Console → Project Settings → Service Accounts → **Generate new private key**
- Set the environment variable:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
```

### Run the seed script

```bash
node scripts/seed-profiles.mjs
```

> ⚠️ Only run this against a **development** Firebase project, never production.

---

## Production Build

```bash
# Build optimized static files into dist/
npm run build

# Preview the production build locally
npm run preview
```

---

## Deploy to GitHub Pages

The project is pre-configured for GitHub Pages deployment:

```bash
npm run deploy
```

This runs `npm run build` (via `predeploy` hook) then publishes `dist/` to the `gh-pages` branch using `gh-pages`.

> **Note**: Update the `base` field in `vite.config.js` if your repo name differs from the path you are deploying to:
> ```javascript
> export default defineConfig({
>   base: '/your-repo-name/',
>   plugins: [react()]
> })
> ```

---

## Environment Reference

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start local dev server with HMR |
| `build` | `vite build` | Production build into `dist/` |
| `preview` | `vite preview` | Preview production build locally |
| `predeploy` | `npm run build` | Auto-runs before deploy |
| `deploy` | `gh-pages -d dist` | Publish to GitHub Pages |

---

*Back to [Home](Home.md)*
