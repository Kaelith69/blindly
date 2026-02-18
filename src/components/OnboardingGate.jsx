import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function OnboardingGate({ children }) {
    const { userDoc, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && userDoc) {
            const incomplete =
                !userDoc.tagline ||
                !userDoc.handle // Basic check for now
            if (incomplete) {
                // Uncomment when onboarding form is built:
                if (window.location.pathname !== '/onboarding') {
                    navigate('/onboarding', { replace: true })
                }
            }
        }
    }, [userDoc, loading, navigate])

    if (loading) {
        return (
            <div className="loading-screen">
                <Loader2 className="animate-spin" size={32} />
            </div>
        )
    }

    return children
}
