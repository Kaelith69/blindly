Alright, captain of Team Personality > Thirst. Here’s the full, end-to-end blueprint for **Blindly** with Firebase as the backend. It’s specific, opinionated, and production-minded — so you can build without drowning in “uhh what now?”

---

# Blindly — Full Firebase Blueprint (Flutter)

## 0) Product North Star

* **Promise:** Text-only dating. No pics. No performative peacocking. One active match at a time to keep you honest.
* **Core Rules:**

    1. Swipe right = like, left = discard.
    2. A like becomes a match only if the other person accepts within **48h**.
    3. **Exactly one active match** per user. If you want to swipe more, unmatch first.
    4. Messaging opens only after match. Text-only, emoji OK, zero media.
    5. Minimalist black/white UI with buttery animations; AMOLED-first.

---

## 1) Firebase Stack & Services

**Required**

* **Firebase Auth:** Phone/email OTP.
* **Cloud Firestore:** Primary database (document model below).
* **Cloud Functions (2nd gen):** Business logic, transactions, cron, moderation, push fanout.
* **Cloud Scheduler + Pub/Sub:** Nightly/hourly jobs (like expiry).
* **Firebase Cloud Messaging (FCM):** Push notifications.
* **Firebase App Check:** Protects backend from abuse (required for prod).
* **Firebase Remote Config:** Feature flags (rate limits, copy tweaks).
* **Google Analytics (GA4) + BigQuery Export:** Funnels, retention, matchmaking telemetry.

**Optional but smart**

* **Cloud Logging / Error Reporting** (via Google Cloud): observability.
* **Vertex AI / Perspective API** (moderation) — or keep a rule-based filter first.

---

## 2) Firestore Data Model (Collections & Docs)

> Naming is decisive. Keep IDs short; use server timestamps; index only what you query.

### `users/{userId}`

```
handle             string  // unique @name
createdAt          timestamp
birthYear          number
gender             string   // optional; string to avoid schema fights
location           map { countryCode, approxCity, lat?, lon? }  // coarse
tags               array<string>  // ["sci-fi","gaming","books"]
prompts            array<map>  // [{id:"p1", q:"I believe...", a:"..."}]
tagline            string (<= 80)
lastActiveAt       timestamp
status             string  // active | banned | deactivated
currentMatchId     string | null
likesSentCount     number
likesRecvCount     number
trustLevel         number  // 0..3; gates rate limits
appPushToken       string  // FCM token (also mirrored in tokens collection)
appVersion         string
```

**Indexes**

* `status` + `lastActiveAt` (composite) for discovery.
* `handle` (unique via Cloud Function guard).

---

### `deck/{regionShard}/candidates/{userId}`

Server-maintained view for swiping (denormalized, optional but recommended for performance).

```
userId           string
score            number   // matchmaking score for the viewer’s cohort
updatedAt        timestamp
```

**Why:** Lets you precompute candidates by region or cohort, then page quickly.

---

### `likes/{likeId}`

(Write-once by liker; read by recipient; expires in 48h.)

```
likeId            string
fromUserId        string
toUserId          string
createdAt         timestamp
expiresAt         timestamp
status            string   // pending | converted | rejected | expired
```

**Indexes**

* `toUserId` + `status` + `expiresAt` (composite)  → “Likes received” list.
* `fromUserId` + `status`                       → analytics/rate-limit checks.

---

### `matches/{matchId}`

(One row per matched pair. Acts as parent for messages.)

```
matchId           string
userA             string
userB             string
createdAt         timestamp
active            boolean   // false if someone unmatches
unmatchedBy       string | null
lastMessageAt     timestamp
```

**Indexes**

* `userA` + `active`, `userB` + `active` (single-field ok).
* `lastMessageAt` (ordering chat list).

---

### `matches/{matchId}/messages/{messageId}`

(Flat messages per match; strictly text.)

```
messageId         string
fromUserId        string
text              string (<= 1000, validated by CF)
createdAt         timestamp
delivered         boolean
readBy            map<string, boolean>  // { userA: true/false, userB: true/false }
```

