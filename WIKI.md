# 🧠 Blindly Technical Wiki

Welcome to the internal documentation for **Blindly**. This guide covers the architectural decisions, data structures, and logic flow that make the app tick.

---

## 🏛 Architecture Overview

Blindly is a "Serverless-First" React application. It bypasses the need for a traditional backend by utilizing Firestore's real-time capabilities and security rules to orchestrate complexity.

### Key Layers
- **Real-time Sync**: `onSnapshot` listeners in `AuthContext` and `ChatView` ensure the UI reacts instantly to database changes.
- **Match Engine**: A client-side transaction logic in `SwipeDeck.jsx` that ensures atomicity when two users like each other.
- **Security Guard**: `firestore.rules` acts as our "backend controller", locking fields like `trustLevel` from client modification.

---

## 📊 Firestore Schema

### `users/{userId}`
The core document for every person in the app.
```json
{
  "handle": "string",
  "tagline": "string",
  "tags": ["array", "of", "strings"],
  "prompts": [{ "question": "string", "answer": "string" }],
  "birthYear": 2026,
  "gender": "string",
  "status": "active",
  "onboardingCompleted": true,
  "currentMatchId": "string | null",
  "trustLevel": 1,
  "createdAt": "timestamp"
}
```

### `users/{userId}/swipes/{targetUserId}`
Stores who you've swiped on, preventing duplicate cards.
```json
{
  "direction": "left | right",
  "timestamp": "timestamp"
}
```

### `matches/{matchId}`
Created only when a mutual `right` swipe occurs.
```json
{
  "users": ["uid1", "uid2"],
  "createdAt": "timestamp",
  "status": "active"
}
```

---

## 💘 The Match Engine

The engine follows a **Single Match** philosophy. 

1. **Swipe Right**: We record the swipe in the current user's `swipes` subcollection.
2. **Mutual Check**: We check if the `targetUserId` has a recorded `right` swipe for the `currentUserId`.
3. **Transaction**: If mutual, we enter a Firestore Transaction:
   - Create the `match` document.
   - Update `currentMatchId` for BOTH users.
   - This "locks" both users out of discovery until they unmatch.

---

## 🎨 Design Philosophy

### The "Void" Aesthetic
- **True Black (#000000)**: We use absolute black to perfect the AMOLED experience and minimize visual noise.
- **Accent (#8b5cf6)**: A vibrant violet used sparingly for high-impact actions.
- **Micro-interactions**: Everything feels physical. We use `framer-motion` for spring-based physics on cards and 100ms HMR-like speed on Haptics.

---

## 🔒 Security Principles

- **Field Locking**: Users can update their profile, but cannot touch metadata like `trustLevel` or `onboardingCompleted` (once set).
- **Match Isolation**: You can only read messages in a match where your UID is in the `users` array.
- **Sandboxing**: The `reports` collection (planned) is write-only for clients.

---

<p align="center">
  <i>"In a world of noise, be the silence."</i>
</p>
