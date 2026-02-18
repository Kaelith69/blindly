import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { X, Heart, Loader2, Sparkles } from 'lucide-react'
import { collection, query, where, getDocs, limit, serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import ProfileCard from './ProfileCard'

export default function SwipeDeck() {
    const [candidates, setCandidates] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)

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

        // Record swipe in Firestore
        const uid = auth.currentUser.uid
        const swipeRef = doc(db, "users", uid, "swipes", candidate.id)

        // Advance card
        setTimeout(() => {
            setCurrentIndex(prev => prev + 1)
            x.set(0)
        }, 200)

        try {
            await setDoc(swipeRef, {
                direction: direction,
                timestamp: serverTimestamp()
            })

            if (direction === 'right') {
                await checkForMatch(uid, candidate.id)
            }
        } catch (e) {
            console.error("Swipe failed", e)
        }
    }

    const checkForMatch = async (currentUid, targetUid) => {
        const targetSwipeRef = doc(db, "users", targetUid, "swipes", currentUid)
        const targetSwipeSnap = await getDoc(targetSwipeRef)

        if (targetSwipeSnap.exists() && targetSwipeSnap.data().direction === 'right') {
            console.log("IT'S A MATCH!")
            alert("It's a Match! 🎉")
        }
    }

    if (loading) {
        return (
            <div className="loading-screen">
                <Loader2 className="spinner" size={48} style={{ color: 'var(--color-accent)' }} />
            </div>
        )
    }

    if (currentIndex >= candidates.length) {
        return (
            <div className="no-cards">
                <Sparkles size={48} style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-md)' }} />
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
