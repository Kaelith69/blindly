# 🗺 Roadmap

> *"A roadmap is a list of good intentions and an optimistic relationship with time."*

This page tracks what's built, what's planned, and what we're still designing in our heads while pretending to sleep.

---

## ✅ Shipped (v1.0.0)

These are live and working:

- **Text-only profiles** — handle, tagline, interest tags, custom prompt answers
- **Multi-step onboarding** with `OnboardingGate` enforcement
- **Swipe deck** with Framer Motion spring-physics card animations
- **Firestore-transactional mutual matching** — atomic, race-condition-free
- **Single match lock** — one active match per user at a time
- **Real-time chat** via Firestore `onSnapshot`
- **Phone OTP + Email authentication** via Firebase Auth
- **AMOLED-first design system** — true black, violet accents, native CSS variables
- **Firestore Security Rules** — field locking, match isolation, auth enforcement
- **GitHub Pages deployment** via `gh-pages`

---

## 🔨 In Progress / Near-Term

These are being designed or started:

### Profile Editing
Allow users to update their tagline, tags, and prompt answers after onboarding. Currently `onboardingCompleted` locks the profile. A dedicated edit flow is being designed to preserve data integrity (e.g., can't change handle once set to prevent impersonation).

### Report / Block System
A `reports` collection (write-only for clients) where users can flag inappropriate profiles. Blocked users would be filtered from the swipe deck. Design must prevent abuse of the report system.

---

## 📋 Planned — Next Quarter

### Push Notifications for New Matches
When a mutual match occurs, notify both users even if the app isn't open. Requires Firebase Cloud Messaging (FCM) integration. The architecture is clean for this — we just need to add a Cloud Function to trigger on match document creation.

### Account / Data Deletion
Self-service account deletion from within the app. Deletes the user's Firestore documents, Firebase Auth account, and clears their UID from any match references. GDPR-friendly.

### Scheduled Unmatch / Match Expiry
Optional setting: if a match hasn't sent a message within N days, auto-unmatch. Prevents "match collectors" and respects everyone's time. Requires a scheduled Cloud Function.

---

## 💭 Under Consideration

These ideas are real but require more design work before we commit:

### Prompt Packs / Premium Prompts
Curated question packs (e.g., "Deep questions," "Silly questions," "Actually challenging questions") either free or as a way to support the project. No subscription model. No algorithmic boost for paying users.

### Accessibility Improvements
Full keyboard navigation, proper ARIA labels, screen reader testing. The app is currently optimized for sighted touch users. This needs to change.

### Connection Quality Indicators
Show users how "active" someone is — last seen window, response rate — without being creepy about it. Still debating the line between helpful and surveillance-y.

### Progressive Web App (PWA)
Make Blindly installable on mobile home screens with proper app icons, offline splash screen, and service worker. Mostly a polish item.

### Age Filtering / Preference Settings
Basic filters: age range, gender preferences. These need careful design to not create exclusionary dynamics while still being useful.

---

## 🚫 Won't Build (Ever)

These are explicitly not on the roadmap, no matter how many times they're requested:

| Feature | Why Not |
|---|---|
| Profile photos | It defeats the entire purpose. Hard no. |
| Swipe right on multiple people simultaneously | The single-match philosophy is the product. |
| An algorithm that ranks profiles | We don't want to optimize for engagement, we want to optimize for connection. |
| Ads | No. |
| Data export to third parties | No. |
| "Super like" or paid boosts | This creates unfair dynamics. No. |

---

## Contributing to the Roadmap

Have an idea that fits the philosophy? [Open a feature request](https://github.com/Kaelith69/blindly/issues) labeled `enhancement`. Describe the problem it solves and how it fits with the core principles:

1. Text over photos
2. Focus over abundance
3. Privacy over engagement metrics

If it clears those three, we'll talk.

---

<div align="center">

*The best features are the ones we didn't build.*

</div>
