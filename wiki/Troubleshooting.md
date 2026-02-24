# 🔧 Troubleshooting

> *"Have you tried reading the Firestore rules carefully?"* — the answer to 80% of issues here.

---

## Common Issues

### The app loads but shows a blank screen

**Symptoms:** Page loads, no content, no visible error.

**Causes & Fixes:**
1. **Firebase config is missing or wrong.** Open your browser's DevTools console (F12). You'll likely see a Firebase error like `auth/invalid-api-key` or `Could not reach Cloud Firestore`. Check `src/firebase.js` against your Firebase project settings.
2. **Firestore isn't enabled.** Go to your Firebase console → Firestore Database and make sure it's been created.
3. **Build issue with `vite.config.js` base path.** If you're testing a production build locally, the base path might be wrong. Run `npm run dev` instead.

---

### "Missing or insufficient permissions" error in console

**This is the most common issue after setup.**

**Cause:** Your Firestore Security Rules are either too strict (blocking everything) or you haven't deployed them yet.

**Fix:**
```bash
firebase deploy --only firestore:rules
```

Then verify in the Firebase console under Firestore → Rules that the rules show your version, not the default `deny all` rules.

**If the error persists:** Check that the user is authenticated. Rules require `request.auth != null` for all operations. If `auth` is null, the request will always be denied.

---

### Phone OTP not sending

**Causes & Fixes:**
1. **You're on the Spark (free) plan.** Firebase Phone Auth requires the Blaze (pay-as-you-go) plan for production. The free tier allows limited testing with whitelisted phone numbers.
2. **Phone Auth is not enabled.** Go to Firebase console → Authentication → Sign-in providers and ensure Phone is enabled.
3. **Incorrect phone number format.** Phone numbers must be in E.164 format: `+15551234567`.
4. **reCAPTCHA issue.** Firebase Phone Auth uses invisible reCAPTCHA. If the domain isn't whitelisted, it'll fail. Add your domain under Firebase console → Authentication → Settings → Authorized domains.

---

### Swipe deck shows no cards / shows everyone I've already swiped

**Cause:** The query filtering out already-swiped users isn't working as expected.

**Fix:**
- Check the browser console for Firestore query errors — missing indexes will appear here with a link to create them automatically.
- If you see a "requires index" message, click the link in the console. Firebase will prompt you to create the composite index.
- After creating the index, wait 1–2 minutes for it to finish building, then reload.

---

### Match created but chat won't load

**Cause:** The `currentMatchId` on your user document points to a match that either doesn't exist or you don't have read access to.

**Check in Firestore console:**
1. Confirm the `matches/{matchId}` document exists
2. Confirm your UID is in the `users` array of that document
3. Confirm the `status` field is `"active"`

If the document doesn't exist, the transaction may have partially failed. This is rare but can happen on poor connections. Try refreshing — if `currentMatchId` is set but no match document exists, there may be a consistency issue. Clear `currentMatchId` manually via the Firestore console (temporary workaround).

---

### "onboardingCompleted is false" even after finishing onboarding

**Cause:** The final write in the onboarding flow may have failed silently.

**Fix:**
- Open Firestore console → `users/{uid}` — check if `onboardingCompleted: true` is set
- If not, try completing onboarding again with a better network connection
- If it keeps failing, check the browser console for Firestore write permission errors — your rules may be blocking the write

---

### CSS looks wrong / layout is broken

**Cause:** CSS custom properties (variables) from `index.css` are not loading.

**Fix:**
- Ensure `index.css` is imported in `main.jsx`
- Confirm no CSS purging is happening in your build (Vite doesn't purge by default)
- Hard refresh the browser: `Ctrl+Shift+R` / `Cmd+Shift+R`

---

### `npm run build` fails

**Common error: `[vite]: Rollup failed to resolve import`**

This usually means a component is importing something that doesn't exist. Check the error message for the file path and fix the import.

**Common error: `Cannot find module 'firebase/...'`**

Run `npm install` again. The `node_modules` directory may be out of sync.

---

### `npm run deploy` fails with "not a git repository" or permission error

**Fix:**
- Ensure you're in the repo root (`/blindly`)
- Ensure you've committed your changes before deploying
- If you're using a forked repo, ensure the `deploy` script in `package.json` points to your own GitHub Pages URL
- Check that `gh-pages` package is installed: `npm install gh-pages --save-dev`

---

## Firebase Quotas & Limits (Free Tier)

If you're on the Spark plan, be aware of these Firestore limits:

| Resource | Free Limit |
|---|---|
| Document reads | 50,000/day |
| Document writes | 20,000/day |
| Document deletes | 20,000/day |
| Stored data | 1 GiB |
| Network egress | 10 GiB/month |

For a small app, these are generous. You'll hit the Phone Auth limits before Firestore limits.

---

## Still Stuck?

[Open an issue](https://github.com/Kaelith69/blindly/issues) with:
- What you expected to happen
- What actually happened
- Your browser + OS
- The full error message from the console (please, the full thing)

---

<div align="center">

*Most bugs are just features you haven't understood yet. Most.*

</div>
