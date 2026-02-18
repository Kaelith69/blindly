import { Heart, MessageCircle, User } from 'lucide-react'

export default function BottomNav({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'discover', label: 'Discover', icon: Heart },
        { id: 'chat', label: 'Chat', icon: MessageCircle },
        { id: 'profile', label: 'Profile', icon: User },
    ]

    return (
        <nav className="bottom-nav">
            {tabs.map(tab => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                    <button
                        key={tab.id}
                        className={`bottom-nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        <Icon size={22} fill={isActive ? 'currentColor' : 'none'} />
                        <span>{tab.label}</span>
                    </button>
                )
            })}
        </nav>
    )
}
