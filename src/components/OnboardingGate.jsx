import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function OnboardingGate({ children }) {
    const { userDoc, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && userDoc) {
            // Check for profile completeness
            // Rule: Tagline present, Prompts >= 4, Tags >= 3
            const incomplete =
                !userDoc.tagline ||
                /* !userDoc.prompts || userDoc.prompts.length < 4 || */ // Temporarily relaxed for dev
                !userDoc.displayName // Basic check for now

            if (incomplete) {
                // We are NOT redirecting yet because we haven't built the onboarding flow to fill these!
                // If we redirect now, we'll be in an infinite loop if the onboarding page itself is protected by this gate.
                // Important: Onboarding page must NOT use OnboardingGate.
                // But this component is for the APP area.

                // For now, let's just use a simple check to avoid blocking development
                // navigate('/onboarding')
            }
        }
    }, [userDoc, loading, navigate])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-black text-white">
                <Loader2 className="animate-spin" size={32} />
            </div>
        )
    }

    // If we have a userDoc but it's incomplete, we should ideally redirect.
    // But since I haven't built the Profile Setup form yet, I will comment out the strict redirect
    // and just render children.

    return children
}
