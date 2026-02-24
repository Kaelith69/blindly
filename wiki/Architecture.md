# 🏗 Architecture

This document describes the system architecture of **Blindly** — a serverless-first, text-only dating SPA.

---

## 1. Overview

Blindly is built as a **single-page application (SPA)** using React 19 and Vite. It has **no custom backend server**. All data storage, authentication, and security enforcement is handled by the Firebase platform (Google Cloud).

```
┌────────────────────────────────────────────────────────────┐
│                    BROWSER (React SPA)                     │
│                                                            │
│  Pages         Components        Context       Router      │
│  ─────         ──────────        ───────       ──────      │
│  Home          SwipeDeck         AuthContext   App.jsx     │
│  Auth          ProfileCard       ThemeContext  ProtRoute   │
│  Onboarding    ChatView                        OnboardGate │
│  Dashboard     BottomNav                                   │
│                ProfileView                                 │
│                AuthForm                                    │
└────────────────────────┬───────────────────────────────────┘
                         │ Firebase SDK (JS)
           ┌─────────────┼──────────────────┐
           ▼             ▼                  ▼
    Firebase Auth   Cloud Firestore   Security Rules
    (Identity)      (Database)        (Authorization)
```

---

## 2. Layer Breakdown

### 2.1 Client Layer — React + Vite

**Entry point**: `src/main.jsx` renders `<App />` into `#root`.

**Provider Tree** (outermost → innermost):
```
ThemeProvider
  └── AuthProvider
        └── BrowserRouter
              └── Routes (pages)
```

- `ThemeProvider` manages the `data-theme` attribute on `<html>` (dark/light).
- `AuthProvider` subscribes to `onAuthStateChanged` and streams the Firestore `users/{uid}` document via `onSnapshot`. This means every component that calls `useAuth()` receives live user data without additional fetches.

### 2.2 Routing

| Route | Component | Protection |
|---|---|---|
| `/` | `Home` | Public |
| `/auth` | `Auth` | Public |
| `/onboarding` | `Onboarding` | `ProtectedRoute` (auth required) |
| `/app` | `AppLayout` → `Dashboard` | `ProtectedRoute` + `OnboardingGate` |
| `*` | Redirect to `/` | — |

**`ProtectedRoute`** — redirects unauthenticated users to `/auth`.  
**`OnboardingGate`** — checks `userDoc.onboardingCompleted`; redirects incomplete profiles to `/onboarding`.

### 2.3 State Management

There is **no global state library** (no Redux, no Zustand). All state is either:
- **Local** (`useState`) — component-scoped, e.g., swipe animations, form inputs.
- **Context** (`useContext`) — app-scoped, e.g., `currentUser`, `userDoc`, `theme`.
- **Server-driven** — Firestore `onSnapshot` listeners push updates directly into React state.

---

## 3. Component Architecture

```
App.jsx
├── ThemeProvider (context/ThemeContext.jsx)
├── AuthProvider (context/AuthContext.jsx)
└── BrowserRouter
    ├── / → Home.jsx
    ├── /auth → Auth.jsx
    │              └── AuthForm.jsx
    ├── /onboarding → Onboarding.jsx (6 steps)
    │                   ├── HandleStep.jsx
    │                   ├── BasicInfoStep.jsx
    │                   ├── TaglineStep.jsx
    │                   ├── TagsStep.jsx
    │                   ├── PromptsStep.jsx
    │                   └── ReviewStep.jsx  ← writes to Firestore
    └── /app → AppLayout.jsx
                  └── Dashboard.jsx
                        ├── SwipeDeck.jsx
                        │     └── ProfileCard.jsx (× N)
                        ├── ChatView.jsx
                        ├── ProfileView.jsx
                        └── BottomNav.jsx
```

---

## 4. Firestore Data Model

### 4.1 `users/{userId}`

The primary document for every registered user.

