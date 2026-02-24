# 📖 Usage Guide

> A guide for using an app that is, by design, very hard to misuse. But people find a way.

---

## Authentication

### Sign Up

1. Navigate to the Blindly app
2. Choose **Email** or **Phone** sign-in
3. For email: enter your address and set a password
4. For phone: enter your number and verify with the OTP sent via SMS

You are now a user. Congratulations on your existence in the database.

### Sign In

Same flow — enter credentials, you're in. Sessions persist across browser refreshes via Firebase Auth's local persistence.

### Sign Out

Available from your profile view in-app. This clears your local session. Your data stays in Firestore.

---

## Onboarding

First-time users are routed through a multi-step onboarding flow. You cannot skip it. The `OnboardingGate` component will redirect you back until you finish. It's not being rude, it's being thorough.

### Step 1: Handle
Pick your identifier. Think username, but more personality, less corporate. Letters, numbers, underscores. Make it something you'd actually want someone to remember.

### Step 2: Tagline
One sentence. Your first impression. This is what people see first on your card. Make it:
- Specific over generic
- Interesting over safe
- You, not who you think people want you to be

❌ `"I love to laugh and have fun"`  
✅ `"I will absolutely judge you for your coffee order and I'm not sorry"`

### Step 3: Tags
Select interest tags that define you. These aren't for an algorithm — they're conversation starters. Pick the ones that would make you stop and say "wait, same."

### Step 4: Prompts
Answer 1–3 prompts. These are your personality in written form. Each prompt has a question (you can pick from a list or the provided ones) and your answer. This is where people actually decide if they want to swipe right.

Once all steps are complete, `onboardingCompleted` is set to `true` on your user document and you land on the main swipe deck.

---

## The Swipe Deck

The core feature. Here you see profiles one at a time — no grid, no gallery, no faces.

Each card shows:
- The user's **handle**
- Their **tagline**
- Their **interest tags**
- Their **prompt answers**

### How to Swipe

| Action | Meaning |
|---|---|
| Drag card right / tap ✓ | Right swipe — you're interested |
| Drag card left / tap ✗ | Left swipe — not this one |

Cards animate with Framer Motion spring physics. If you enjoy how it feels to throw cards around, that is entirely intentional.

### When the Deck is Empty

You've seen everyone currently available. This happens. Come back later, or stare at the screen and rethink your choices. Either works.

---

## Matching

When you swipe right on someone **and they've also swiped right on you**, a match is created via Firestore transaction. This is:

1. **Atomic** — both users are updated simultaneously. No partial states.
2. **Instant** — `onSnapshot` fires on both ends the moment the transaction commits.
3. **Exclusive** — you're now in a single-match lock. The swipe deck is paused until you unmatch.

Both users see a "It's a match!" notification and are taken to the chat view.

---

## Chat

Once matched, you have a private real-time chat with your match. Messages are:

- Delivered instantly via Firestore `onSnapshot`
- Stored in `matches/{matchId}/messages`
- Only readable by the two matched users (enforced by Firestore rules)
- Ordered chronologically

There's no typing indicator, read receipts, or seen timestamps — yet. Keep it a little mysterious.

---

## Viewing a Match Profile

Within the chat, you can view your match's full profile — their prompts, tags, and tagline. Everything you originally swiped on, for reference.

---

## Unmatching

The unmatch button is available from within the chat or the match view. When you unmatch:

1. The match document's `status` changes to `inactive`
2. Both users' `currentMatchId` is cleared
3. The swipe deck reopens for both users
4. The chat history remains in Firestore but is no longer accessible via the app UI

Unmatching does not notify the other person with a push notification. It just... quietly ends. Like most things.

---

## Profile View

Access your own profile from the bottom navigation. You can see how your profile looks to other users — the same card view they see in the deck.

> Profile **editing** post-onboarding is on the roadmap. For now, what you set up is what people see. Choose wisely.

---

## Navigation

The bottom navigation (`BottomNav.jsx`) provides access to:

| Tab | Destination |
|---|---|
| 🃏 Discover | Swipe deck |
| 💬 Chat | Active match conversation |
| 👤 Profile | Your profile view |

The Chat tab is only active when you have a current match.

---

<div align="center">

*Use it slowly. It's not a buffet.*

</div>
