<div align="center">

<svg width="820" height="140" viewBox="0 0 820 140" xmlns="http://www.w3.org/2000/svg" aria-label="Blindly Wiki Home">
  <defs>
    <linearGradient id="homeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0A" />
      <stop offset="100%" style="stop-color:#1A0A2E" />
    </linearGradient>
    <linearGradient id="homeText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#8B5CF6" />
      <stop offset="100%" style="stop-color:#EC4899" />
    </linearGradient>
  </defs>
  <rect width="820" height="140" fill="url(#homeBg)" rx="12"/>
  <text x="410" y="58" font-family="Arial, sans-serif" font-size="40" font-weight="bold" text-anchor="middle" fill="url(#homeText)" letter-spacing="4">BLINDLY WIKI</text>
  <text x="410" y="90" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#A78BFA">The complete technical reference for Blindly</text>
  <text x="410" y="118" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#6B7280">Everything you need to understand, run, and contribute to this project</text>
</svg>

</div>

---

Welcome to the **Blindly Wiki** — your comprehensive guide to a dating app that had the audacity to say "no thanks" to photos.

Whether you're here to understand the architecture, get it running locally, figure out why something broke, or just read something entertaining at midnight, you're in the right place.

---

## 📚 Wiki Pages

| Page | What's in it |
|------|-------------|
| [🏛 Architecture](Architecture.md) | System design, Firestore schema, match engine internals |
| [🚀 Installation](Installation.md) | Full setup guide, Firebase config, environment setup |
| [📖 Usage](Usage.md) | Onboarding, swiping, matching, chatting, unmatching |
| [🔒 Privacy](Privacy.md) | Data principles, what's stored, what's never stored |
| [🔧 Troubleshooting](Troubleshooting.md) | Common issues, Firestore rules gotchas, FAQ |
| [🗺 Roadmap](Roadmap.md) | What's built, what's planned, and what we're still arguing about |

---

## 🧠 What is Blindly?

Blindly is a **serverless-first, text-only dating web app** built on React 18 + Vite and Firebase. The core idea:

- **No profile photos.** Ever. You build your identity through words.
- **One match at a time.** Both users must swipe right (mutual), and they're then "locked" into a private conversation until one of them unmatches.
- **Real-time everything.** Firestore `onSnapshot` listeners mean the UI reacts instantly to changes — matches, messages, status updates.
- **AMOLED-first design.** True black (`#000000`) backgrounds, violet accents (`#8B5CF6`), and a CSS design system built from scratch.

The app is live at [https://kaelith69.github.io/blindly/](https://kaelith69.github.io/blindly/).

---

## 🛠 Tech Stack at a Glance

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router DOM v7 |
| Animations | Framer Motion |
| Database | Cloud Firestore (real-time) |
| Authentication | Firebase Auth (Email + Phone OTP) |
| Hosting | GitHub Pages |
| Icons | Lucide React |
| Styling | Native CSS (Tailwind-free) |

---

## 🤝 Contributing

Read [CONTRIBUTING.md](../CONTRIBUTING.md) before submitting PRs. The short version: be kind, don't add photos, and write commit messages that actually say something.

---

<div align="center">

*"In a world of noise, be the silence."*

Built with 💜 by [Kaelith69](https://github.com/Kaelith69)

</div>