**Indexes**

* `createdAt` (for pagination).

---

### `reports/{reportId}`

```
reportId          string
reportedUserId    string
reporterUserId    string
context           string  // "message" | "profile"
matchId?          string
messageId?        string
reason            string
createdAt         timestamp
status            string  // open | actioned | dismissed
```

---

### `system/limits`

Server-managed constants (or use Remote Config).

```
likeWindowHours        number  // 48
dailyLikeQuotaBase     number  // e.g., 100
maxActiveMatches       number  // 1 (never change unless product pivots)
```

---

## 3) Security Rules (Core Snippets)

> You’ll expand these, but lock the big doors on day one.

```ruby
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    function isSignedIn() { return request.auth != null; }
    function uid() { return request.auth.uid; }

    match /users/{userId} {
      allow read: if isSignedIn(); // or narrower if you want
      allow create: if isSignedIn() && userId == uid();
      allow update: if isSignedIn() && userId == uid()
                    && !('status' in request.resource.data) // status only server
                    && !('currentMatchId' in request.resource.data); // server only
    }

    match /likes/{likeId} {
      allow create: if isSignedIn()
        && request.resource.data.fromUserId == uid()
        && request.resource.data.status == 'pending';
      allow read: if isSignedIn()
        && (resource.data.fromUserId == uid() || resource.data.toUserId == uid());
      allow update, delete: if false; // server only (convert/reject/expire)
    }

    match /matches/{matchId} {
      allow read: if isSignedIn()
        && (resource.data.userA == uid() || resource.data.userB == uid());
      allow create, update, delete: if false; // server via CF only
    }

    match /matches/{matchId}/messages/{messageId} {
      allow create: if isSignedIn()
        && get(/databases/$(db)/documents/matches/$(matchId)).data.active == true
        && (get(/databases/$(db)/documents/matches/$(matchId)).data.userA == uid()
            || get(/databases/$(db)/documents/matches/$(matchId)).data.userB == uid())
        && request.resource.data.text.size() > 0
        && request.resource.data.text.size() <= 1000
        && !('readBy' in request.resource.data); // server updates read receipts
      allow read: if isSignedIn()
        && (get(/databases/$(db)/documents/matches/$(matchId)).data.userA == uid()
            || get(/databases/$(db)/documents/matches/$(matchId)).data.userB == uid());
      allow update, delete: if false; // server controls receipts/deletes
    }

    match /reports/{reportId} {
      allow create: if isSignedIn()
        && request.resource.data.reporterUserId == uid();
      allow read: if false; // private to server
      allow update, delete: if false;
    }
  }
}
```

**App Check:** enforce in Firebase console (Realtime DB/Firestore/Functions/Storage).

---

## 4) Cloud Functions (2nd Gen) — Business Logic

**Runtime:** Node 20, TypeScript.
**Key patterns:** Use **Transactions** for anything touching `currentMatchId` or converting likes. All client-sensitive mutations happen server-side via callable HTTPS functions.

### Callable Endpoints

1. **`swipe`** — user swipes on another.

* **Input:** `{ toUserId: string, direction: 'left' | 'right' }`
* **Flow (right):**

    * Verify user has `currentMatchId == null`. If not, **fail** with `ACTIVE_MATCH_LOCK`.
    * Rate-limit (daily likes) with a per-user counter doc (increment in a transaction).
    * Create `likes` doc (`status='pending'`, `expiresAt=now+48h`) **unless** one already exists.
    * Send push to `toUserId`: “You’ve got a like”.
* **Flow (left):** log event; no write needed unless you want analytics.

2. **`confirmLike`** — recipient accepts like (attempts to create match).

* **Input:** `{ likeId: string }`
* **Transaction:**

    * Read like; check `status=='pending'` and `expiresAt>now`.
    * Check both users: `currentMatchId==null`.
    * Create `matches/{matchId}` with `active=true`.
    * Update `users/{A,B}.currentMatchId = matchId`.
    * Update like `status='converted'`.
    * Push notifications to both; return `matchId`.

