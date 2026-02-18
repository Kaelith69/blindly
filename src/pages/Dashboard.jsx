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
        <div className="onboarding-shell overflow-hidden">
            {/* Background Orbs */}
            <div className="onboarding-bg">
                <div className="ambient-orb orb-1 opacity-20" />
                <div className="ambient-orb orb-2 top-96 opacity-10" />
            </div>

            {/* Header */}
            <header className="dashboard-header z-10 relative">
                <div className="dashboard-brand">
                    <Sparkles size={20} className="text-accent" />
                    <h1 className="dashboard-title">Blindly</h1>
                </div>

                <div className="user-controls">
                    <button onClick={handleLogout} className="btn btn-ghost p-2">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
                {hasMatch ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
                        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent animate-pulse">
                            <MessageCircle size={48} />
                        </div>
                        <h2 className="text-2xl font-bold">You have a match!</h2>
                        <p className="text-white/60 max-w-xs">
                            Discovery is paused while you explore this connection.
                        </p>
                        <button className="btn btn-primary w-full max-w-xs py-4 justify-center">
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
