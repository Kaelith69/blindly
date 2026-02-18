import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Sparkles, MessageCircle } from 'lucide-react'
import SwipeDeck from '../components/SwipeDeck'

export default function Dashboard() {
    const { currentUser, userDoc, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    if (!userDoc) return null;

    const hasMatch = !!userDoc.currentMatchId

    return (
        <div className="app-container" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Background Orbs */}
            <div className="ambient-orb orb-1" style={{ opacity: 0.2 }} />
            <div className="ambient-orb orb-2" style={{ opacity: 0.1 }} />

            {/* Header */}
            <header className="dashboard-header" style={{ position: 'relative', zIndex: 10 }}>
                <div className="dashboard-brand">
                    <Sparkles size={20} style={{ color: 'var(--color-accent)' }} />
                    <h1 className="dashboard-title">Blindly</h1>
                </div>

                <div className="user-controls">
                    <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '8px' }}>
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main style={{ flex: 1, position: 'relative', zIndex: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {hasMatch ? (
                    <div className="match-active-view">
                        <div className="match-icon-circle">
                            <MessageCircle size={48} />
                        </div>
                        <h2>You have a match!</h2>
                        <p>Discovery is paused while you explore this connection.</p>
                        <button className="btn btn-primary" style={{ width: '100%', maxWidth: '280px', padding: '14px', justifyContent: 'center' }}>
                            Open Chat
                        </button>
                    </div>
                ) : (
                    <div className="swipe-deck-wrapper">
                        <SwipeDeck />
                    </div>
                )}
            </main>
        </div>
    )
}
