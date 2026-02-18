import { useAuth } from '../context/AuthContext'
import { LogOut, Settings, Sparkles, MapPin, Cake, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProfileView() {
    const { currentUser, userDoc, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    if (!userDoc) return null

    const currentYear = new Date().getFullYear()
    const age = userDoc.birthYear ? currentYear - userDoc.birthYear : '??'

    return (
        <div className="profile-view">
            {/* Profile Card */}
            <div className="profile-self-card">
                <div className="profile-header">
                    <h2 className="profile-handle">@{userDoc.handle}</h2>
                    <div className="profile-meta-row">
                        <span className="profile-meta-item"><User size={14} /> {userDoc.gender}</span>
                        <span className="profile-meta-dot">•</span>
                        <span className="profile-meta-item"><Cake size={14} /> {age}</span>
                        <span className="profile-meta-dot">•</span>
                        <span className="profile-meta-item"><MapPin size={14} /> {userDoc.location?.approxCity || 'Unknown'}</span>
                    </div>
                </div>

                <div className="profile-tagline">
                    "{userDoc.tagline}"
                </div>

                <div className="profile-tags">
                    {userDoc.tags && userDoc.tags.map(tag => (
                        <span key={tag} className="profile-tag">{tag}</span>
                    ))}
                </div>

                <div className="profile-prompts">
                    {userDoc.prompts && userDoc.prompts.map((prompt, i) => (
                        <div key={i} className="profile-prompt">
                            <div className="prompt-q">{prompt.question}</div>
                            <div className="prompt-a">{prompt.answer}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Account Section */}
            <div className="profile-account-section">
                <div className="profile-account-info">
                    <Sparkles size={16} style={{ color: 'var(--color-accent)' }} />
                    <span>{currentUser?.email || currentUser?.phoneNumber}</span>
                </div>

                <button onClick={handleLogout} className="btn btn-ghost profile-logout-btn">
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}
