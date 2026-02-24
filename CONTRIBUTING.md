# Contributing to Blindly 💜

First of all: thank you. Genuinely. You could be doing literally anything else right now, and you chose to contribute to a dating app that refuses to show photos. You are a person of culture.

---

## 🐛 Found a Bug?

Congratulations, you are now part of the development team. Please report it by [opening an issue](https://github.com/Kaelith69/blindly/issues) and include:

- What you expected to happen
- What actually happened (bonus points for dramatic descriptions)
- Steps to reproduce it
- Your browser + OS (yes, this actually matters)

Please do NOT just open an issue titled `"it's broken"`. We appreciate specificity. We are not psychics. Yet.

---

## 💡 Have a Feature Idea?

Amazing. Open an issue labeled `enhancement` and describe:

1. What problem does this solve?
2. How would users interact with it?
3. Have you considered that this might break the sacred Single Match philosophy?

If the answer to #3 is "yes, but hear me out" — we're listening.

---

## 🛠 Making Code Changes

### Setup

```bash
git clone https://github.com/Kaelith69/blindly.git
cd blindly
npm install
npm run dev
```

### The Rules (Non-Negotiable)

- **Don't add photos**. If your PR adds an image upload, a camera capture, or a way to look up someone's Instagram, it will be closed with a polite but firm `no`.
- **Respect the AMOLED aesthetic**. No light mode. No `#FFFFFF` backgrounds slipping in. Eternal darkness, my friend.
- **Test your changes**. Not with "I clicked it and it worked once." Test edge cases. Test on mobile. Test while tired.
- **Don't break Firestore rules** without a very good reason and full documentation of why.

### Branch Naming

```
feature/your-cool-thing
fix/the-thing-that-exploded
chore/boring-but-necessary-update
```

### Commit Messages

Write commit messages like you're explaining the change to a slightly impatient senior developer:
- ✅ `fix: prevent duplicate swipe writes on rapid tap`
- ✅ `feat: add unmatch confirmation modal`
- ❌ `fixed stuff`
- ❌ `asdfghjkl`

---

## 📬 Pull Request Process

1. Fork the repo
2. Create your branch from `main`
3. Make your changes
4. Ensure `npm run build` succeeds without errors
5. Open a PR with a clear description of **what** changed and **why**
6. Be patient — this is maintained by humans, not robots (yet)

---

## 🤝 Code of Conduct

Be kind. Be constructive. Remember that someone wrote the code you're critiquing and they're probably doing their best.

We are building a space for genuine human connection. Start with the contributors.

---

<div align="center">

Built with 💜 by [Kaelith69](https://github.com/Kaelith69)

</div>
