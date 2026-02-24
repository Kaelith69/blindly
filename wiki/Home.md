# 🏠 Blindly — Wiki Home

> *"Date with words, not looks."*

Welcome to the **Blindly** technical wiki. This documentation covers everything from high-level architecture to individual component internals, developer onboarding, and contribution guidelines.

---

## 🔍 What is Blindly?

**Blindly** is a text-only blind dating web application. It deliberately removes profile photos, replacing them with handles, taglines, interest tags, and personal prompt answers. The goal is to create authentic connections based on personality and words rather than appearance.

**Core Philosophy:**
- No images, ever. The data model physically cannot store them.
- One match at a time. Both users are locked into a single active conversation.
- Real-time, text-only chat. No media attachments, no read receipts (yet), just words.
- Serverless architecture. No custom backend — Firebase handles auth, data, and rules.

---

## 📚 Wiki Pages

| Page | Contents |
|---|---|
| **[Architecture](Architecture.md)** | System design, layers, Firestore schema, match engine, component tree |
| **[Installation](Installation.md)** | Prerequisites, Firebase setup, environment config, running locally, deploying |
| **[Usage](Usage.md)** | End-user flow walkthrough, developer usage, seeding test data |
| **[Privacy](Privacy.md)** | Privacy model, data minimization, Firestore security rules analysis |
| **[Contributing](Contributing.md)** | Branching model, code style, PR process, testing |
| **[Troubleshooting](Troubleshooting.md)** | Common errors, Firebase issues, build failures, debugging tips |
| **[Roadmap](Roadmap.md)** | Planned features, known limitations, future architecture |

---

## ⚡ Quick Start

```bash
git clone https://github.com/Kaelith69/blindly.git
cd blindly
npm install
# Edit src/firebase.js with your Firebase credentials
npm run dev
```

See [Installation](Installation.md) for the full setup guide.

---

## 🏗 Architecture at a Glance

```
React 19 SPA (Vite)
  ├── React Router v7     → Client-side routing
  ├── Framer Motion       → Swipe physics & animations
  ├── AuthContext         → Firebase Auth + Firestore userDoc sync
  └── Firebase SDK
        ├── Auth          → Email & Phone/OTP login
        ├── Firestore     → Profiles, swipes, matches, messages
        └── Rules         → Server-side authorization
```

---

## 🗂 Firestore Collections

| Collection | Purpose |
|---|---|
| `users/{uid}` | User profile documents |
| `users/{uid}/swipes/{targetId}` | Swipe history per user |
| `matches/{matchId}` | Active match documents |
| `matches/{matchId}/messages/{msgId}` | Chat messages |

---

## 🔗 External Links

- **Live App**: [https://kaelith69.github.io/blindly/](https://kaelith69.github.io/blindly/)
- **Repository**: [https://github.com/Kaelith69/blindly](https://github.com/Kaelith69/blindly)
- **Firebase Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/)

---

*Built with 💜 by [Kaelith69](https://github.com/Kaelith69)*