3. **`rejectLike`**

* **Input:** `{ likeId }`
* **Action:** Set like `status='rejected'`. No match creation, notify liker.

4. **`unmatch`**

* **Input:** `{ matchId }`
* **Transaction:**

    * Verify caller is `userA` or `userB`.
    * Set match `active=false`, `unmatchedBy=caller`.
    * Clear `users/{A,B}.currentMatchId = null`.
    * Optional: write a small `blocks/{pair}` doc to impose a 7-day cooldown.

5. **`sendMessage`** (optional; or let client write and server validates via rules)

* **Input:** `{ matchId, text }`
* **Server:** Validate profanity/length, write to subcollection, update `lastMessageAt`, push to peer.

6. **`markRead`**

* **Input:** `{ matchId, messageId }`
* **Server:** Update `readBy[uid]=true`.

7. **`fetchDeck`**

* **Input:** `{ pageToken?: string }`
* **Server:** Returns N candidate userIds + small snippets. (Or fetch directly via Firestore queries.)

    * Filters: not blocked, not matched with, not already liked, not self, status active, prompt completeness.

### Scheduled Jobs

* **`expireLikes` (every 15 min):**

    * Query `likes` where `status='pending'` and `expiresAt < now`.
    * Batch update to `status='expired'`.
    * Optional push to liker: “Your like expired.”

* **`cleanupInactiveMatches` (daily):**

    * Optional: flag matches with no messages after N days → soft nudge or auto-close (product choice).

* **`rebuildDeckShards` (hourly):**

    * Recompute candidate lists / scores (if you use `deck/` denormalization).

### Moderation Hooks

* **`onCreate(messages)` trigger:** Lightweight text checks (regex bad words first; ML later).

    * If severe violation → auto-delete and warn; 3 strikes → ban.

---

## 5) Push Notification Strategy (FCM)

**Token storage**

* Store latest token in `users.appPushToken` and in `tokens/{uid}/{tokenId}` for multi-device.

**Topics (optional)**

* Avoid broad topics; target direct tokens (1:1 app).

**Events**

* New like (recipient).
* Like accepted → match (both).
* New message (recipient).
* Like expiring soon (recipient) – 6h before expiry (nice growth lever).

---

## 6) Flutter Architecture

**State mgmt:** Riverpod (hooks\_riverpod).
**Navigation:** `go_router`.
**Dirs:**

```
lib/
  core/        // theme, constants, errors
  data/        // repos (auth_repo, user_repo, match_repo, message_repo)
  models/      // dart data classes (freezed)
  features/
    onboarding/
    swipe/
    likes/
    chat/
    settings/
  widgets/
```

**Key Providers**

* `authProvider` (FirebaseAuth).
* `userProvider` (current user doc stream).
* `deckProvider` (async list of candidates).
* `likesProvider` (stream of incoming likes).
* `activeMatchProvider` (stream of current match).
* `messagesProvider(matchId)` (paginated stream).

**Packages**

* `firebase_core`, `firebase_auth`, `cloud_firestore`, `cloud_functions`, `firebase_messaging`.
* `hooks_riverpod`, `freezed`, `json_serializable`.
* `go_router`, `flutter_secure_storage`, `intl`.
* (Animations) built-in: `AnimatedBuilder`, `ImplicitlyAnimated`, `SpringSimulation`.

**UI Components**

* `ProfileCard`: text-only layout (tagline + 2–3 prompt answers + tags).
* `SwipeDeck`: stack with rotation/translation; left/right affordance.
* `LikesScreen`: list with 48h countdown chips; “Match” / “Reject”.
* `ChatScreen`: reversed ListView, message bubbles, input composer.
* `MatchGuard`: gate that blocks swipe if `activeMatchProvider != null`.

**Theme**

* **Colors:** `Colors.black` background, `Colors.white` text; use 90–95% white for large blocks to reduce burn.
* **Typography:** Inter/Roboto; base 18sp; prompt questions 20–22sp.
* **Haptics:** light impact on swipe accept, medium on match.

