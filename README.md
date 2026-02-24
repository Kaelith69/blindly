<div align="center">

<svg width="900" height="220" viewBox="0 0 900 220" xmlns="http://www.w3.org/2000/svg" aria-label="Blindly Hero Banner">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0A;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1A0A2E;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="900" height="220" fill="url(#heroBg)" rx="16"/>
  <circle cx="80" cy="110" r="60" fill="#8B5CF6" opacity="0.08"/>
  <circle cx="820" cy="110" r="60" fill="#EC4899" opacity="0.08"/>
  <circle cx="450" cy="180" r="120" fill="#8B5CF6" opacity="0.04"/>
  <text x="450" y="68" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="url(#textGrad)" filter="url(#glow)">💜</text>
  <text x="450" y="120" font-family="Arial, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="url(#textGrad)" filter="url(#glow)" letter-spacing="6">BLINDLY</text>
  <text x="450" y="158" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#A78BFA" letter-spacing="3">SOUL OVER SELFIES</text>
  <text x="450" y="196" font-family="Arial, sans-serif" font-size="13" text-anchor="middle" fill="#6B7280" letter-spacing="1">No photos. No filters. Just words.</text>
</svg>

<br/>

**A dating app that prioritizes soul over selfies.**

<br/>

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge)

<br/>

