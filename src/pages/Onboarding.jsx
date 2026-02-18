import { Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Onboarding() {
    const navigate = useNavigate()

    return (
        <div className="app-container">
            <div className="ambient-orb orb-3" />

            <main className="hero">
                <div className="hero-badge">
                    <Sparkles size={14} />
                    <span>Profile Setup</span>
                </div>

                <h1 className="hero-title">
                    Welcome to <br />
                    <span className="hero-gradient">Blindly</span>
                </h1>

                <p className="hero-subtitle">
                    Your account is created. <br />
                    Complete your profile to start matching.
                </p>

                <button className="btn btn-primary" onClick={() => navigate('/app')}>
                    Enter App
                </button>
            </main>
        </div>
    )
}

export default Onboarding
