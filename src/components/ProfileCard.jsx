import { motion } from 'framer-motion'
import { Sparkles, MapPin, Cake, User } from 'lucide-react'

export default function ProfileCard({ user, style, dragHandlers }) {
    const currentYear = new Date().getFullYear();
    const age = user.birthYear ? currentYear - user.birthYear : '??';

    return (
        <motion.div
            className="profile-card-container"
            style={style}
            {...dragHandlers}
        >
            <div className="profile-card-inner">
                {/* Header Section */}
                <div className="profile-header">
                    <h2 className="profile-handle">@{user.handle}</h2>
                    <div className="profile-meta-row">
                        <span className="profile-meta-item"><User size={14} /> {user.gender}</span>
                        <span className="profile-meta-dot">•</span>
                        <span className="profile-meta-item"><Cake size={14} /> {age}</span>
                        <span className="profile-meta-dot">•</span>
                        <span className="profile-meta-item"><MapPin size={14} /> {user.location?.approxCity || 'Unknown'}</span>
                    </div>
                </div>

                {/* Tagline */}
                <div className="profile-tagline">
                    "{user.tagline}"
                </div>

                {/* Tags */}
                <div className="profile-tags">
                    {user.tags && user.tags.map(tag => (
                        <span key={tag} className="profile-tag">{tag}</span>
                    ))}
                </div>

                {/* Prompts */}
                <div className="profile-prompts">
                    {user.prompts && user.prompts.map((prompt, i) => (
                        <div key={i} className="profile-prompt">
                            <div className="prompt-q">{prompt.question}</div>
                            <div className="prompt-a">{prompt.answer}</div>
                        </div>
                    ))}
                </div>

                {/* Brand Watermark */}
                <div className="profile-footer">
                    <Sparkles size={16} style={{ color: 'var(--color-accent)', opacity: 0.5 }} />
                </div>
            </div>
        </motion.div>
    )
}
