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

            // Navigate to app
            navigate('/app', { replace: true })
        } catch (e) {
            console.error("Error saving profile:", e)
            alert("Failed to save profile. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Ready to join?</h1>
                <p className="text-white/60">Review your profile card.</p>
            </div>

            <div className="flex-1 overflow-y-auto -mr-2 pr-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="text-center space-y-1">
                        <h2 className="text-2xl font-bold">@{data.handle}</h2>
                        <p className="text-white/60 text-sm">{data.gender} • {2026 - data.birthYear} • {data.location.approxCity}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 text-center italic text-lg text-white/90">
                        "{data.tagline}"
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {data.tags.map(tag => (
                            <span key={tag} className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/70">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-4 pt-2">
                        {data.prompts.map(prompt => (
                            <div key={prompt.id} className="space-y-1">
                                <p className="text-xs text-accent uppercase tracking-wide font-medium">{prompt.question}</p>
                                <p className="text-sm text-white/80">{prompt.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-2 flex gap-4">
                <button
                    type="button"
                    onClick={prev}
                    className="btn btn-ghost flex-1 justify-center py-4"
                    disabled={loading}
                >
                    <ChevronLeft size={20} /> Back
                </button>
                <button
                    type="button"
                    onClick={submit}
                    disabled={loading}
                    className="btn btn-primary flex-[2] justify-center py-4"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <>Finish <Check size={20} /></>}
                </button>
            </div>
        </div>
    )
}
