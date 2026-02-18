import { useState } from 'react'
import { ChevronRight, ChevronLeft, Plus, X } from 'lucide-react'
import { AVAILABLE_PROMPTS } from '../../constants'

export default function PromptsStep({ data, update, next, prev }) {

    const [activePromptIndex, setActivePromptIndex] = useState(null)

    const addPrompt = () => {
        if (data.prompts.length >= 4) return

        const usedQuestions = data.prompts.map(p => p.question)
        const available = AVAILABLE_PROMPTS.filter(q => !usedQuestions.includes(q))
        if (available.length === 0) return

        const newPrompt = {
            id: Date.now().toString(),
            question: available[0],
            answer: ""
        }

        update({ prompts: [...data.prompts, newPrompt] })
        setActivePromptIndex(data.prompts.length)
    }

    const updatePrompt = (index, field, value) => {
        const newPrompts = [...data.prompts]
        newPrompts[index] = { ...newPrompts[index], [field]: value }
        update({ prompts: newPrompts })
    }

    const removePrompt = (index) => {
        update({ prompts: data.prompts.filter((_, i) => i !== index) })
        setActivePromptIndex(null)
    }

    const isValid = data.prompts.length >= 3 && data.prompts.every(p => p.answer.trim().length > 0)

    return (
        <div className="step-container-full">
            <div className="step-header">
                <h1>Profile Prompts</h1>
                <p>Answer at least 3 prompts. Be specific.</p>
            </div>

            <div className="prompts-scroll">
                {data.prompts.map((prompt, index) => (
                    <div key={prompt.id} className="prompt-card">
                        <div className="prompt-card-header">
                            <select
                                className="prompt-select"
                                value={prompt.question}
                                onChange={(e) => updatePrompt(index, 'question', e.target.value)}
                            >
                                {AVAILABLE_PROMPTS.map(q => (
                                    <option key={q} value={q}>{q}</option>
                                ))}
                            </select>
                            <button onClick={() => removePrompt(index)} className="prompt-remove-btn">
                                <X size={16} />
                            </button>
                        </div>

                        <textarea
                            className="prompt-textarea"
                            placeholder="Your answer..."
                            rows={2}
                            value={prompt.answer}
                            onChange={(e) => updatePrompt(index, 'answer', e.target.value)}
                            autoFocus={activePromptIndex === index}
                        />
                    </div>
                ))}

                {data.prompts.length < 4 && (
                    <button onClick={addPrompt} className="add-prompt-btn">
                        <Plus size={20} /> Add Prompt
                    </button>
                )}
            </div>

            <div className="ob-btn-row">
                <button type="button" onClick={prev} className="btn btn-ghost ob-btn-back" style={{ justifyContent: 'center', padding: '14px' }}>
                    <ChevronLeft size={20} /> Back
                </button>
                <button
                    type="button"
                    onClick={() => isValid && next()}
                    disabled={!isValid}
                    className="btn btn-primary ob-btn-next"
                    style={{ justifyContent: 'center', padding: '14px' }}
                >
                    Continue <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}
