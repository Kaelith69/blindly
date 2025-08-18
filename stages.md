
# 🚀 Blindly Dev Stages

### **Stage 0 — Foundations (1 week)**

* Set up Firebase project(s): `dev`, `staging`, `prod`.
* Enable **Auth**, **Firestore**, **Functions**, **Messaging**, **App Check**.
* Scaffold Flutter app (Riverpod, go\_router, theming black/white).
* CI/CD: GitHub Actions → Firebase deploy, Flutter builds.

---

### **Stage 1 — Onboarding & Profiles (2–3 weeks)**

* **Auth flow**: phone/email OTP.
* **User creation**: write to `users/{uid}` doc.
* Onboarding screens: handle, tagline, prompts, tags.
* Firestore rules for `/users`.
* `userProvider` stream works → user profile synced.
* Minimal UI: clean Inter typography, black/white theme.

✅ By end: users exist, onboarded, stored in Firestore.

---

### **Stage 2 — Swipe Deck + Likes (3–4 weeks)**

* Implement **SwipeDeck widget** (gesture, animations).
* Call `swipe` CF endpoint (like/dislike).
* Likes collection writes happen.
* Likes screen: list of incoming likes w/ countdown chip.
* `confirmLike` + `rejectLike` functions.
* Push notifications: “You got a like.”

✅ By end: Users can swipe → send/receive likes → confirm → match doc created.

---

### **Stage 3 — Matches & Chat (3–4 weeks)**

* Chat screen: messages subcollection, ListView, composer.
* Functions: `sendMessage`, `markRead`.
* Push: new message → peer notified.
* Unmatch flow (`unmatch` CF + UI modal).
* Match guard: blocks swipe if `currentMatchId != null`.
* Security rules for messages & matches.

✅ By end: people can match, chat, unmatch. Core loop alive.

---

### **Stage 4 — Moderation & Rate Limits (2 weeks)**

* Daily like quota logic (`system/limits`).
* Rate-limit swipes (txn counter).
* Like expiry cron (`expireLikes`).
* Basic text moderation (regex filter).
* Reports UI (report profile/message).

✅ By end: guardrails in place, trolls slowed down.

---

### **Stage 5 — Polish & Growth (2–3 weeks)**

* Add Remote Config for feature flags.
* Empty states & microcopy (“No faces, check back soon”).
* Typing indicators (flagged in config).
* Like expiry nudges (push at 6h left).
* Simple discovery scoring (tag overlap + freshness).

✅ By end: smooth UX, retention hooks ready.

---

### **Stage 6 — Beta → Production**

* Internal Alpha (20 users): bug bash.
* Closed Beta (300 users): refine matching, fix flows.
* Public Beta: enable analytics dashboards, watch KPIs.
* Launch 1.0: Play Store + App Store.

---

### TL;DR — Milestones

1. **Stage 1**: Users onboard.
2. **Stage 2**: Swiping + likes work.
3. **Stage 3**: Matching & chatting works.
4. **Stage 4**: Abuse prevention.
5. **Stage 5**: UX polish & growth loops.
6. **Stage 6**: Beta → Production rollout.

---

So captain, what do you want in your hands *first* —
👉 the **Firestore Rules v1** file to lock this thing down,
👉 the **index.ts skeleton** with all Cloud Functions stubs,
or 👉 the **Flutter SwipeDeck widget** to start making those cards fly?
