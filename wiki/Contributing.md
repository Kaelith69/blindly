# 🤝 Contributing to Blindly

Thank you for your interest in contributing to **Blindly**! This guide covers the branching model, code style, PR process, and development workflow.

---

## Code of Conduct

Be respectful and constructive. This project is built with the intention of making authentic human connection easier — contributions should reflect that spirit.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/blindly.git
   cd blindly
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up Firebase** as described in [Installation](Installation.md).
5. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

---

## Branching Model

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready code |
| `feat/*` | New features |
| `fix/*` | Bug fixes |
| `chore/*` | Maintenance, dependency updates, config changes |
| `docs/*` | Documentation changes only |

Branch names should be lowercase with hyphens, e.g., `feat/profile-editing` or `fix/unmatch-cleanup`.

---

## Development Workflow

```bash
# Start the dev server
npm run dev

# After making changes, verify the build succeeds
npm run build
```

There is currently no automated test suite. Manual testing against a development Firebase project is required.

### Testing Checklist

Before submitting a PR, verify:

- [ ] Sign up as a new user
- [ ] Complete the 6-step onboarding flow
- [ ] Seed test profiles (`node scripts/seed-profiles.mjs`)
- [ ] Swipe through profiles; verify LIKE/PASS records to Firestore
- [ ] Simulate a mutual match (two accounts, each liking the other)
- [ ] Send and receive chat messages in real time
- [ ] Unmatch and return to discovery
- [ ] Test theme toggle (dark/light)
- [ ] Verify `ProtectedRoute` redirects unauthenticated users to `/auth`
- [ ] Verify `OnboardingGate` redirects incomplete profiles to `/onboarding`

---

## Code Style

Blindly does not use an automated formatter (no Prettier, no ESLint config) at this time. Follow the style present in the existing codebase:

- **Indentation**: 4 spaces
- **Quotes**: Single quotes for strings
- **Components**: `PascalCase` named functions, default exported
- **Files**: `PascalCase.jsx` for components, `camelCase.js` for utilities
- **Imports**: Firebase SDK imports grouped together; React/library imports first
- **State naming**: `[noun, setNoun]` convention for `useState`
- **Comments**: Sparingly; only for non-obvious logic
- **CSS**: All styles live in `src/index.css` using CSS custom properties. No inline style objects except for dynamic values.

---

## Commit Messages

Use conventional commit style:

```
feat: add profile editing page
fix: prevent duplicate match transactions
chore: update firebase to v11.4.0
docs: expand architecture wiki
```

Format: `type(optional-scope): short description`

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`

---

## Pull Request Process

1. Ensure your branch is up to date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. Push your branch:
   ```bash
   git push origin feat/your-feature-name
   ```
3. Open a Pull Request against `main` on GitHub.
4. Fill in the PR template:
   - **What**: What does this PR do?
   - **Why**: What problem does it solve?
   - **Testing**: How was it tested?
5. Request a review from a maintainer.

---

## Adding New Features

### Adding a New Onboarding Step

1. Create `src/components/onboarding/YourStep.jsx`
2. Accept `{ data, update, next, prev }` props
3. Add it to the `steps` array in `src/pages/Onboarding.jsx`
4. Update the Firestore write in `ReviewStep.jsx`

### Adding a New Dashboard Tab

1. Add a tab button to `BottomNav.jsx`
2. Add a `case` to `renderContent()` in `Dashboard.jsx`
3. Create the tab's main component in `src/components/`

### Adding a New Firestore Collection

1. Define the schema in [Architecture](Architecture.md)
2. Add the access rules to `firestore.rules`
3. Deploy the rules: `firebase deploy --only firestore:rules`

---

## Reporting Bugs

Open a GitHub Issue with:
- A clear title
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS version

---

*Back to [Home](Home.md)*
