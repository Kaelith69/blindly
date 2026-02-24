# 📖 Usage Guide

This document covers the **end-user flow** through Blindly and provides a **developer reference** for working with the codebase.

---

## End-User Flow

### 1. Landing Page (`/`)

The `Home.jsx` page presents:
- The Blindly brand and tagline.
- Three feature cards: Blind Profiles, One Match, Real Talk.
- A **"Get Started"** button linking to `/auth`.
- A dark/light theme toggle (top right).

### 2. Authentication (`/auth`)

`Auth.jsx` renders `AuthForm.jsx`, which supports:

- **Sign Up** — Creates a new Firebase Auth user with email and password.
- **Sign In** — Authenticates an existing user.

On success, Firebase Auth state changes trigger `AuthContext`'s `onAuthStateChanged` listener, which redirects the user to `/onboarding` (if new) or `/app` (if onboarded).

### 3. Onboarding (`/onboarding`)

A 6-step wizard collects the user's profile data. Each step is a separate component under `src/components/onboarding/`:

| Step | Component | Collects |
|---|---|---|
| 1 | `HandleStep` | Unique `@handle` |
| 2 | `BasicInfoStep` | `birthYear`, `gender`, `location` (country + city) |
| 3 | `TaglineStep` | One-sentence `tagline` |
| 4 | `TagsStep` | Up to N interest `tags` from `AVAILABLE_TAGS` |
| 5 | `PromptsStep` | Up to 5 question/answer `prompts` from `AVAILABLE_PROMPTS` |
| 6 | `ReviewStep` | Previews all data; writes the `users/{uid}` document to Firestore |

The `Onboarding.jsx` page maintains a single `profile` state object and passes `update(data)`, `next()`, and `prev()` props to each step.

On `ReviewStep` submission, Firestore receives:
```javascript
{
  ...profileData,
  status: "active",
  onboardingCompleted: true,
  currentMatchId: null,
  trustLevel: 1,
  createdAt: serverTimestamp()
}
```

After write, the user is redirected to `/app`.

### 4. Dashboard (`/app`)

The main application shell. Rendered inside `AppLayout.jsx`. Contains three tabs managed by `activeTab` state:

#### Tab: Discover

If the user has no active match (`currentMatchId === null`):
- Renders `SwipeDeck.jsx`
- Fetches up to 20 active, onboarded users from Firestore (excluding already-swiped profiles and self)
- Displays one `ProfileCard` at a time
- User can drag the card left/right or press the Pass/Like buttons

If the user has an active match:
- Shows a "You're matched!" state with a button to switch to the Chat tab

#### Tab: Chat

Renders `ChatView.jsx`:
- Subscribes to `matches/{matchId}/messages` ordered by `createdAt`
- Auto-scrolls to the latest message
- Input bar with 500-character limit
- **Unmatch** button (top-right X) — opens a confirmation modal before unmatching

#### Tab: Profile

Renders `ProfileView.jsx`:
- Displays the current user's own profile as it appears to others
- Includes a sign-out button

---

## ProfileCard Content

Each profile card displays (text only):

```
@handle
[gender] • [age calculated from birthYear] • [approxCity]

"[tagline]"

#Tag1  #Tag2  #Tag3  ...

Q: [prompt question]
A: [prompt answer]
```

No images. No links. No external embeds.

---

## Swipe Mechanics

| Action | Effect |
|---|---|
| Drag card right > 100px | Right swipe (LIKE) |
| Drag card left > -100px | Left swipe (NOPE / PASS) |
| Click the ♥ button | Right swipe (LIKE) |
| Click the ✕ button | Left swipe (PASS) |

On any swipe:
1. The card animates off screen (Framer Motion).
2. The swipe is recorded in Firestore.
3. On right swipe, the match check runs.
4. If a match is found, the match overlay appears.

---

## Chat Usage

- Messages are plain text only (no markdown rendering, no media).
- Maximum 500 characters per message.
- Messages are stored and displayed in chronological order.
- Real-time updates via Firestore `onSnapshot` — no polling.

### Unmatching

Clicking the ✕ in the chat header opens a confirmation modal. Confirming:
1. Sets `currentMatchId: null` on the current user's document.
2. Returns the user to the Discover tab.

> ⚠️ **Known limitation**: Only the current user's `currentMatchId` is cleared client-side. The other user's cleanup and the match document deletion are intended for a Cloud Function (see [Roadmap](Roadmap.md)).

---

## Developer Reference

### Running Locally

```bash
npm run dev
# App available at http://localhost:5173
```

### Constants

`src/constants.js` defines the available tags and prompt questions:

```javascript
export const AVAILABLE_TAGS = [
    "Music", "Movies", "Books", "Gaming", "Fitness",
    "Foodie", "Travel", "Art", "Tech", "Science",
    "Nature", "Photography", "Cooking", "Writing", "History",
    "Philosophy", "Psychology", "Astrology", "Spirituality", "Meditation"
]

export const AVAILABLE_PROMPTS = [
    "I believe...",
    "My unpopular opinion...",
    "My biggest obsession...",
    // ...
]
```

To add new tags or prompts, edit this file. No other changes are required.

### Seeding Test Data

```bash
# Requires GOOGLE_APPLICATION_CREDENTIALS to be set
node scripts/seed-profiles.mjs
```

This creates synthetic user documents in Firestore with `onboardingCompleted: true` and `status: active`, making them appear in the swipe deck.

### Adding a New Onboarding Step

1. Create a new step component in `src/components/onboarding/`.
2. Accept `{ data, update, next, prev }` props.
3. Import and add it to the `steps` array in `src/pages/Onboarding.jsx`.
4. Update the `profile` initial state in `Onboarding.jsx` if the step collects new fields.
5. Add the new field to `ReviewStep.jsx`'s display and Firestore write.

---

*Back to [Home](Home.md)*
