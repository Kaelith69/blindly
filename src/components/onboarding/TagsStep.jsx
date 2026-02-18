import { ChevronRight, ChevronLeft } from 'lucide-react'
import { AVAILABLE_TAGS } from '../../constants'

export default function TagsStep({ data, update, next, prev }) {

    const toggleTag = (tag) => {
        if (data.tags.includes(tag)) {
            update({ tags: data.tags.filter(t => t !== tag) })
        } else {
            if (data.tags.length >= 10) return
            update({ tags: [...data.tags, tag] })
        }
    }

    function submit() {
        if (data.tags.length < 3) return
        next()
    }

    return (
        <div className="step-container-full">
            <div className="step-header">
                <h1>Interests</h1>
                <p>Pick at least 3 things you love.</p>
            </div>

            <div className="tags-scroll">
                <div className="tags-grid">
                    {AVAILABLE_TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`tag-chip ${data.tags.includes(tag) ? 'selected' : ''}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="tags-footer">
                <div className="tags-counter">
                    <span>Selected: {data.tags.length}</span>
                    {data.tags.length < 3 && <span>Select {3 - data.tags.length} more</span>}
                </div>

                <div className="ob-btn-row">
                    <button type="button" onClick={prev} className="btn btn-ghost ob-btn-back" style={{ justifyContent: 'center', padding: '14px' }}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <button
                        type="button"
                        onClick={submit}
                        disabled={data.tags.length < 3}
                        className="btn btn-primary ob-btn-next"
                        style={{ justifyContent: 'center', padding: '14px' }}
                    >
                        Continue <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
