# Changelog

All notable changes to **Blindly** will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), except we also include notes on our emotional state during development.

---

## [Unreleased]

### Planned
- Profile editing after onboarding (because people grow)
- Push notifications for new matches (so you can ignore them from your lock screen)
- Report / block system (yes, we know, it's overdue)
- Premium prompt packs (capitalism knocks eventually)
- Scheduled unmatch / auto-expiry for matches

---

## [1.0.0] — 2025

### Added
- 🎉 Initial release. The app exists now. Wild.
- Text-only profile system with handle, tagline, interest tags, and custom prompts
- Swipe deck with spring-physics card animations via Framer Motion
- Firestore-transactional mutual matching — atomically creates a `match` doc and sets `currentMatchId` on both users simultaneously
- Real-time chat powered by Firestore `onSnapshot` — messages appear before you can regret sending them
- Firebase Auth with Email/Password and Phone OTP support
- Multi-step onboarding flow with an `OnboardingGate` component that blocks access until the user has actually finished
- AMOLED-first design system — true `#000000` backgrounds, `#8B5CF6` violet accents, no Tailwind, just pain and CSS variables
- `ProtectedRoute` component to redirect unauthenticated users before they see anything interesting
- Firestore Security Rules that lock `trustLevel`, `onboardingCompleted`, and match metadata from client-side writes
- Match isolation rules — you can only read messages in a `match` document where your UID is in the `users` array
- `BottomNav` component for in-app navigation between discovery, chat, and profile views
- GitHub Pages deployment via `gh-pages`

### Fixed
- Fixed bug where reality stopped working during rapid swipes (Firestore transaction now handles this)
- Fixed `currentMatchId` occasionally pointing to a match that no longer existed (null check added, existential dread reduced)

### Changed
- Adopted "serverless-first" architecture — the backend is vibes and Firestore rules
- Moved from polling to `onSnapshot` listeners for all real-time data (polling is a crime)

### Security
- All sensitive fields locked at the Firestore rules layer — clients are trusted with nothing
- Match read access scoped strictly to participants

---

<div align="center">

*"It's not a bug, it's a feature with undocumented behavior."*

</div>
