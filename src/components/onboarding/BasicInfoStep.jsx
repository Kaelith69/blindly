import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function BasicInfoStep({ data, update, next, prev }) {

    const currentYear = new Date().getFullYear();

    function submit(e) {
        e.preventDefault()
        if (!data.birthYear || !data.gender || !data.location.approxCity) return
        next()
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">The Basics</h1>
                <p className="text-white/60">Help us find your match.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs text-white/40 uppercase tracking-wider ml-1">Birth Year</label>
                    <input
                        type="number"
                        placeholder="YYYY"
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-accent transition-colors"
                        value={data.birthYear}
                        onChange={e => update({ birthYear: Number(e.target.value) })}
                        min={currentYear - 100}
                        max={currentYear - 18}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-white/40 uppercase tracking-wider ml-1">City</label>
                    <input
                        placeholder="e.g. New York, London"
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-accent transition-colors"
                        value={data.location.approxCity}
                        onChange={e => update({
                            location: { ...data.location, approxCity: e.target.value }
                        })}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-white/40 uppercase tracking-wider ml-1">Gender</label>
                    <select
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-accent transition-colors appearance-none"
                        value={data.gender}
                        onChange={e => update({ gender: e.target.value })}
                    >
                        <option value="" disabled>Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                    </select>
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
                        disabled={!data.birthYear || !data.gender || !data.location.approxCity}
                        className="btn btn-primary flex-[2] justify-center py-4"
                    >
                        Continue <ChevronRight size={20} />
                    </button>
                </div>
            </form>
        </div>
    )
}
