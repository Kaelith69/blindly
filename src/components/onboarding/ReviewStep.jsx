import { useState } from 'react'
import { ChevronLeft, Check, Loader2 } from 'lucide-react'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useNavigate } from 'react-router-dom'

export default function ReviewStep({ data, prev }) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function submit() {
        if (!auth.currentUser) return

        setLoading(true)
        try {
            const uid = auth.currentUser.uid
            await updateDoc(doc(db, "users", uid), {
                ...data,
                onboardingCompleted: true,
                updatedAt: serverTimestamp()
            })
            navigate('/app', { replace: true })
        } catch (e) {
            console.error("Error saving profile:", e)
            alert("Failed to save profile. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="step-container-full">
            <div className="step-header">
                <h1>Ready to join?</h1>
                <p>Review your profile card.</p>
            </div>

            <div className="review-scroll">
                <div className="review-card">
                    <div className="review-identity">
                        <div className="review-handle">@{data.handle}</div>
                        <div className="review-meta">{data.gender} • {2026 - data.birthYear} • {data.location.approxCity}</div>
                    </div>

                    <div className="review-tagline">"{data.tagline}"</div>

                    <div className="review-tags">
                        {data.tags.map(tag => (
                            <span key={tag} className="review-tag">{tag}</span>
                        ))}
                    </div>

                    <div className="review-prompts">
                        {data.prompts.map(prompt => (
                            <div key={prompt.id}>
                                <div className="review-prompt-q">{prompt.question}</div>
                                <div className="review-prompt-a">{prompt.answer}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ob-btn-row">
                <button type="button" onClick={prev} className="btn btn-ghost ob-btn-back" style={{ justifyContent: 'center', padding: '14px' }} disabled={loading}>
                    <ChevronLeft size={20} /> Back
                </button>
                <button
                    type="button"
                    onClick={submit}
                    disabled={loading}
                    className="btn btn-primary ob-btn-next"
                    style={{ justifyContent: 'center', padding: '14px' }}
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Check size={20} /> Finish</>}
                </button>
            </div>
        </div>
    )
}
