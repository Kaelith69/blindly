# 🏛 Architecture

> *"We replaced the backend with vibes and Firestore rules."* — the commit message that started it all.

---

## Overview

Blindly is a **serverless-first Single Page Application (SPA)**. There is no traditional backend server. No Node.js + Express. No REST API endpoints. No infrastructure bill that makes you cry at 3am.

The entire application runs as a static bundle served from GitHub Pages. All data operations go directly to Firebase services via the Firebase JavaScript SDK, with **Firestore Security Rules** acting as the authorization and business-logic enforcement layer.

---

## System Architecture

<div align="center">

<svg width="820" height="420" viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" aria-label="Full Architecture Diagram">
  <defs>
    <linearGradient id="warchBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0A" />
      <stop offset="100%" style="stop-color:#1A0A2E" />
    </linearGradient>
    <marker id="wa" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#8B5CF6"/>
    </marker>
    <marker id="wa2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#EC4899"/>
    </marker>
  </defs>
  <rect width="820" height="420" fill="url(#warchBg)" rx="12"/>
  <text x="410" y="28" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle" fill="#A78BFA">Blindly — Full System Architecture</text>

  <!-- User -->
  <rect x="350" y="44" width="120" height="44" fill="#1E1B4B" rx="8" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="410" y="66" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#E9D5FF">User (Browser)</text>
  <text x="410" y="82" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#A78BFA">GitHub Pages</text>

  <line x1="410" y1="88" x2="410" y2="118" stroke="#8B5CF6" stroke-width="1.5" marker-end="url(#wa)"/>

  <!-- React App -->
  <rect x="150" y="118" width="520" height="80" fill="#1E1B4B" rx="8" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="410" y="142" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#E9D5FF">React Application Layer</text>
  <rect x="175" y="152" width="110" height="28" fill="#312E81" rx="5"/>
  <text x="230" y="171" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#C4B5FD">App.jsx (Routes)</text>
  <rect x="305" y="152" width="110" height="28" fill="#312E81" rx="5"/>
  <text x="360" y="171" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#C4B5FD">AuthContext</text>
  <rect x="435" y="152" width="110" height="28" fill="#312E81" rx="5"/>
  <text x="490" y="171" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#C4B5FD">SwipeDeck</text>
  <rect x="555" y="152" width="100" height="28" fill="#312E81" rx="5"/>
  <text x="605" y="171" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#C4B5FD">ChatView</text>

  <line x1="290" y1="198" x2="200" y2="238" stroke="#EC4899" stroke-width="1.5" marker-end="url(#wa2)"/>
  <line x1="530" y1="198" x2="620" y2="238" stroke="#EC4899" stroke-width="1.5" marker-end="url(#wa2)"/>

  <!-- Firebase Auth -->
  <rect x="60" y="238" width="280" height="80" fill="#1F1835" rx="8" stroke="#8B5CF6" stroke-width="1.5"/>
  <text x="200" y="262" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#E9D5FF">Firebase Auth</text>
  <text x="200" y="282" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#A78BFA">Email/Password + Phone OTP</text>
  <text x="200" y="300" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#6B7280">Session tokens, UID management</text>

  <!-- Firestore -->
  <rect x="480" y="238" width="280" height="80" fill="#1F1835" rx="8" stroke="#EC4899" stroke-width="1.5"/>
  <text x="620" y="262" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#FBCFE8">Cloud Firestore</text>
  <text x="620" y="282" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="#F9A8D4">users / swipes / matches</text>
  <text x="620" y="300" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#6B7280">Real-time via onSnapshot</text>

  <!-- Security Rules -->
  <rect x="275" y="355" width="270" height="50" fill="#2D1B4E" rx="8" stroke="#8B5CF6" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="410" y="378" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#A78BFA">firestore.rules</text>
  <text x="410" y="396" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#6B7280">Field locks, match isolation, auth guards</text>

  <line x1="480" y1="318" x2="430" y2="355" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="4,2" marker-end="url(#wa)"/>
