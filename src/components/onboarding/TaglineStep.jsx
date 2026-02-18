import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function TaglineStep({ data, update, next, prev }) {

    function submit(e) {
        e.preventDefault()
        if (!data.tagline) return
        next()
    }

    return (
        <div className="step-container">
            <div className="step-header">
                <h1>Your Tagline</h1>
                <p>The first thing they'll read. Make it count.</p>
            </div>

            <form onSubmit={submit} className="ob-form">
                <div>
                    <textarea
                        maxLength={80}
                        rows={3}
                        className="ob-input ob-textarea ob-input-lg"
                        placeholder="e.g. Aspiring chef who burns toast..."
                        value={data.tagline}
                        onChange={e => update({ tagline: e.target.value })}
                        autoFocus
                    />
                    <div className="ob-char-count">{data.tagline.length}/80</div>
                </div>

                <div className="ob-btn-row">
                    <button type="button" onClick={prev} className="btn btn-ghost ob-btn-back" style={{ justifyContent: 'center', padding: '14px' }}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <button
                        type="submit"
                        disabled={!data.tagline}
                        className="btn btn-primary ob-btn-next"
                        style={{ justifyContent: 'center', padding: '14px' }}
                    >
                        Continue <ChevronRight size={20} />
                    </button>
                </div>
            </form>
        </div>
    )
}
