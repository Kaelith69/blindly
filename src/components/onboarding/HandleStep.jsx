import { AtSign, ChevronRight } from 'lucide-react'

export default function HandleStep({ data, update, next }) {

    function submit(e) {
        e.preventDefault()
        if (data.handle.length < 3) return
        next()
    }

    return (
        <div className="step-container">
            <div className="step-header">
                <h1>Choose your handle</h1>
                <p>This is how you'll be known on Blindly.</p>
            </div>

            <form onSubmit={submit} className="ob-form">
                <div className="ob-input-icon-wrap">
                    <AtSign className="ob-input-icon" size={20} />
                    <input
                        className="ob-input ob-input-lg ob-input-with-icon"
                        placeholder="username"
                        value={data.handle}
                        onChange={e => update({ handle: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    disabled={data.handle.length < 3}
                    className="btn btn-primary ob-btn-full"
                    style={{ justifyContent: 'center', padding: '14px' }}
                >
                    Continue <ChevronRight size={20} />
                </button>
            </form>
        </div>
    )
}