---

## 7) Client–Server Flows (Happy Paths)

### Swipe Right

1. Gesture completes → optimistic UI “liked” animation.
2. Call CF `swipe(toUserId, 'right')`.
3. If `ACTIVE_MATCH_LOCK` → roll back and show modal “Unmatch to continue.”
4. Else success → nothing else for now.

### Confirm Like → Match

1. User taps **Match** on a like.
2. `confirmLike(likeId)` transaction enforces both free.
3. If either already matched → show toast “They matched with someone else.”
4. On success → navigate to **Chat**, play “Matched!” microinteraction, send push to both.

### Unmatch

1. In Chat → overflow → **Unmatch**.
2. `unmatch(matchId)` clears both `currentMatchId` and closes chat.
3. Swipe re-enabled.

---

## 8) Rate Limiting & Abuse

* **Daily likes quota:** `system/limits.dailyLikeQuotaBase` + trust multipliers (0→50, 1→100, 2→200). Tracked in `counters/{uid}/YYYYMMDD` doc; increment checked in `swipe` txn.
* **Swipe velocity guard:** If >X swipes/minute → soft block + CAPTCHA step (use SafetyNet/Play Integrity).
* **Text filters:** Regex list for slurs/solicitations; escalate to Perspective/Vertex later.
* **Report/Block:** Report creates `reports` doc; Block writes a `blocks/{uid}/{blockedId}` doc; deck/filter excludes blocked pairs.

---

## 9) Discovery / Matching Heuristics (MVP)

* **Eligibility filters:** active status, age prefs compatible, distance (coarse), not blocked, has minimum prompts.
* **Scoring:**
  `score = 0.6 * promptSemanticSimilarity + 0.25 * tagOverlap + 0.1 * freshnessBoost + 0.05 * serendipityNoise`
* **Implementation:** precompute embeddings client-side (on-device) or server-side via scheduled job; store top N in `deck/{shard}/candidates`. MVP: keep it simple — tag overlap + freshness.

---

## 10) Error Codes (return from Functions)

* `ACTIVE_MATCH_LOCK` — user has active match.
* `LIKE_ALREADY_EXISTS` — duplicate like.
* `LIKE_EXPIRED` — cannot confirm.
* `LIKE_NOT_FOUND` — invalid like.
* `TARGET_UNAVAILABLE` — recipient banned/deactivated.
* `RATE_LIMITED` — daily like quota exceeded.
* `MODERATION_BLOCKED` — text violated policy.
* `INTERNAL` — generic (log correlation ID).

Show humanized toasts, not these goblins.

---

## 11) Analytics (GA4 + BigQuery)

**Events**

* `signup_complete`, `onboarding_complete`
* `deck_view`, `swipe_left`, `swipe_right`
* `like_received`, `like_confirmed`, `like_rejected`, `like_expired`
* `match_created`, `unmatch`
* `message_send`, `message_read`
* `rate_limited`, `moderation_violation`

**Core KPIs**

* Match rate = matches / likes
* Time to first match
* Match→chat conversion
* Avg messages per match
* Churn at 1/7/30 day
* Abuse rate (reports / DAU)

Export to BigQuery for cohort analysis.

---

## 12) Deployment & Environments

* **Projects:** `blindly-dev`, `blindly-staging`, `blindly-prod`.
* **Function regions:** choose nearest to majority of users (e.g., `asia-south1` for India).
* **CI/CD:** GitHub Actions → build Android IPA/APK; deploy Functions and Rules with `firebase-tools`.
* **Feature Flags:** Remote Config for: `likeWindowHours`, `dailyLikeQuotaBase`, `showTypingIndicator`, `enableDeckShard`.

---

## 13) MVP Test Plan

* **Unit:**

    * `confirmLike` transaction: (free/free) → match; (busy/free) → fail; expiry handling.
    * Rate limit maths.
