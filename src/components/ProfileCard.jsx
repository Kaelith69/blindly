import { motion } from 'framer-motion'
import { Sparkles, MapPin, Cake, User } from 'lucide-react'

// Variants for card animations
export const cardVariants = {
    initial: { scale: 0.95, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: (direction) => ({
        x: direction > 0 ? 500 : -500,
        opacity: 0,
        scale: 0.9,
        rotate: direction > 0 ? 20 : -20,
        transition: { duration: 0.2 }
    })
}

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

                {/* Tagline - The Hook */}
                <div className="profile-tagline">
                    "{user.tagline}"
                </div>

                {/* Tags */}
                <div className="profile-tags">
                    {user.tags && user.tags.map(tag => (
                        <span key={tag} className="profile-tag">{tag}</span>
                    ))}
                </div>

                {/* Prompts Section - The Substance */}
                <div className="profile-prompts">
                    {user.prompts && user.prompts.map((prompt, i) => (
                        <div key={i} className="profile-prompt">
                            <div className="prompt-q">{prompt.question}</div>
                            <div className="prompt-a">{prompt.answer}</div>
                        </div>
                    ))}
                </div>

                {/* Watermark/Brand (Optional) */}
                <div className="profile-footer">
                    <Sparkles size={16} className="text-accent opacity-50" />
                </div>
            </div>
        </motion.div>
    )
}
