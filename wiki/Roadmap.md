# 🗺 Roadmap

This document tracks the planned features, known limitations, and architectural improvements for **Blindly**.

---

## Current Status — v1.0.0

The initial version of Blindly is a functional MVP covering the core dating loop:

- ✅ Firebase Auth (Email + Phone/OTP)
- ✅ 6-step text-only profile onboarding
- ✅ Swipe deck with Framer Motion physics
- ✅ Mutual match detection via Firestore transaction
- ✅ Real-time text chat
- ✅ Unmatch (partial — current user only)
- ✅ Dark/light theme toggle
- ✅ GitHub Pages deployment
- ✅ Firestore security rules

---

## Near-Term (v1.1)

These features address known limitations in v1.0:

### 🔜 Symmetric Unmatch via Cloud Function

**Problem**: When a user unmatches, only their own `currentMatchId` is cleared client-side. The other user's document and the `matches/{matchId}` document are not cleaned up.

**Solution**: A Firebase Cloud Function triggered `onUpdate` of `matches/{matchId}` (when `status` changes to `"ended"`) that:
1. Sets `currentMatchId: null` on both user documents.
2. Optionally deletes or archives the match and messages.

### 🔜 Field-Level Security in Firestore Rules

**Problem**: Fields like `trustLevel` and `onboardingCompleted` can currently be written by the client.

**Solution**: Use Firestore Rules v2 `request.resource.data` diff checks to restrict which fields a client can modify on update.

```
allow update: if isSignedIn()
              && userId == uid()
              && !("trustLevel" in request.resource.data.diff(resource.data).affectedKeys())
              && !("onboardingCompleted" in request.resource.data.diff(resource.data).affectedKeys());
```

### 🔜 Match/Message Access Restricted to Participants

**Problem**: Any authenticated user can read `matches/{matchId}/messages` if they know the `matchId`.

**Solution**: Add a rule that checks `request.auth.uid in resource.data.users`:
```
allow read: if isSignedIn()
            && request.auth.uid in get(/databases/$(database)/documents/matches/$(matchId)).data.users;
```

---

## Short-Term (v1.2)

### 🔜 Report & Block Users

- Add a **Report** option on profile cards and in the chat header.
- Write to a `reports/{reportId}` collection (write-only for clients).
- Block list stored in `users/{uid}/blocks/{targetId}`.
- Blocked users excluded from discovery queue.

### 🔜 Profile Editing

- Allow users to update their tagline, tags, and prompt answers post-onboarding.
- Add an **Edit Profile** section to the Profile tab.
- Firestore `update` already allowed by current rules.

### 🔜 Improved Candidate Filtering

- Filter discovery queue by:
  - Age range (using `birthYear`)
  - Gender preference
  - Country (using `location.countryCode`)
- Requires Firestore composite indexes.

---

## Medium-Term (v1.3)

### 🔜 Push Notifications on Match

- Integrate Firebase Cloud Messaging (FCM).
- A Cloud Function sends a push notification to the matched user when `currentMatchId` is set.

### 🔜 Conversation Time-Boxing

- Matches expire after 24–72 hours (configurable) if neither user messages.
- Provides urgency without indefinite open connections.
- Implemented via a scheduled Cloud Function.

### 🔜 Account Deletion

- Self-service account deletion flow in the Profile tab.
- Firebase Auth user deleted + Firestore document and subcollections wiped via Cloud Function.
- Complies with GDPR right-to-erasure.

---

## Long-Term (v2.0)

### 🔜 Progressive Web App (PWA)

- Service worker for offline support.
- Install-to-home-screen on mobile.
- Background sync for queued messages.

### 🔜 Typing Indicators

- Ephemeral Firestore document under the match (`matches/{id}/typing/{uid}`) with TTL.
- Shows "..." in chat when the other user is typing.

### 🔜 Message Reactions (Emoji Only)

- Lightweight reaction system: users can react to messages with a single emoji.
- No text replies — keeps the "zero noise" design principle.

### 🔜 Smarter Discovery

- Interest tag affinity scoring (users who share more tags appear earlier in the queue).
- Recency boost for new profiles.
- Implemented client-side or via a Cloud Function that pre-computes ranked queues.

### 🔜 Multi-Language Support

- i18n with `react-intl` or `i18next`.
- Starting with English and Hindi (primary user base).

---

## Known Limitations (Not Planned to Fix Soon)

| Limitation | Notes |
|---|---|
| No server-side candidate ranking | Discovery is a simple Firestore query with `limit(20)`, no ML-based ranking |
| No message search | Chat is ephemeral; no search within conversations |
| No email verification | Firebase Auth allows unverified emails |
| No rate limiting on swipes | Theoretically someone could swipe very rapidly via API |

---

## Contributing to the Roadmap

Have a feature idea? Open a GitHub Issue with the label `enhancement`. Describe the problem it solves, not just the solution. Features aligned with the **personality-first, low-noise** philosophy are most likely to be accepted.

---

*Back to [Home](Home.md)*
