# 🔒 Privacy

> *"The most private dating app is the one that doesn't know what you look like."*

---

## The Core Principle

Blindly was built on a simple belief: **you should be able to connect with people without handing over your identity to a corporation.**

Most dating apps are data harvesting machines wrapped in a swipe interface. Blindly is the opposite. We collect what's necessary for the app to function, and nothing else.

---

## What We Collect

| Data | Purpose | Stored Where |
|---|---|---|
| Email address or phone number | Authentication | Firebase Auth |
| Handle (username) | Display in the app | Firestore `users/{uid}` |
| Tagline | Profile display | Firestore `users/{uid}` |
| Interest tags | Profile display | Firestore `users/{uid}` |
| Prompt answers | Profile display | Firestore `users/{uid}` |
| Birth year | Age display | Firestore `users/{uid}` |
| Gender | Filtering (future) | Firestore `users/{uid}` |
| Swipe decisions | Prevent duplicate cards | Firestore `users/{uid}/swipes` |
| Chat messages | In-app messaging | Firestore `matches/{id}/messages` |

---

## What We Absolutely Do Not Collect

- ❌ Profile photos (the whole point)
- ❌ Your real name
- ❌ Location data
- ❌ Device identifiers beyond what Firebase Auth uses for session management
- ❌ Behavioral analytics or usage tracking
- ❌ Data sold or shared with third parties
- ❌ Advertising profiles

No cloud ML. No vibe-checking algorithm. No "users who swiped on similar profiles also liked..." recommendation engine learning from your loneliness.

---

## How Your Data is Protected

### Firestore Security Rules

`firestore.rules` is the enforcement layer for all data access. Key protections:

**Authentication required:** No unauthenticated read or write is permitted anywhere in the database.

**Own-data-only writes:** Users can only write to their own `users/{uid}` document. You cannot modify another user's profile.

**Field immutability:** Once set, the following fields cannot be changed by a client request:
- `trustLevel` — set by the system, not the user
- `onboardingCompleted` — cannot be unset after completion

**Match isolation:** The messages subcollection under any `match` document is only readable and writable by users whose UID appears in the match's `users` array. If you're not in the match, you cannot see the messages. Full stop.

**Swipe privacy:** Your swipe decisions (`users/{uid}/swipes/{targetId}`) are only readable and writable by you. Other users cannot query your swipe history.

### Firebase Auth

Authentication is handled entirely by Firebase Auth. We do not:
- Store passwords anywhere — Firebase handles hashing and salting
- Have access to your raw phone number beyond what Firebase Auth uses for OTP delivery
- Implement our own session tokens

### No Server-Side Code

There is no backend server to compromise. The app is a static bundle. There are no server processes storing session data, no API endpoints that could leak data, and no cloud functions in the current implementation.

---

## Data Ownership

Blindly is deployed from a Firebase project. All user data lives in that Firebase project's Firestore instance. The operator of that Firebase project controls the data.

If you're self-hosting Blindly (i.e., you've cloned the repo and deployed it to your own Firebase project), **you own all the data**. The original Kaelith69 deployment has no access to your project's data.

---

## Data Deletion

Currently, account and data deletion must be handled manually via the Firebase console. A self-service account deletion feature is on the [roadmap](Roadmap.md).

To delete your data manually:
1. Delete your user document from `users/{uid}` in Firestore
2. Delete your user from Firebase Auth
3. Note: match documents you participated in are not automatically deleted (they reference both users)

---

## Third-Party Services

| Service | Purpose | Privacy Policy |
|---|---|---|
| Firebase Auth | Authentication | [Google Privacy Policy](https://policies.google.com/privacy) |
| Cloud Firestore | Database | [Google Privacy Policy](https://policies.google.com/privacy) |
| GitHub Pages | Hosting | [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) |

No other third-party services are integrated. No analytics platforms. No ad networks.

---

## Changes to This Policy

If the privacy practices of a deployed Blindly instance change materially, the CHANGELOG and SECURITY documents will reflect those changes with clear versioning.

---

<div align="center">

*No cloud. No spying. No Skynet. Relax.*

</div>
