import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function OnboardingGate({ children }) {
    const { currentUser, userDoc, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return

        // No user at all — ProtectedRoute should handle this,
        // but guard defensively anyway
        if (!currentUser) return

        // Case 1: No Firestore doc yet → must onboard
        // Case 2: Doc exists but onboardingCompleted is not true → must onboard
        const needsOnboarding = !userDoc || !userDoc.onboardingCompleted

        if (needsOnboarding) {
            navigate('/onboarding', { replace: true })
        }
    }, [currentUser, userDoc, loading, navigate])

    if (loading) {
        return (
            <div className="loading-screen">
                <Loader2 className="animate-spin" size={32} />
            </div>
        )
    }

    // If onboarding is not complete, show nothing while redirecting
    if (!userDoc || !userDoc.onboardingCompleted) {
        return (
            <div className="loading-screen">
                <Loader2 className="animate-spin" size={32} />
            </div>
        )
    }

    return children
}
