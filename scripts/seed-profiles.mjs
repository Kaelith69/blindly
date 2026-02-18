// Seed 10 demo profiles into Firestore
// Uses Firebase client SDK — no admin credentials needed
// Run: node scripts/seed-profiles.mjs

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const app = initializeApp({
    apiKey: "AIzaSyBesezwyDv6aaJwfI6mma6uTHAPogQn3a8",
    authDomain: "blindly-dating-app-2026.firebaseapp.com",
    projectId: "blindly-dating-app-2026",
})

const db = getFirestore(app)

const demoProfiles = [
    {
        handle: "luna_writes",
        birthYear: 2000,
        gender: "Female",
        location: { countryCode: "IN", approxCity: "Mumbai" },
        tagline: "I fall in love with minds before faces.",
        tags: ["Books", "Writing", "Philosophy", "Music", "Art"],
        prompts: [
            { question: "I believe...", answer: "that the best conversations happen after midnight with no plan to sleep." },
            { question: "Key to my heart...", answer: "Send me a song you've never shared with anyone else." }
        ],
    },
    {
        handle: "the_overthinker",
        birthYear: 1999,
        gender: "Male",
        location: { countryCode: "IN", approxCity: "Delhi" },
        tagline: "Accidentally deep at 2am. Intentionally funny at 2pm.",
        tags: ["Psychology", "Movies", "Cooking", "Philosophy", "Tech"],
        prompts: [
            { question: "My unpopular opinion...", answer: "Texting > calling. Always. Fight me." },
            { question: "I spend too much time...", answer: "Rewriting messages that were fine the first time." }
        ],
    },
    {
        handle: "chai_and_chaos",
        birthYear: 2001,
        gender: "Female",
        location: { countryCode: "IN", approxCity: "Bangalore" },
        tagline: "Chaotic good. Fueled by chai and existential dread.",
        tags: ["Music", "Travel", "Foodie", "Art", "Astrology"],
        prompts: [
            { question: "Worst first date idea...", answer: "Going to a movie. You literally can't talk. That defeats the whole point." },
            { question: "My biggest obsession...", answer: "Making Spotify playlists for moods that don't have names." }
        ],
    },
    {
        handle: "silent_storm",
        birthYear: 1998,
        gender: "Male",
        location: { countryCode: "IN", approxCity: "Pune" },
        tagline: "Quiet until you bring up black holes or Berserk.",
        tags: ["Science", "Gaming", "Books", "Fitness", "History"],
        prompts: [
            { question: "The truth nobody accepts...", answer: "Most people don't want advice. They want someone to listen." },
            { question: "I'm looking for...", answer: "Someone who won't make fun of my 3am Wikipedia rabbit holes." }
        ],
    },
    {
        handle: "pixel_poet",
        birthYear: 2002,
        gender: "Non-Binary",
        location: { countryCode: "IN", approxCity: "Kolkata" },
        tagline: "I think in metaphors and speak in memes.",
        tags: ["Art", "Photography", "Writing", "Music", "Meditation"],
        prompts: [
            { question: "Best way to ask me out...", answer: "Share your most embarrassing memory. Vulnerability is hot." },
            { question: "My golden rule...", answer: "If a song makes you cry, it's a good song." }
        ],
    },
    {
        handle: "nerd_with_soul",
        birthYear: 1997,
        gender: "Male",
        location: { countryCode: "IN", approxCity: "Hyderabad" },
        tagline: "Engineer by day. Poet by existential crisis.",
        tags: ["Tech", "Books", "Music", "Science", "Cooking"],
        prompts: [
            { question: "I believe...", answer: "The universe is too elegant to be an accident, but too chaotic to be planned." },
            { question: "I spend too much time...", answer: "Explaining to people that pineapple on pizza is objectively superior." }
        ],
    },
    {
        handle: "wanderlust_soul",
        birthYear: 2000,
        gender: "Female",
        location: { countryCode: "IN", approxCity: "Jaipur" },
        tagline: "Every stranger has a story. I want to hear yours.",
        tags: ["Travel", "Photography", "Nature", "Spirituality", "Foodie"],
        prompts: [
            { question: "My biggest obsession...", answer: "Trying every street food stall in every city I visit." },
            { question: "Key to my heart...", answer: "Take me on a walk with no destination and good conversation." }
        ],
    },
    {
        handle: "sleep_deprived",
        birthYear: 2001,
        gender: "Male",
        location: { countryCode: "IN", approxCity: "Chennai" },
        tagline: "Running on caffeine, curiosity, and zero social skills.",
        tags: ["Gaming", "Tech", "Movies", "Music", "Psychology"],
        prompts: [
            { question: "My unpopular opinion...", answer: "Introverts make better partners. We actually listen." },
            { question: "Worst first date idea...", answer: "Meeting each other's friends. That's a season 3 arc, not a pilot episode." }
        ],
    },
    {
        handle: "old_soul_23",
        birthYear: 2003,
        gender: "Female",
        location: { countryCode: "IN", approxCity: "Lucknow" },
        tagline: "Born in the wrong era. Thriving anyway.",
        tags: ["History", "Books", "Music", "Art", "Philosophy"],
        prompts: [
            { question: "The truth nobody accepts...", answer: "We're all just pretending to be adults. Nobody knows what they're doing." },
            { question: "I'm looking for...", answer: "Someone who'll read poetry to me without calling it cringe." }
        ],
    },
    {
        handle: "mountain_monk",
        birthYear: 1996,
        gender: "Male",
        location: { countryCode: "IN", approxCity: "Manali" },
        tagline: "I traded the corporate ladder for mountain trails. No regrets.",
        tags: ["Nature", "Fitness", "Meditation", "Photography", "Cooking"],
        prompts: [
            { question: "My golden rule...", answer: "If it won't matter in 5 years, don't spend more than 5 minutes worrying about it." },
            { question: "Best way to ask me out...", answer: "Suggest a hike. If you say 'let's get brunch', we're not compatible." }
        ],
    }
]

async function seed() {
    console.log('Seeding 10 demo profiles...\n')

    for (const profile of demoProfiles) {
        const id = `demo_${profile.handle}`
        await setDoc(doc(db, 'users', id), {
            ...profile,
            status: 'active',
            onboardingCompleted: true,
            currentMatchId: null,
            trustLevel: 0,
            createdAt: new Date(),
        })
        console.log(`  ok @${profile.handle} (${profile.gender}, ${profile.location.approxCity})`)
    }

    console.log('\nDone! 10 profiles seeded.')
    process.exit(0)
}

seed().catch(err => {
    console.error('Seed failed:', err.message)
    process.exit(1)
})
