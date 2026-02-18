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
            countryCode: "IN", // Default, could be dynamic later
            approxCity: ""
        },
        tagline: "",
        tags: [],
        prompts: []
    })

    function next() {
        setStep(s => s + 1)
    }

    function prev() {
        setStep(s => s - 1)
    }

    function update(data) {
        setProfile(prev => ({ ...prev, ...data }))
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
        <div className="app-shell min-h-[100dvh] flex flex-col">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="ambient-orb orb-1 opacity-50" />
                <div className="ambient-orb orb-2 top-96 opacity-30" />
            </div>

            <header className="p-6 pb-2 relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => handleCancel()}
                        className="text-white/40 hover:text-white transition-colors"
                        title="Cancel Onboarding"
                    >
                        {step === 0 ? <ArrowLeft size={24} /> : <div className="w-6" />}
                    </button>
                    <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                        <Sparkles size={14} className="text-accent" />
                        <span>Step {step + 1} of {steps.length}</span>
                    </div>
                    <div className="w-6" /> {/* Spacer */}
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-accent transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </header>

            <main className="flex-1 p-6 relative z-10 flex flex-col">
                {steps[step]}
            </main>
        </div>
    )

    function handleCancel() {
        if (step === 0) {
            // Go back to auth or home? usually logout.
            // But for now let's just go home.
            if (confirm("Cancel profile setup?")) {
                navigate('/')
            }
        } else {
            prev()
        }
    }
}
