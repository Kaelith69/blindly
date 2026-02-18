import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function BasicInfoStep({ data, update, next, prev }) {

    const currentYear = new Date().getFullYear()

    function submit(e) {
        e.preventDefault()
        if (!data.birthYear || !data.gender || !data.location.approxCity) return
        next()
    }

    return (
        <div className="step-container">
            <div className="step-header">
                <h1>The Basics</h1>
                <p>Help us find your match.</p>
            </div>

            <form onSubmit={submit} className="ob-form">
                <div className="ob-field">
                    <label className="ob-label">Birth Year</label>
                    <input
                        type="number"
                        placeholder="YYYY"
                        className="ob-input"
                        value={data.birthYear}
                        onChange={e => update({ birthYear: Number(e.target.value) })}
                        min={currentYear - 100}
                        max={currentYear - 18}
                    />
                </div>

                <div className="ob-field">
                    <label className="ob-label">City</label>
                    <input
                        placeholder="e.g. New York, London"
                        className="ob-input"
                        value={data.location.approxCity}
                        onChange={e => update({
                            location: { ...data.location, approxCity: e.target.value }
                        })}
                    />
                </div>

                <div className="ob-field">
                    <label className="ob-label">Gender</label>
                    <select
                        className="ob-input ob-select"
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

                <div className="ob-btn-row">
                    <button type="button" onClick={prev} className="btn btn-ghost ob-btn-back" style={{ justifyContent: 'center', padding: '14px' }}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <button
                        type="submit"
                        disabled={!data.birthYear || !data.gender || !data.location.approxCity}
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
