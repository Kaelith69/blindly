import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function TaglineStep({ data, update, next, prev }) {

    function submit(e) {
        e.preventDefault()
        if (!data.tagline) return
        next()
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Your Tagline</h1>
                <p className="text-white/60">The first thing they'll read. Make it count.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div className="relative">
                    <textarea
                        maxLength={80}
                        rows={3}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-accent transition-colors resize-none text-lg"
                        placeholder="e.g. Aspiring chef who burns toast..."
                        value={data.tagline}
                        onChange={e => update({ tagline: e.target.value })}
                        autoFocus
                    />
                    <div className="text-right text-xs text-white/40 mt-2">
                        {data.tagline.length}/80
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={prev}
                        className="btn btn-ghost flex-1 justify-center py-4"
                    >
                        <ChevronLeft size={20} /> Back
                    </button>
                    <button
                        type="submit"
                        disabled={!data.tagline}
                        className="btn btn-primary flex-[2] justify-center py-4"
                    >
                        Continue <ChevronRight size={20} />
                    </button>
                </div>
            </form>
        </div>
    )
}
