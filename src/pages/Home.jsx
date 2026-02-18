import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, Heart, MessageCircle, Eye, EyeOff, Sparkles } from 'lucide-react'

function Home() {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="app-container">
            {/* Ambient background orbs */}
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />
            <div className="ambient-orb orb-3" />

            {/* Navigation */}
            <nav className="nav">
                <div className="nav-brand">
                    <EyeOff size={22} strokeWidth={2.5} />
                    <span className="nav-logo">blindly</span>
                </div>
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    <div className="toggle-icon-wrapper">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </div>
                </button>
            </nav>

            {/* Hero Section */}
            <main className="hero">
                <div className="hero-badge">
                    <Sparkles size={14} />
                    <span>Text-only dating</span>
                </div>

                <h1 className="hero-title">
                    Date with <br />
                    <span className="hero-gradient">words, not looks.</span>
                </h1>

                <p className="hero-subtitle">
                    No photos. No filters. No peacocking. <br />
                    One match at a time. Just real conversation.
                </p>

                <div className="hero-actions">
                    <button className="btn btn-primary">
                        <Heart size={18} />
                        Get Started
                    </button>
                    <button className="btn btn-ghost">
                        Learn More
                    </button>
                </div>

                {/* Feature Cards */}
                <div className="features">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <EyeOff size={24} />
                        </div>
                        <h3>Blind Profiles</h3>
                        <p>Text-only profiles with prompts, tags, and a tagline. Personality first.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Heart size={24} />
                        </div>
                        <h3>One Match</h3>
                        <p>Exactly one active match at a time. Give 100% or move on.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <MessageCircle size={24} />
                        </div>
                        <h3>Real Talk</h3>
                        <p>Text-only messaging. No media. Emoji OK. Just words that matter.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2026 Blindly. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Home
