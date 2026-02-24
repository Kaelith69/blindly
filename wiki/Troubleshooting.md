# 🔧 Troubleshooting

This guide covers common issues encountered when setting up, running, or developing **Blindly**.

---

## Table of Contents

1. [Firebase & Authentication Issues](#firebase--authentication-issues)
2. [Firestore / Data Issues](#firestore--data-issues)
3. [Swipe Deck Issues](#swipe-deck-issues)
4. [Chat Issues](#chat-issues)
5. [Build & Deploy Issues](#build--deploy-issues)
6. [Onboarding Issues](#onboarding-issues)
7. [Debugging Tips](#debugging-tips)

---

## Firebase & Authentication Issues

### ❌ "Firebase: No Firebase App '[DEFAULT]' has been created"

**Cause**: `src/firebase.js` has not been configured with a valid Firebase project.

**Fix**: Replace the placeholder `firebaseConfig` in `src/firebase.js` with your project's real config from the Firebase Console → Project Settings → Your apps → Web app → SDK setup.

---

### ❌ "auth/configuration-not-found" or "auth/operation-not-allowed"

**Cause**: The sign-in method (Email/Password or Phone) has not been enabled in the Firebase Console.

**Fix**:
1. Firebase Console → Authentication → Sign-in method
2. Enable **Email/Password** and/or **Phone**
3. Save

---

### ❌ Phone sign-in not working locally

**Cause**: Firebase Phone Auth requires a valid domain or a test environment configuration.

**Fix**:
- Add `localhost` to the list of **Authorized domains** in Firebase Console → Authentication → Settings → Authorized domains.
- Alternatively, use test phone numbers in Firebase Console → Authentication → Sign-in method → Phone → Phone numbers for testing.

---

### ❌ Users get stuck on the loading screen

**Cause**: `AuthContext` is waiting for `onAuthStateChanged` to fire, but Firestore `onSnapshot` on `users/{uid}` fails (e.g., no Firestore rules deployed yet).

**Fix**:
1. Check browser console for Firestore permission errors.
2. Ensure rules are deployed: `firebase deploy --only firestore:rules`
3. Ensure the Firestore database has been created in the Firebase Console.

---

## Firestore / Data Issues

### ❌ "Missing or insufficient permissions"

**Cause**: The Firestore security rules deny the requested read or write.

**Fix**:
1. Ensure you are signed in (unauthenticated reads/writes are blocked by all rules).
2. Deploy the latest rules: `firebase deploy --only firestore:rules`
3. Check the Firebase Console → Firestore → Rules → **Rule Playground** to simulate the failing operation.

---

### ❌ Swipe deck shows 0 profiles

**Cause**: No users in Firestore with `status: "active"` and `onboardingCompleted: true`, or all have already been swiped.

**Fix**:
1. Complete onboarding with at least one test account.
2. Or run the seed script: `node scripts/seed-profiles.mjs` (requires service account credentials).
3. Check the `users` collection in Firestore Console to verify documents exist with the correct fields.

---

### ❌ Match doesn't appear after both users swipe right

**Cause**: The Firestore transaction in `SwipeDeck.jsx` may have failed silently.

**Fix**:
1. Check browser console for `"Match creation failed:"` errors.
2. Verify that both users have `onboardingCompleted: true` and `status: "active"`.
3. Check `users/{uid}/swipes/` subcollections in Firestore Console — both swipes should be present with `direction: "right"`.
4. Verify Firestore rules allow `create` and `update` on `matches/{matchId}` and `users/{userId}`.

---

## Swipe Deck Issues

### ❌ Cards don't animate / drag doesn't work

**Cause**: Framer Motion not loaded, or a JavaScript error is interrupting the component.

**Fix**:
1. Open browser DevTools → Console and look for errors.
2. Run `npm install` to ensure `framer-motion` is installed.
3. Verify `vite.config.js` includes `@vitejs/plugin-react` for JSX transform.

---

### ❌ Self profile appears in the swipe deck

**Cause**: The self-exclusion code in `SwipeDeck.jsx` adds `uid` to `swipedIds`. If `auth.currentUser` is `null` at fetch time, self may slip through.

**Fix**: This is a known edge case. Hard-refreshing the app after sign-in (to ensure auth state is loaded) resolves it.

---

## Chat Issues

### ❌ Messages not appearing in real time

**Cause**: Firestore `onSnapshot` listener failed to subscribe, or the `matchId` is incorrect.

**Fix**:
1. Check browser console for errors from `ChatView.jsx`.
2. Verify `userDoc.currentMatchId` is set (visible in Firestore Console under `users/{uid}`).
3. Verify the `matches/{matchId}/messages` subcollection exists in Firestore Console.
4. Ensure Firestore rules allow reads on `messages`.

---

### ❌ "Send failed" error when sending a message

**Cause**: Firestore `addDoc` rejected the write.

**Fix**:
1. Verify the user is authenticated.
2. Verify Firestore rules allow `create` on `matches/{matchId}/messages`.
3. Check for network issues in browser DevTools → Network tab.

---

### ❌ Unmatch does not clear the other user's match state

**Cause**: This is a **known limitation**. Only the current user's `currentMatchId` is set to `null` client-side. The other user's document and the match document itself are not cleaned up until a Cloud Function is implemented.

**Workaround**: Manually update the other user's document in Firestore Console, and delete the `matches/{matchId}` document if needed.

---

## Build & Deploy Issues

### ❌ `npm run build` fails with JSX errors

**Cause**: `@vitejs/plugin-react` is missing or misconfigured.

**Fix**:
1. Run `npm install` to ensure all dev dependencies are present.
2. Verify `vite.config.js`:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   export default defineConfig({ plugins: [react()] })
   ```

---

### ❌ GitHub Pages shows a blank page

**Cause**: The `base` path in `vite.config.js` does not match the repository name.

**Fix**: Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/blindly/',  // must match your GitHub repo name
  plugins: [react()]
})
```
Then redeploy: `npm run deploy`

---

### ❌ `npm run deploy` fails with "fatal: branch 'gh-pages' not found"

**Cause**: First-time deployment; `gh-pages` branch has not been created yet.

**Fix**: `gh-pages` creates the branch automatically on first run. Ensure you have push access to the repository and that your git remote is correctly configured.

---

## Onboarding Issues

### ❌ "Cancel profile setup?" dialog appears when navigating back on Step 0

**Behavior**: This is intentional. Pressing the back arrow on Step 0 shows a browser `confirm()` dialog. This guards against accidental navigation away from onboarding.

---

### ❌ Onboarding loops / re-triggers after completion

**Cause**: `onboardingCompleted` was not written to Firestore correctly by `ReviewStep.jsx`.

**Fix**:
1. Check Firestore Console → `users/{uid}` → verify `onboardingCompleted: true` is present.
2. Check browser console for errors during the ReviewStep submission.
3. Verify Firestore rules allow `create` (first-time) and `update` on `users/{userId}`.

---

## Debugging Tips

### Inspect Firestore data in real time

Firebase Console → Firestore Database → Browse collections and documents directly.

### Use Firebase Emulator Suite

For offline development without hitting production Firestore:

```bash
firebase emulators:start --only auth,firestore
```

Then update `src/firebase.js` to connect to the emulators:
```javascript
import { connectAuthEmulator } from 'firebase/auth'
import { connectFirestoreEmulator } from 'firebase/firestore'

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
}
```

### Enable verbose Firebase SDK logging

```javascript
import { setLogLevel } from 'firebase/firestore'
setLogLevel('debug')
```

Add this to `src/firebase.js` temporarily during debugging.

---

*Back to [Home](Home.md)*
