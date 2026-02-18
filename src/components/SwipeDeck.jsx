import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { X, Heart, Loader2 } from 'lucide-react'
import { collection, query, where, getDocs, limit, addDoc, serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import ProfileCard from './ProfileCard'

export default function SwipeDeck() {
    const [candidates, setCandidates] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [exitDirection, setExitDirection] = useState(null)

    // Motion values for the top card
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-30, 30])
    const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5])
    const likeOpacity = useTransform(x, [0, 100], [0, 1])
    const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

    // Fetch candidates on mount
    useEffect(() => {
        async function fetchCandidates() {
            if (!auth.currentUser) return

            try {
                const uid = auth.currentUser.uid

                // 1. Get IDs of users already swiped on
                // Ideally this should be computed or stored in a way to avoid large reads
                // For MVP, we'll just fetch a few recent swipes or rely on client-side filtering if small scale
                // A better approach: Store 'swipedUsers' subselection or array in user doc (limit 100)

                // MVP: Just fetch all users except self (and naive filter)
                // Real app: Needs robust recommendation engine Cloud Function

                const q = query(
                    collection(db, "users"),
                    where("status", "==", "active"),
                    where("onboardingCompleted", "==", true),
                    limit(20)
                )

                // Also fetch swipes
                const swipesSnapshot = await getDocs(collection(db, "users", uid, "swipes"));
                const swipedIds = new Set(swipesSnapshot.docs.map(doc => doc.id))
                swipedIds.add(uid) // Don't show self

                const querySnapshot = await getDocs(q)
                const newCandidates = []

                querySnapshot.forEach((doc) => {
                    if (!swipedIds.has(doc.id)) {
                        newCandidates.push({ id: doc.id, ...doc.data() })
                    }
                })

                setCandidates(newCandidates) // Randomize if needed
            } catch (error) {
                console.error("Error fetching candidates:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCandidates()
    }, [])

    const handleSwipe = async (direction) => {
        if (currentIndex >= candidates.length) return

        const candidate = candidates[currentIndex]
        setExitDirection(direction) // Triggers exit animation

        // Record swipe in Firestore
        const uid = auth.currentUser.uid
        const swipeRef = doc(db, "users", uid, "swipes", candidate.id)

        // Optimistic UI update - remove card after delay
        setTimeout(() => {
            setCurrentIndex(prev => prev + 1)
            setExitDirection(null)
            x.set(0)
        }, 200)

        try {
            // Write swipe
            await setDoc(swipeRef, {
                direction: direction,
                timestamp: serverTimestamp()
            })

            // Use custom logic or triggers for match
            // Here: Client-side match check (not secure for real production but fine for MVP)
            if (direction === 'right') {
                await checkForMatch(uid, candidate.id)
            }
        } catch (e) {
            console.error("Swipe failed", e)
        }
    }

    const checkForMatch = async (currentUid, targetUid) => {
        // Check if target has already liked current user
        const targetSwipeRef = doc(db, "users", targetUid, "swipes", currentUid)
        const targetSwipeSnap = await getDoc(targetSwipeRef)

        if (targetSwipeSnap.exists() && targetSwipeSnap.data().direction === 'right') {
            console.log("IT'S A MATCH!")
            // Create match document
            // Update both users currentMatchId
            // This should transactionally happen
            // For now, let's just log it. Match Logic usually handled by Cloud Function
            alert("It's a Match! (Logic Pending)")
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin text-accent" size={48} />
            </div>
        )
    }

    if (currentIndex >= candidates.length) {
        return (
            <div className="no-cards">
                <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                <h2>No more profiles</h2>
                <p>Check back later for new matches.</p>
            </div>
        )
    }

    const activeCandidate = candidates[currentIndex]

    return (
        <div className="swipe-deck-container">
            <div className="card-stack">
                <AnimatePresence>
                    <ProfileCard
                        key={activeCandidate.id}
                        user={activeCandidate}
                        style={{ x, rotate, opacity }}
                        dragHandlers={{
                            drag: "x",
                            dragConstraints: { left: 0, right: 0 },
                            onDragEnd: (e, { offset, velocity }) => {
                                const swipeThreshold = 100;
                                if (offset.x > swipeThreshold) {
                                    handleSwipe('right');
                                } else if (offset.x < -swipeThreshold) {
                                    handleSwipe('left');
                                }
                            }
                        }}
                    />
                </AnimatePresence>

                {/* Swipe Overlays (Like/Nope) */}
                <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 right-10 z-50 pointer-events-none">
                    <div className="border-4 border-green-500 text-green-500 font-bold text-4xl px-4 py-2 rounded-lg transform rotate-12">
                        YES
                    </div>
                </motion.div>

                <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 left-10 z-50 pointer-events-none">
                    <div className="border-4 border-red-500 text-red-500 font-bold text-4xl px-4 py-2 rounded-lg transform -rotate-12">
                        NOPE
                    </div>
                </motion.div>
            </div>

            <div className="swipe-controls">
                <button className="swipe-btn btn-pass" onClick={() => handleSwipe('left')}>
                    <X size={32} />
                </button>
                <button className="swipe-btn btn-like" onClick={() => handleSwipe('right')}>
                    <Heart size={32} fill="currentColor" />
                </button>
            </div>
        </div>
    )
}
