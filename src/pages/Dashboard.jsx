import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Heart, MessageCircle, Sparkles } from 'lucide-react'

export default function Dashboard() {
    const { currentUser, userDoc, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    return (
        <div className="app-container">
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />

            <header className="dashboard-header">
                <div className="dashboard-brand">
                    <Sparkles size={20} />
                    <h1 className="dashboard-title">Blindly</h1>
                </div>

                <div className="user-controls">
                    <div className="user-info">
                        {currentUser?.email || currentUser?.phoneNumber}
                    </div>
                    <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        <LogOut size={16} />
                        <span className="logout-label">Logout</span>
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <div className="feature-icon">
                            <Heart size={24} />
                        </div>
                        <h2>Discovery</h2>
                        <p>Find your one true match. Zero distractions.</p>
                        <button className="btn btn-primary card-btn-full">Start Swiping</button>
                    </div>

                    <div className="dashboard-card">
                        <div className="feature-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <MessageCircle size={24} />
                        </div>
                        <h2>Messages</h2>
                        <p>Deep conversations with your current match.</p>
                        <button className="btn btn-ghost card-btn-full">Open Chat</button>
                    </div>
                </div>

                <div className="debug-panel">
                    <strong>DEBUG</strong><br />
                    UID: {currentUser?.uid}<br />
                    Status: {userDoc ? `Active (${userDoc.status})` : 'No profile yet'}
                </div>
            </div>
        </div>
    )
}
