import { useState } from 'react'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import HandleStep from '../components/onboarding/HandleStep'
import BasicInfoStep from '../components/onboarding/BasicInfoStep'
import TaglineStep from '../components/onboarding/TaglineStep'
import TagsStep from '../components/onboarding/TagsStep'
import PromptsStep from '../components/onboarding/PromptsStep'
import ReviewStep from '../components/onboarding/ReviewStep'

export default function Onboarding() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)

    const [profile, setProfile] = useState({
        handle: "",
        birthYear: "",
        gender: "",
        location: {
            countryCode: "IN",
            approxCity: ""
        },
        tagline: "",
        tags: [],
        prompts: []
    })

    function next() { setStep(s => s + 1) }
    function prev() { setStep(s => s - 1) }
    function update(data) { setProfile(prev => ({ ...prev, ...data })) }

    function handleCancel() {
        if (step === 0) {
            if (confirm("Cancel profile setup?")) navigate('/')
        } else {
            prev()
        }
    }

    const steps = [
        <HandleStep key="handle" data={profile} update={update} next={next} />,
        <BasicInfoStep key="basic" data={profile} update={update} next={next} prev={prev} />,
        <TaglineStep key="tagline" data={profile} update={update} next={next} prev={prev} />,
        <TagsStep key="tags" data={profile} update={update} next={next} prev={prev} />,
        <PromptsStep key="prompts" data={profile} update={update} next={next} prev={prev} />,
        <ReviewStep key="review" data={profile} prev={prev} />
    ]

    const progress = ((step + 1) / steps.length) * 100

    return (
        <div className="onboarding-shell">
            <div className="onboarding-bg">
                <div className="ambient-orb orb-1" style={{ opacity: 0.5 }} />
                <div className="ambient-orb orb-2" style={{ opacity: 0.3 }} />
            </div>

            <header className="onboarding-header">
                <div className="onboarding-header-row">
                    <button onClick={handleCancel} className="onboarding-back-btn" title="Back">
                        {step === 0 ? <ArrowLeft size={22} /> : <div className="onboarding-spacer" />}
                    </button>
                    <div className="onboarding-step-label">
                        <Sparkles size={14} />
                        <span>Step {step + 1} of {steps.length}</span>
                    </div>
                    <div className="onboarding-spacer" />
                </div>

                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </header>

            <main className="onboarding-main">
                {steps[step]}
            </main>
        </div>
    )
}
