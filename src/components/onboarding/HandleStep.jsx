import { AtSign, ChevronRight } from 'lucide-react'

export default function HandleStep({ data, update, next }) {

    function submit(e) {
        e.preventDefault()
        if (data.handle.length < 3) return
        next()
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Choose your handle</h1>
                <p className="text-white/60">This is how you'll be known on Blindly.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                    <input
                        className="w-full p-4 pl-12 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-accent transition-colors text-lg"
                        placeholder="username"
                        value={data.handle}
                        onChange={e => update({ handle: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    disabled={data.handle.length < 3}
                    className="btn btn-primary w-full py-4 text-lg justify-center"
                >
                    Continue <ChevronRight size={20} />
                </button>
            </form>
        </div>
    )
}
