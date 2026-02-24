# 🔒 Privacy & Security

This document describes the privacy model, data minimization strategy, and security posture of **Blindly**.

---

## Privacy Design Principles

### 1. No Personal Images

The Firestore data model for `users/{uid}` **has no image fields**. There is no `photoURL`, `avatar`, or `profilePicture` field. Users cannot upload images to Firebase Storage because Storage is not enabled in this project. Personal appearance is completely excluded from the system.

### 2. Minimal Personal Data Collection

Blindly collects the minimum data required to operate:

| Field | Collected | Justification |
|---|---|---|
| Email or Phone | Yes (Firebase Auth only) | Required for account authentication |
| Handle | Yes | Public display name |
| Birth year | Yes | Used to calculate approximate age |
| Gender | Yes | Displayed on profile card |
| Approximate city | Yes | General location context |
| Interest tags | Yes | Profile personality signal |
| Prompt answers | Yes | Profile personality signal |
| Swipe history | Yes | Prevents duplicate profiles in discovery |
| Match references | Yes | Enables the chat feature |
| IP address / Device data | No | Not stored by the app |
| Precise GPS location | No | Never requested or stored |
| Real name | No | Never collected |
| Date of birth (exact) | No | Only birth year is stored |

### 3. One Match at a Time

The `currentMatchId` constraint limits social graph exposure. A user can only have one active connection at any time, reducing the amount of conversation data generated and retained.

### 4. Text-Only Messaging

Chat messages are plain text strings, max 500 characters. No files, images, voice notes, or links are sent through the system.

---

## Authentication Security

| Mechanism | Details |
|---|---|
| **Provider** | Firebase Authentication (Google-managed) |
| **Token type** | Short-lived JWT (1 hour), auto-refreshed by Firebase SDK |
| **Storage** | Firebase SDK stores tokens in `localStorage` / `IndexedDB` |
| **Email sign-in** | Email + password; password hashed by Firebase (bcrypt) |
| **Phone sign-in** | OTP via SMS; Firebase manages delivery |

Firebase Authentication handles:
- Password hashing and salting.
- Brute-force protection.
- Rate limiting on authentication endpoints.
- Token revocation on sign-out.

---

## Firestore Security Rules Analysis

`firestore.rules` defines server-side authorization rules enforced by Firestore before any data is read or written.

```
service cloud.firestore {
  match /databases/{db}/documents {

    // --- USER PROFILES ---
    match /users/{userId} {
      allow read: if isSignedIn();           // Any auth user can see profiles (for discovery)
      allow create: if isSignedIn()
                    && userId == uid();      // Can only create your own document
      allow update: if isSignedIn()
                    && userId == uid();      // Can only update your own document

      match /swipes/{targetId} {
        allow read, write: if isSignedIn()
                           && userId == uid(); // Complete swipe isolation
      }
    }

    // --- MATCHES ---
    match /matches/{matchId} {
      allow read: if isSignedIn();           // TODO: restrict to match participants
      allow create: if isSignedIn();         // Needed for match transaction
      allow update: if isSignedIn();         // Needed for unmatch

      match /messages/{messageId} {
        allow read: if isSignedIn();         // TODO: restrict to match participants
        allow create: if isSignedIn();
      }
    }
  }
}
```

### What the Rules Enforce

- **Profile isolation**: Only the document owner can create or update their own profile. Swipe data is completely private to the owner.
- **No cross-user writes**: Users cannot write to other users' documents.
- **Authentication required**: All reads and writes require a valid Firebase Auth token.

### Known Limitations

- Match and message reads are not yet restricted to match participants. Any authenticated user who knows a `matchId` could technically read the messages. This is a planned fix via Cloud Functions (see [Roadmap](Roadmap.md)).
- The `trustLevel` and `onboardingCompleted` fields are currently writable by the client. Field-level security via Firestore rules is planned.
- **Partial unmatch cleanup**: When a user unmatches, only their own `currentMatchId` is cleared client-side (`ChatView.jsx`). The other user's `currentMatchId` and the `matches/{matchId}` document are not deleted. This means the other user's document temporarily retains a stale `currentMatchId` reference, and chat history remains in Firestore until manual cleanup or a future Cloud Function removes it (see [Roadmap](Roadmap.md)).

---

## Data Retention

- **Account deletion**: Currently not implemented in the UI. Manual deletion is possible via the Firebase Console. A self-service account deletion flow is planned.
- **Swipe data**: Retained indefinitely to prevent re-showing swiped profiles. Future: prune swipes older than 90 days.
- **Match data**: Retained after unmatch. Future: Cloud Function to delete the match document on unmatch.
- **Messages**: Retained indefinitely. Future: configurable message retention / auto-expiry.

---

## What Blindly Does NOT Do

- Does not sell or share user data with third parties.
- Does not run behavioral analytics or ad targeting.
- Does not track users across sessions beyond what Firebase Auth requires.
- Does not store precise GPS coordinates.
- Does not store real names.
- Does not enable link previews or media attachments in chat.

---

## Reporting Security Issues

If you discover a security vulnerability, please report it by opening a GitHub issue marked **[Security]** or contacting the maintainer directly via GitHub. Do not post vulnerabilities in public issues.

---

*Back to [Home](Home.md)*
