# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x     | ✅ Yes    |

---

## 🔒 Reporting a Vulnerability

If you discover a security vulnerability in Blindly, please **do not** open a public GitHub issue. Vulnerabilities disclosed publicly before a fix is available put real users at risk — and since Blindly is built around trust and privacy, that matters.

### How to Report

Please report vulnerabilities by:

1. **Opening a private security advisory** via [GitHub's Security Advisories](https://github.com/Kaelith69/blindly/security/advisories) feature (preferred)
2. Or emailing the maintainer directly (see profile for contact info)

### What to Include

A good report helps us fix things faster. Please include:

- A clear description of the vulnerability
- Steps to reproduce it
- The potential impact (what could an attacker do?)
- Any suggested mitigations if you have them

### What Happens Next

1. We'll acknowledge your report within **72 hours**
2. We'll investigate and keep you updated on our findings
3. If confirmed, we'll work on a fix and coordinate disclosure timing with you
4. You'll be credited in the fix (unless you prefer anonymity)

---

## 🛡️ Security Architecture Notes

Blindly is designed with the following security principles:

- **Firestore Security Rules are the authorization layer.** The client-side code is untrusted. All sensitive field modifications (e.g., `trustLevel`, `onboardingCompleted`, match metadata) are blocked at the rules level, not in application logic.

- **Match isolation.** Firestore rules enforce that a user can only read messages in a `matches/{matchId}` document where their UID appears in the `users` array. No exceptions.

- **No server-side code to compromise.** The app is serverless. There is no Node.js backend, no API keys in server processes, and no traditional attack surface for server compromise.

- **Authentication via Firebase Auth.** We don't roll our own auth. Firebase handles token issuance, session management, and phone OTP verification.

- **No photo or media storage.** The app intentionally has no file upload surface. No images to exfiltrate, no S3 buckets to misconfigure.

---

## ⚠️ Known Limitations

- Firebase config values (`apiKey`, `projectId`, etc.) are bundled in the client-side JavaScript. This is **expected and safe** — Firebase API keys are not secret. Security is enforced via Firestore rules and Firebase Auth, not API key secrecy. However, ensure your Firebase project has proper rules before deploying.

- Phone OTP verification relies on Firebase's SMS delivery infrastructure. Blind to carrier-level interception (not our threat model for this app, but worth noting).

---

<div align="center">

*Security is not a feature. It's a foundation.*

</div>