[![Live Demo](https://img.shields.io/badge/Live_Demo-Checkout_Blindly-8b5cf6?style=for-the-badge&logo=google-chrome&logoColor=white)](https://kaelith69.github.io/blindly/)

</div>

---

## 🖤 The Philosophy

Most dating apps feel like scrolling through a very well-lit LinkedIn profile that somehow asks for your zodiac sign. **Blindly** refuses to participate in that circus.

It's built for the thinkers, the overthinkers, and those who believe that a perfectly crafted tagline > a perfectly angled bathroom mirror selfie.

- **No Images** — You see their words, their thoughts, and their handles. That's it. That's the whole vibe.
- **One Match at a Time** — No infinite roster of ghosts. One match, one conversation, one actual shot at something real.
- **AMOLED-First** — True black (#000000) design so your eyes don't scream at 2am when you're spiraling over someone's prompt response.

> *"In a world that keeps telling you to show your face, Blindly says: show your mind."*

---

<div align="center">

![Developer Humor](https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif)

*Blindly's matching algorithm, circa every Friday night*

</div>

---

## 🧠 System Overview

Blindly is a **serverless-first** React SPA. There's no Express server lurking in a dark corner charging you $30/month. Firestore handles the real-time data, Firebase Auth handles who's who, and Firestore Security Rules act as the bouncer that absolutely will not let a user tamper with their own `trustLevel`.

| Layer | Technology | Job |
|---|---|---|
| Frontend | React 18 + Vite | Renders everything at light speed |
| Routing | React Router DOM v7 | Navigates without crying |
| Animations | Framer Motion | Makes everything feel buttery |
| Database | Cloud Firestore | Real-time sync, no polling nonsense |
| Auth | Firebase Auth | OTP/Email, not a password123 situation |
| Hosting | GitHub Pages | Free. Reliable. Beautiful. |
| Icons | Lucide React | Because SVG icon fonts are cursed |

---

## ✨ Features

<table width="100%">
  <tr>
    <td width="33%" align="center"><br/><b>🔤 Text-Driven Profiles</b><br/><br/>Taglines, interest tags, and custom prompts. The app knows nothing about your face. Your words do all the talking.<br/><br/></td>
    <td width="33%" align="center"><br/><b>💬 Real-time Chat</b><br/><br/>Instant messaging powered by Firestore <code>onSnapshot</code>. Your message arrives before you've even second-guessed sending it.<br/><br/></td>
    <td width="33%" align="center"><br/><b>🃏 Swipe Deck</b><br/><br/>Spring-physics swipe cards built with Framer Motion. Left for nope, right for maybe, and a transaction to confirm it's mutual.<br/><br/></td>
  </tr>
  <tr>
    <td width="33%" align="center"><br/><b>🔐 Single Match Lock</b><br/><br/>One match at a time. Both users are "locked" into the conversation until they choose to unmatch. Radical focus.<br/><br/></td>
    <td width="33%" align="center"><br/><b>🛡️ Firestore Security Rules</b><br/><br/>Your backend bouncer. Field-level locks mean users cannot modify metadata like <code>trustLevel</code>. Ever.<br/><br/></td>
    <td width="33%" align="center"><br/><b>📱 AMOLED Design System</b><br/><br/>Native CSS variables. No Tailwind. Pure black, violet accents, and pixel-perfect spacing that respects your battery.<br/><br/></td>
  </tr>
</table>

---

<div align="center">

<svg width="800" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" aria-label="Capability Graph">
  <defs>
    <linearGradient id="capBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0F0F0F;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1A0A2E;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="300" fill="url(#capBg)" rx="12"/>
  <text x="400" y="32" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#A78BFA">Capability Overview</text>
  <text x="80" y="260" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#9CA3AF">Privacy</text>
  <text x="200" y="260" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#9CA3AF">Real-time</text>
  <text x="320" y="260" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#9CA3AF">UX Polish</text>
  <text x="440" y="260" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#9CA3AF">Security</text>
  <text x="560" y="260" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#9CA3AF">Performance</text>
  <text x="680" y="260" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#9CA3AF">Focus</text>
  <rect x="50" y="80" width="60" height="165" fill="#8B5CF6" rx="6" opacity="0.9"/>
  <rect x="170" y="60" width="60" height="185" fill="#EC4899" rx="6" opacity="0.9"/>
  <rect x="290" y="70" width="60" height="175" fill="#8B5CF6" rx="6" opacity="0.9"/>
  <rect x="410" y="55" width="60" height="190" fill="#EC4899" rx="6" opacity="0.9"/>
  <rect x="530" y="65" width="60" height="180" fill="#8B5CF6" rx="6" opacity="0.9"/>
  <rect x="650" y="50" width="60" height="195" fill="#EC4899" rx="6" opacity="0.9"/>
  <text x="80" y="72" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#E9D5FF">95%</text>
  <text x="200" y="52" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#FBCFE8">98%</text>
  <text x="320" y="62" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#E9D5FF">97%</text>
  <text x="440" y="47" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#FBCFE8">99%</text>
  <text x="560" y="57" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#E9D5FF">97%</text>
  <text x="680" y="42" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#FBCFE8">100%</text>
</svg>

*We're confident in that 100% for Focus. Suspiciously so.*

</div>

---

## 🏛 Architecture

<div align="center">

<svg width="820" height="380" viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" aria-label="Architecture Diagram">
  <defs>
    <linearGradient id="archBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0A" />
      <stop offset="100%" style="stop-color:#1A0A2E" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#8B5CF6"/>
    </marker>
  </defs>
  <rect width="820" height="380" fill="url(#archBg)" rx="12"/>
  <text x="410" y="30" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#A78BFA">System Architecture</text>
  <rect x="30" y="50" width="760" height="80" fill="#1E1B4B" rx="8" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="410" y="78" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#E9D5FF">Browser Layer (GitHub Pages)</text>
  <rect x="70" y="88" width="140" height="28" fill="#312E81" rx="5"/>
  <text x="140" y="107" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#C4B5FD">React 18 + Vite</text>
  <rect x="240" y="88" width="140" height="28" fill="#312E81" rx="5"/>
  <text x="310" y="107" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#C4B5FD">React Router DOM</text>
  <rect x="410" y="88" width="140" height="28" fill="#312E81" rx="5"/>
  <text x="480" y="107" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#C4B5FD">Framer Motion</text>
  <rect x="580" y="88" width="140" height="28" fill="#312E81" rx="5"/>
  <text x="650" y="107" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#C4B5FD">Lucide Icons</text>
  <line x1="410" y1="130" x2="410" y2="165" stroke="#8B5CF6" stroke-width="2" marker-end="url(#arrow)"/>
  <rect x="30" y="165" width="760" height="60" fill="#1A0A2E" rx="8" stroke="#EC4899" stroke-width="1.5"/>
  <text x="410" y="190" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#FBCFE8">Firebase JavaScript SDK (Client)</text>
  <text x="220" y="212" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#F9A8D4">firebase/auth</text>
  <text x="410" y="212" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#F9A8D4">firebase/firestore</text>
  <text x="590" y="212" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#F9A8D4">onSnapshot listeners</text>
  <line x1="260" y1="225" x2="200" y2="268" stroke="#EC4899" stroke-width="1.5" marker-end="url(#arrow)"/>
  <line x1="560" y1="225" x2="620" y2="268" stroke="#EC4899" stroke-width="1.5" marker-end="url(#arrow)"/>
  <rect x="60" y="268" width="280" height="80" fill="#1F1835" rx="8" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="200" y="292" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#E9D5FF">Firebase Auth</text>
  <text x="200" y="312" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#A78BFA">Email / Phone OTP</text>
  <text x="200" y="330" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#A78BFA">Session Management</text>
  <rect x="480" y="268" width="280" height="80" fill="#1F1835" rx="8" stroke="#EC4899" stroke-width="1.5"/>
  <text x="620" y="292" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#FBCFE8">Cloud Firestore</text>
  <text x="620" y="312" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#F9A8D4">users / swipes / matches</text>
  <text x="620" y="330" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#F9A8D4">Security Rules (field locks)</text>
</svg>

</div>

---

## 🌊 Data Flow

<div align="center">

<svg width="820" height="340" viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" aria-label="Data Flow Diagram">
  <defs>
    <linearGradient id="flowBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0A" />
      <stop offset="100%" style="stop-color:#1A0A2E" />
    </linearGradient>
    <marker id="arrowFlow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#EC4899"/>
    </marker>
  </defs>
  <rect width="820" height="340" fill="url(#flowBg)" rx="12"/>
  <text x="410" y="28" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#A78BFA">Swipe to Match Data Flow</text>
  <rect x="20" y="55" width="130" height="56" fill="#1E1B4B" rx="8" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="85" y="80" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#E9D5FF">User A</text>
  <text x="85" y="98" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#A78BFA">Swipes Right</text>
  <line x1="150" y1="83" x2="200" y2="83" stroke="#EC4899" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <rect x="200" y="55" width="150" height="56" fill="#1F1835" rx="8" stroke="#EC4899" stroke-width="1.5"/>
  <text x="275" y="80" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#FBCFE8">Write Swipe Doc</text>
  <text x="275" y="98" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#F9A8D4">users/A/swipes/B</text>
  <line x1="350" y1="83" x2="400" y2="83" stroke="#EC4899" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <rect x="400" y="55" width="150" height="56" fill="#1F1835" rx="8" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="475" y="80" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#E9D5FF">Check Mutual</text>
  <text x="475" y="98" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#A78BFA">users/B/swipes/A ?</text>
  <line x1="550" y1="83" x2="600" y2="83" stroke="#EC4899" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <rect x="600" y="55" width="195" height="56" fill="#1E1B4B" rx="8" stroke="#EC4899" stroke-width="1.5"/>
  <text x="697" y="76" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#FBCFE8">Firestore Transaction</text>
  <text x="697" y="93" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#F9A8D4">Create match doc</text>
  <text x="697" y="106" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#F9A8D4">Set currentMatchId on A + B</text>
  <line x1="697" y1="111" x2="697" y2="160" stroke="#8B5CF6" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <rect x="570" y="160" width="255" height="56" fill="#1F1835" rx="8" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="697" y="185" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#E9D5FF">Both Users Notified</text>
  <text x="697" y="204" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#A78BFA">onSnapshot fires, UI updates instantly</text>
  <line x1="697" y1="216" x2="697" y2="258" stroke="#EC4899" stroke-width="2" marker-end="url(#arrowFlow)"/>
  <rect x="570" y="258" width="255" height="56" fill="#1E1B4B" rx="8" stroke="#EC4899" stroke-width="1.5"/>
  <text x="697" y="283" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#FBCFE8">Chat Unlocked</text>
  <text x="697" y="302" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#F9A8D4">Real-time messages via Firestore</text>
  <text x="30" y="200" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#A78BFA">No match?</text>
  <text x="30" y="218" font-family="Arial, sans-serif" font-size="11" fill="#6B7280">Swipe is recorded.</text>
  <text x="30" y="236" font-family="Arial, sans-serif" font-size="11" fill="#6B7280">Deck moves on.</text>
  <text x="30" y="254" font-family="Arial, sans-serif" font-size="11" fill="#6B7280">No drama. No DMs.</text>
</svg>

</div>

---

## 🚀 Installation

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore + Auth enabled
- A reflection on why you're still using `yarn`

### Steps

**1. Clone & Install**
```bash
git clone https://github.com/Kaelith69/blindly.git
cd blindly
npm install
```

**2. Configure Firebase**

Create a project at [console.firebase.google.com](https://console.firebase.google.com/), enable:
- **Authentication**: Email/Password + Phone (SMS)
- **Cloud Firestore**: Production mode

Then update `src/firebase.js` with your config object:
```js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

**3. Deploy Firestore Rules**
```bash
firebase deploy --only firestore:rules
```

**4. Run Development Server**
```bash
npm run dev
```

**5. Build for Production**
```bash
npm run build
npm run deploy
```

---

## 📖 Usage

### The Onboarding Flow
1. Sign up with email or phone OTP
2. Create your handle — think username, but with more personality
3. Write your tagline — this is your first impression. Make it weird. Make it memorable.
4. Add interest tags and fill in the prompts
5. Enter the deck

### The Swipe Deck
- **Swipe Right (or tap ✓)** — You're interested
- **Swipe Left (or tap ✗)** — Not for you, no hard feelings
- **It's mutual** — Both of you get matched and locked into a conversation

### Matched?
You're now in a private, real-time chat. No other users. Just you, them, and whatever awkward opener you decide to lead with.

### Unmatching
Tap the unmatch button. Your `currentMatchId` clears. The deck reopens. The search continues.

---

## 🗂 Project Structure

```
blindly/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── SwipeDeck.jsx       # The heart of discovery
│   │   ├── ChatView.jsx        # Real-time messaging
│   │   ├── ProfileCard.jsx     # Text-only profile display
│   │   ├── ProfileView.jsx     # Full profile overlay
│   │   ├── BottomNav.jsx       # Navigation bar
│   │   ├── AuthForm.jsx        # Login / signup forms
│   │   ├── ProtectedRoute.jsx  # Auth gate
│   │   ├── OnboardingGate.jsx  # Onboarding check
│   │   └── onboarding/         # Multi-step onboarding steps
│   ├── pages/
│   │   ├── Home.jsx            # Main app shell
│   │   ├── Dashboard.jsx       # Post-match dashboard
│   │   ├── Auth.jsx            # Auth page
│   │   └── Onboarding.jsx      # Onboarding page
│   ├── context/                # React Context providers
│   ├── layouts/                # Layout wrappers
│   ├── firebase.js             # Firebase initialization
│   ├── constants.js            # App-wide constants
│   ├── App.jsx                 # Root component + routes
│   └── index.css               # Global design system
├── public/                     # Static assets
├── firestore.rules             # Security rules (the real backend)
├── firebase.json               # Firebase project config
├── vite.config.js              # Vite configuration
└── package.json
```

---

<div align="center">

<svg width="820" height="200" viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" aria-label="Project Stats">
  <defs>
    <linearGradient id="statsBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0A" />
      <stop offset="100%" style="stop-color:#1A0A2E" />
    </linearGradient>
  </defs>
  <rect width="820" height="200" fill="url(#statsBg)" rx="12"/>
  <text x="410" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle" fill="#A78BFA">By The Numbers</text>
  <rect x="30" y="50" width="170" height="120" fill="#1E1B4B" rx="10" stroke="#8B5CF6" stroke-width="1"/>
  <text x="115" y="100" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#8B5CF6">0</text>
  <text x="115" y="122" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#A78BFA">Photos Required</text>
  <text x="115" y="158" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#6B7280">Exactly zero. None. Nada.</text>
  <rect x="220" y="50" width="170" height="120" fill="#1F1835" rx="10" stroke="#EC4899" stroke-width="1"/>
  <text x="305" y="100" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#EC4899">1</text>
  <text x="305" y="122" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#F9A8D4">Match at a Time</text>
  <text x="305" y="158" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#6B7280">Focus. Not a buffet.</text>
  <rect x="410" y="50" width="170" height="120" fill="#1E1B4B" rx="10" stroke="#8B5CF6" stroke-width="1"/>
  <text x="495" y="100" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#8B5CF6">RT</text>
  <text x="495" y="122" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#A78BFA">Real-time Sync</text>
  <text x="495" y="158" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#6B7280">onSnapshot never sleeps.</text>
  <rect x="600" y="50" width="190" height="120" fill="#1F1835" rx="10" stroke="#EC4899" stroke-width="1"/>
  <text x="695" y="100" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#EC4899">$0</text>
  <text x="695" y="122" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#F9A8D4">Backend Server Cost</text>
  <text x="695" y="158" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#6B7280">Serverless. Beautiful.</text>
</svg>

</div>

---

## 🔒 Privacy

Blindly doesn't ask for your photo, and it doesn't sell what you do share. Here's the full policy in one breath:

- **No profile photos** — ever. Not optional. Not a premium feature to unlock.
- **No cloud ML processing** of your content. No Skynet. No vibe-checking algorithms.
- **All data** lives in your Firebase project. You own it.
- **Match isolation** — Firestore rules ensure you can only read messages in matches where your UID appears.
- **Field locking** — `trustLevel` and sensitive metadata are unwritable by clients. The rules say so. Period.

For full details, see the [Privacy wiki page](wiki/Privacy.md).

---

## 🗺 Roadmap

- [x] Text-only profiles with taglines + prompts
- [x] Swipe deck with spring physics
- [x] Firestore-transactional matching (mutual right swipes)
- [x] Real-time chat for matched users
- [x] AMOLED design system
- [x] Phone OTP + Email authentication
- [ ] Profile editing after onboarding
- [ ] Push notifications for new matches
- [ ] Report / block system
- [ ] Premium prompt packs
- [ ] Scheduled unmatch (auto-expiry for matches after N days)
- [ ] Accessibility improvements (screen reader, keyboard nav)

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details. Use it, fork it, ship it. Just don't slap photos on it and call it a dating app. That's not what we do here.

---

<div align="center">

Built with 💜 by [Kaelith69](https://github.com/Kaelith69)

*"In a world of noise, be the silence."*

</div>
