import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Sparkles } from 'lucide-react'
import SwipeDeck from '../components/SwipeDeck'
import ChatView from '../components/ChatView'
import ProfileView from '../components/ProfileView'
import BottomNav from '../components/BottomNav'

export default function Dashboard() {
    const { userDoc } = useAuth()
    const [activeTab, setActiveTab] = useState('discover')

    if (!userDoc) return null

    const hasMatch = !!userDoc.currentMatchId

    // Auto-switch to chat when a match happens
    function handleTabChange(tab) {
        setActiveTab(tab)
    }

    function renderContent() {
        switch (activeTab) {
            case 'discover':
                if (hasMatch) {
                    return (
                        <div className="empty-state">
                            <div className="empty-state-icon">💜</div>
                            <h2>You're matched!</h2>
                            <p>Go to Chat to start your conversation.</p>
                            <button
                                className="btn btn-primary"
                                style={{ marginTop: '16px', padding: '12px 32px', justifyContent: 'center' }}
                                onClick={() => setActiveTab('chat')}
                            >
                                Open Chat
                            </button>
                        </div>
                    )
                }
                return <SwipeDeck />

            case 'chat':
                return <ChatView />

            case 'profile':
                return <ProfileView />

            default:
                return null
        }
    }

    return (
        <div className="dashboard-shell">
            {/* Ambient BG */}
            <div className="dashboard-bg">
                <div className="ambient-orb orb-1" style={{ opacity: 0.15 }} />
                <div className="ambient-orb orb-2" style={{ opacity: 0.08 }} />
            </div>

            {/* Header */}
            <header className="dashboard-top-bar">
                <div className="dashboard-brand">
                    <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />
                    <span className="dashboard-title">Blindly</span>
                </div>
            </header>

            {/* Content */}
            <main className="dashboard-main">
                {renderContent()}
            </main>

            {/* Bottom Nav */}
            <BottomNav
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
        </div>
    )
}
