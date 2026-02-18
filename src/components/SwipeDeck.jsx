import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { X, Heart, Loader2, Sparkles } from 'lucide-react'
import { collection, query, where, getDocs, limit, serverTimestamp, doc, getDoc, setDoc, runTransaction } from 'firebase/firestore'
import { db, auth } from '../firebase'
import ProfileCard from './ProfileCard'

export default function SwipeDeck() {
    const [candidates, setCandidates] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [matchFound, setMatchFound] = useState(null)

    // Motion values for the top card
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-25, 25])
    const opacity = useTransform(x, [-200, 0, 200], [0.4, 1, 0.4])
    const likeOpacity = useTransform(x, [0, 120], [0, 1])
    const nopeOpacity = useTransform(x, [-120, 0], [1, 0])

    // Fetch candidates on mount
    useEffect(() => {
        async function fetchCandidates() {
            if (!auth.currentUser) return

            try {
                const uid = auth.currentUser.uid

                const q = query(
                    collection(db, "users"),
                    where("status", "==", "active"),
                    where("onboardingCompleted", "==", true),
                    limit(20)
                )

                // Get already-swiped IDs
                const swipesSnapshot = await getDocs(collection(db, "users", uid, "swipes"))
                const swipedIds = new Set(swipesSnapshot.docs.map(d => d.id))
                swipedIds.add(uid) // Exclude self

                const querySnapshot = await getDocs(q)
                const newCandidates = []

                querySnapshot.forEach((docSnap) => {
                    if (!swipedIds.has(docSnap.id)) {
                        newCandidates.push({ id: docSnap.id, ...docSnap.data() })
                    }
                })

                setCandidates(newCandidates)
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
        const uid = auth.currentUser.uid
        const swipeRef = doc(db, "users", uid, "swipes", candidate.id)

        // Advance card
        setCurrentIndex(prev => prev + 1)
        x.set(0)

        try {
            // Record swipe
            await setDoc(swipeRef, {
                direction,
                timestamp: serverTimestamp()
            })

            // Check for mutual like
            if (direction === 'right') {
                const matched = await checkForMatch(uid, candidate.id)
                if (matched) {
                    setMatchFound(candidate)
                }
            }
        } catch (e) {
            console.error("Swipe failed:", e)
        }
    }

    const checkForMatch = async (currentUid, targetUid) => {
        // Check if target already liked us
        const targetSwipeRef = doc(db, "users", targetUid, "swipes", currentUid)
        const targetSwipeSnap = await getDoc(targetSwipeRef)

        if (targetSwipeSnap.exists() && targetSwipeSnap.data().direction === 'right') {
            // MATCH! Create match document with transaction
            try {
                const matchId = [currentUid, targetUid].sort().join('_')
                const matchRef = doc(db, "matches", matchId)

                await runTransaction(db, async (transaction) => {
                    const matchDoc = await transaction.get(matchRef)
                    if (matchDoc.exists()) return // Already matched

                    // Create the match
                    transaction.set(matchRef, {
                        users: [currentUid, targetUid],
                        createdAt: serverTimestamp(),
                        status: 'active'
                    })

                    // Update both users
                    transaction.update(doc(db, "users", currentUid), {
                        currentMatchId: matchId
                    })
                    transaction.update(doc(db, "users", targetUid), {
                        currentMatchId: matchId
                    })
                })

                return true
            } catch (e) {
                console.error("Match creation failed:", e)
                return false
            }
        }

        return false
    }

    // Match overlay dismiss
    if (matchFound) {
        return (
            <div className="match-overlay">
                <div className="match-overlay-content">
                    <div className="match-sparkle">✨</div>
                    <h1 className="match-title">It's a Match!</h1>
                    <p className="match-subtitle">You and @{matchFound.handle} liked each other.</p>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '14px', justifyContent: 'center', marginTop: '16px' }}
                        onClick={() => setMatchFound(null)}
                    >
                        Start Chatting
                    </button>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="loading-screen">
                <Loader2 className="animate-spin" size={48} style={{ color: 'var(--color-accent)' }} />
            </div>
        )
    }

    if (currentIndex >= candidates.length) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
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
                            onDragEnd: (e, { offset }) => {
                                if (offset.x > 100) {
                                    handleSwipe('right')
                                } else if (offset.x < -100) {
                                    handleSwipe('left')
                                }
                            }
                        }}
                    />
                </AnimatePresence>

                {/* Swipe Overlays */}
                <motion.div style={{ opacity: likeOpacity }} className="swipe-overlay swipe-overlay-right">
                    <div className="swipe-label swipe-label-yes">YES</div>
                </motion.div>

                <motion.div style={{ opacity: nopeOpacity }} className="swipe-overlay swipe-overlay-left">
                    <div className="swipe-label swipe-label-nope">NOPE</div>
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