```json
{
  "handle": "string",          // unique @username
  "tagline": "string",         // one-sentence introduction
  "tags": ["Music", "Tech"],   // subset of AVAILABLE_TAGS
  "prompts": [
    { "question": "I believe...", "answer": "string" }
  ],
  "birthYear": 2000,
  "gender": "string",
  "location": {
    "countryCode": "IN",
    "approxCity": "Mumbai"
  },
  "status": "active",
  "onboardingCompleted": true,
  "currentMatchId": "uid1_uid2 | null",
  "trustLevel": 1,
  "createdAt": "<timestamp>"
}
```

**Key field notes:**
- `currentMatchId` — `null` means user is in "discovery" mode. Non-null means user is in an active match and cannot discover others.
- `trustLevel` — reserved for future moderation features; clients cannot write this field.
- `onboardingCompleted` — set to `true` by `ReviewStep.jsx` after the 6-step wizard completes.

### 4.2 `users/{userId}/swipes/{targetUserId}`

Subcollection tracking every swipe decision.

```json
{
  "direction": "left | right",
  "timestamp": "<serverTimestamp>"
}
```

Used to: (a) exclude already-swiped users from the discovery queue, (b) detect mutual likes for match creation.

### 4.3 `matches/{matchId}`

Created only on mutual right-swipes. `matchId` = `[uid1, uid2].sort().join('_')`, ensuring a deterministic, deduplicated ID.

```json
{
  "users": ["uid1", "uid2"],
  "createdAt": "<serverTimestamp>",
  "status": "active"
}
```

### 4.4 `matches/{matchId}/messages/{messageId}`

Individual chat messages.

```json
{
  "text": "string",           // max 500 chars enforced client-side
  "senderId": "uid",
  "createdAt": "<serverTimestamp>"
}
```

---

## 5. Match Engine

The match engine lives in `src/components/SwipeDeck.jsx`. It follows these steps:

### Step 1 — Record Swipe
```javascript
await setDoc(doc(db, "users", uid, "swipes", candidate.id), {
    direction,
    timestamp: serverTimestamp()
})
```

### Step 2 — Mutual Check
```javascript
const targetSwipeSnap = await getDoc(doc(db, "users", targetUid, "swipes", currentUid))
const isMatch = targetSwipeSnap.exists() && targetSwipeSnap.data().direction === 'right'
```

### Step 3 — Atomic Transaction
If mutual, a Firestore transaction atomically:
1. Creates `matches/{matchId}` (if it doesn't already exist).
2. Updates `currentMatchId` on both user documents.

```javascript
await runTransaction(db, async (transaction) => {
    const matchDoc = await transaction.get(matchRef)
    if (matchDoc.exists()) return // idempotent guard

    transaction.set(matchRef, { users, createdAt: serverTimestamp(), status: 'active' })
    transaction.update(doc(db, "users", currentUid), { currentMatchId: matchId })
    transaction.update(doc(db, "users", targetUid), { currentMatchId: matchId })
})
```

### Step 4 — Reactive Update
`AuthContext`'s `onSnapshot` listener on `users/{uid}` fires automatically when `currentMatchId` changes. The Dashboard component re-renders and shows the match overlay.

---

## 6. Security Rules Architecture

`firestore.rules` acts as the server-side authorization controller:

```
users/{userId}
  READ   → any signed-in user (needed to display discovery profiles)
  CREATE → only the owner (userId == uid())
  UPDATE → only the owner

  swipes/{targetId}
    READ/WRITE → only the owner

matches/{matchId}
  READ   → any signed-in user (TODO: restrict to participants)
  CREATE → any signed-in user (needed for match creation transaction)
  UPDATE → any signed-in user (needed for unmatch)

  messages/{messageId}
    READ   → any signed-in user (TODO: restrict to participants)
    CREATE → any signed-in user
```

> **Known limitation**: Match and message reads are not yet restricted to match participants. This is planned for a Cloud Functions migration (see [Roadmap](Roadmap.md)).

---

## 7. Build & Deployment Pipeline

```
src/ (JSX + CSS)
  ↓ vite build
dist/ (static HTML + JS + CSS)
  ↓ gh-pages -d dist
GitHub Pages (CDN)
```

The `predeploy` npm hook runs `vite build` automatically before `gh-pages` publishes.

---

*Back to [Home](Home.md)*