</svg>

</div>

---

## Key Architectural Decisions

### 1. No Backend Server

The entire app is static HTML/JS/CSS. This means:
- Zero server costs
- Zero server attack surface
- Instant global CDN delivery via GitHub Pages
- Firebase handles all the complex stuff

The tradeoff: all security logic must live in Firestore rules, not application code. This is a feature, not a bug — rules are enforced server-side regardless of what the client does.

### 2. Firestore as the "Backend"

Firestore does the work of:
- Data storage and retrieval
- Real-time subscriptions (no WebSockets to manage)
- Authorization (via Security Rules)
- Atomic transactions (for match creation)

### 3. Firestore Security Rules as Authorization

`firestore.rules` is the most important non-UI file in the project. It enforces:
- Users can only write to their own documents
- `trustLevel` and `onboardingCompleted` are immutable once set
- Match documents can only be created via the specific transaction pattern
- Messages can only be read/written by match participants

### 4. Client-Side Transactions for Matching

The mutual match check and creation happens in a Firestore transaction inside `SwipeDeck.jsx`. The transaction:
1. Reads User B's swipe subcollection to check for a right swipe on User A
2. If mutual: atomically creates the `match` document and updates `currentMatchId` on both user documents
3. If not: simply records the swipe and moves on

This ensures no race conditions, no partial matches, and no phantom matches.

---

## Firestore Data Model

### `users/{userId}`

The canonical user document.

```json
{
  "handle": "quietstorm_99",
  "tagline": "I read the whole menu before ordering a coffee",
  "tags": ["philosophy", "late-night-walks", "terrible-puns"],
  "prompts": [
    { "question": "Two truths and a lie:", "answer": "..." }
  ],
  "birthYear": 1997,
  "gender": "non-binary",
  "status": "active",
  "onboardingCompleted": true,
  "currentMatchId": "matchABC123",
  "trustLevel": 1,
  "createdAt": "2025-01-15T10:00:00Z"
}
```

**Locked fields** (client cannot modify after set):
- `trustLevel`
- `onboardingCompleted`
- `currentMatchId` — only writable via the match transaction logic

### `users/{userId}/swipes/{targetUserId}`

Records every swipe decision. Used for:
- Preventing the same card from appearing twice
- Checking mutual interest during a right swipe

```json
{
  "direction": "right",
  "timestamp": "2025-01-15T22:31:00Z"
}
```

### `matches/{matchId}`

Created atomically when two users both swipe right on each other.

```json
{
  "users": ["uid_user_a", "uid_user_b"],
  "createdAt": "2025-01-15T22:31:05Z",
  "status": "active"
}
```

### `matches/{matchId}/messages/{messageId}`

Individual messages within a match. Only readable/writable by users in the match's `users` array.

```json
{
  "senderId": "uid_user_a",
  "text": "hey, love your prompt about the coffee menu",
  "createdAt": "2025-01-15T22:35:00Z"
}
```

---

## Component Architecture

```
App.jsx
├── AuthContext (provides user + profile state globally)
├── ProtectedRoute (redirects unauthenticated users)
├── OnboardingGate (redirects incomplete profiles)
├── pages/
│   ├── Auth.jsx → AuthForm.jsx
│   ├── Onboarding.jsx → onboarding/* steps
│   ├── Home.jsx → SwipeDeck.jsx, BottomNav.jsx
│   └── Dashboard.jsx → ChatView.jsx, ProfileView.jsx
```

---

## Real-time Data Flow

The app uses `onSnapshot` listeners in two key places:

1. **`AuthContext`** — Listens to the current user's document in `users/{uid}`. Updates `currentMatchId`, profile data, and status in real time.

2. **`ChatView`** — Listens to `matches/{matchId}/messages` ordered by `createdAt`. New messages appear instantly for both participants.

---

<div align="center">

*The architecture is simple because the constraints are clear.*
*No photos. One match. Real words.*

</div>