* **Widget:** Swipe deck gesture, Likes countdown chip, Chat composer send/scroll.
* **Integration (emulator suite):** Auth → Swipe → Like → Confirm → Chat → Unmatch.
* **Load:** Write storm on `messages` subcollection (target 50 msg/sec/match burst).
* **Security:** Attempt client writes to forbidden fields; verify rules block.

---

## 14) Sample Function Logic (pseudo-TS)

```ts
export const confirmLike = onCall(async (req) => {
  const { likeId } = req.data;
  const likeRef = db.collection('likes').doc(likeId);

  return db.runTransaction(async (tx) => {
    const likeSnap = await tx.get(likeRef);
    if (!likeSnap.exists) throw new HttpsError('not-found', 'LIKE_NOT_FOUND');
    const like = likeSnap.data();

    if (like.status !== 'pending' || like.expiresAt.toDate() < new Date())
      throw new HttpsError('failed-precondition', 'LIKE_EXPIRED');

    const aRef = db.collection('users').doc(like.fromUserId);
    const bRef = db.collection('users').doc(like.toUserId);
    const [a, b] = (await tx.getAll(aRef, bRef)).map(s => s.data());

    if (a.currentMatchId || b.currentMatchId)
      throw new HttpsError('failed-precondition', 'ACTIVE_MATCH_LOCK');

    const matchRef = db.collection('matches').doc();
    tx.set(matchRef, {
      matchId: matchRef.id,
      userA: like.fromUserId,
      userB: like.toUserId,
      createdAt: FieldValue.serverTimestamp(),
      active: true,
      unmatchedBy: null,
      lastMessageAt: FieldValue.serverTimestamp()
    });

    tx.update(aRef, { currentMatchId: matchRef.id });
    tx.update(bRef, { currentMatchId: matchRef.id });
    tx.update(likeRef, { status: 'converted' });

    return { matchId: matchRef.id };
  });
});
```

*Do the same pattern for `unmatch` and rate-limited `swipe`.*

---

## 15) Minimal Flutter TODO (Stage 1–3)

* **Theme:** black/white, large type; add `HapticFeedback.lightImpact()` on like.
* **Onboarding:** 4 prompts + tags + tagline.
* **SwipeDeck:** custom `GestureDetector` + `AnimatedBuilder`; on like → call `swipe`.
* **Likes Tab:** listens to `likes` where `toUserId == me` and `status=='pending'` sorted by `expiresAt`; chip shows countdown.
* **Confirm/Reject:** calls `confirmLike`/`rejectLike`. On success → navigate to `ChatScreen(matchId)`.

---

## 16) Copy & Micro-Interactions (steal these)

* **Empty deck:** “No faces. No filters. Check back soon.”
* **Active-match lock modal:** “You already have someone. Give 100% — or unmatch.”
* **Match toast:** “It’s a match. Use your words.”
* **Like expiring:** “Tick tock. 6 hours left to decide.”

---

## 17) What NOT to Do (future-you will thank me)

* Don’t let the client set `currentMatchId` or match fields. Ever.
* Don’t store messages in user docs; always under `matches/{id}/messages`.
* Don’t allow swipe when offline to “queue” writes; you’ll dupe likes. Gate it.
* Don’t over-index Firestore. Start with the 3 composites listed; add surgically.
* Don’t ignore App Check; script kiddies will farm swipes.

---

## 18) Rollout Plan (quick)

* **Alpha (internal):** 10–20 friends. Focus: flows & bugs.
* **Closed Beta (invites):** 100–300 users; enable analytics; refine moderation.
* **Public Beta:** Enable rate limits, add soft-nudges (expiring likes).
* **1.0:** App Store + Play Store; start gentle growth loops (share match quotes? still text-only).

---

If you want, I can spin up:

* **Firestore Rules v1** file ready to paste,
* **Functions index.ts** skeleton with all endpoints stubbed, or
* **Flutter SwipeDeck widget** (polished physics, ready to drop in).

Tell me which code chunk you want first and I’ll hand you the goods.
