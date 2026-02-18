import { ChevronRight, ChevronLeft } from 'lucide-react'

const AVAILABLE_TAGS = [
    "Music", "Movies", "Books", "Gaming", "Fitness",
    "Foodie", "Travel", "Art", "Tech", "Science",
    "Nature", "Photography", "Cooking", "Writing", "History",
    "Philosophy", "Psychology", "Astrology", "Spirituality", "Meditation"
];


export default function TagsStep({ data, update, next, prev }) {

    const toggleTag = (tag) => {
        if (data.tags.includes(tag)) {
            update({ tags: data.tags.filter(t => t !== tag) })
        } else {
            if (data.tags.length >= 10) return; // Max limit
            update({ tags: [...data.tags, tag] })
        }
    }

    function submit(e) {
        if (e) e.preventDefault()
        if (data.tags.length < 3) return
        next()
    }

    return (
        <div className="space-y-6 animate-fade-in flex flex-col h-full">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Interests</h1>
                <p className="text-white/60">Pick at least 3 things you love.</p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 pb-4">
                <div className="flex flex-wrap gap-3">
                    {AVAILABLE_TAGS.map(tag => {
                        const isSelected = data.tags.includes(tag);
                        return (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-4 py-3 rounded-full border transition-all ${isSelected
                                        ? 'bg-accent border-accent text-white scale-105'
                                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                                    }`}
                            >
                                {tag}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="pt-2">
                <div className="flex justify-between items-center text-sm text-white/40 mb-4">
                    <span>Selected: {data.tags.length}</span>
                    {data.tags.length < 3 && <span>Select {3 - data.tags.length} more</span>}
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={prev}
                        className="btn btn-ghost flex-1 justify-center py-4"
                    >
                        <ChevronLeft size={20} /> Back
                    </button>
                    <button
                        type="button"
                        onClick={submit}
                        disabled={data.tags.length < 3}
                        className="btn btn-primary flex-[2] justify-center py-4"
                    >
                        Continue <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
