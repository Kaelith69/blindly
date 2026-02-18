import AuthForm from '../components/AuthForm'
import { Sparkles } from 'lucide-react'

function Auth() {
    return (
        <div className="app-container">
            {/* Ambient background orbs reuse */}
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />

            <div className="auth-page">
                <AuthForm />

                <div className="absolute top-6 left-6 flex items-center gap-2 text-white/50 text-sm">
                    {/* Minimal branding if needed, but AuthForm has title */}
                </div>
            </div>
        </div>
    )
}

export default Auth
