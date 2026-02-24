# 🚀 Installation Guide

> Setting up Blindly locally takes about 10 minutes. Unless you've never set up a Firebase project before, in which case: welcome, and may your patience be infinite.

---

## Prerequisites

Before you begin, make sure you have:

| Requirement | Version | Why |
|---|---|---|
| Node.js | 18+ | Vite 6 requires it |
| npm | 9+ | Comes with Node 18 |
| Git | Any | You know why |
| A Firebase account | Free tier is fine | It powers everything |
| A terminal | Any | Please stop using the file manager |

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

This installs React, Vite, Firebase SDK, Framer Motion, React Router DOM, and Lucide React. It does not install anything that phones home, collects analytics, or suggests you upgrade to the Pro tier.

---

## Step 3 — Set Up Firebase

### 3a. Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com/)
2. Click **Add project**
3. Name it something meaningful (or `blindly-dev`, your call)
4. Disable Google Analytics — you don't need it and it's noise

### 3b. Enable Authentication

1. In your project, go to **Build → Authentication**
2. Click **Get started**
3. Enable **Email/Password** under "Sign-in providers"
4. Enable **Phone** if you want SMS/OTP support (requires Blaze plan for production volume)

### 3c. Enable Cloud Firestore

1. Go to **Build → Firestore Database**
2. Click **Create database**
3. Choose **Production mode** — we'll deploy proper rules next
4. Select a region close to your users

### 3d. Get Your Firebase Config

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to "Your apps" and click the `</>` (Web) icon
3. Register the app with any nickname
4. Copy the `firebaseConfig` object

### 3e. Update `src/firebase.js`

Open `src/firebase.js` and replace the config:

```js
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

> **Note:** Firebase API keys are safe to include in client-side code. Security is enforced by Firestore rules and Firebase Auth, not by keeping the API key secret. This is by design.

---

## Step 4 — Install Firebase CLI

If you haven't already:

```bash
npm install -g firebase-tools
firebase login
```

---

## Step 5 — Deploy Firestore Security Rules

This step is critical. Without proper rules, your database is either wide open or completely locked.

```bash
firebase use --add
# Select your project when prompted

firebase deploy --only firestore:rules
```

Verify the rules deployed correctly by checking **Firestore → Rules** in the Firebase console.

---

## Step 6 — Run the Development Server

```bash
npm run dev
```

Vite will start a local server, typically at `http://localhost:5173`. The terminal will show the exact URL.

Changes hot-reload instantly. You're welcome.

---

## Step 7 — (Optional) Deploy to GitHub Pages

If you want to deploy your own instance:

1. Update the `homepage` field in `package.json` (or `vite.config.js` base path) to match your GitHub Pages URL
2. Commit and push your changes
3. Run:

```bash
npm run deploy
```

This runs `npm run build` first (the `predeploy` hook), then publishes the `dist/` folder to the `gh-pages` branch via the `gh-pages` package.

---

## Verifying Your Setup

After `npm run dev`, you should:

1. See the Blindly landing / auth screen at `localhost:5173`
2. Be able to sign up with an email address
3. Complete the onboarding flow (handle, tagline, tags, prompts)
4. Land on the swipe deck

If any of these steps fail, check the [Troubleshooting guide](Troubleshooting.md) or the browser console for Firestore permission errors.

---

## Environment Notes

There is no `.env` file required. Firebase config goes directly in `src/firebase.js`. If you want to use environment variables for the config values (e.g., for CI/CD), Vite supports `import.meta.env.VITE_*` variables — you can refactor `firebase.js` accordingly.

---

<div align="center">

*If it compiled, it's probably fine. Probably.*

</div>
