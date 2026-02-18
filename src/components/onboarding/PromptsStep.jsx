import { useState } from 'react'
import { ChevronRight, ChevronLeft, Plus, X } from 'lucide-react'

import { AVAILABLE_PROMPTS } from '../../constants'

export default function PromptsStep({ data, update, next, prev }) {

    // We need to manage editing state locally
    // Prompts structure: [{ id: "p1", question: "...", answer: "..." }]

    const [activePromptIndex, setActivePromptIndex] = useState(null)

    const addPrompt = () => {
        if (data.prompts.length >= 3) return; // For MVP, maybe limit to 3 or 4

        // Find first unused prompt question
        const usedQuestions = data.prompts.map(p => p.question);
        const available = AVAILABLE_PROMPTS.filter(q => !usedQuestions.includes(q));

        if (available.length === 0) return;

        const newPrompt = {
            id: Date.now().toString(),
            question: available[0],
            answer: ""
        }

        update({ prompts: [...data.prompts, newPrompt] })
        setActivePromptIndex(data.prompts.length) // Focus the new one
    }

    const updatePrompt = (index, field, value) => {
        const newPrompts = [...data.prompts];
        newPrompts[index] = { ...newPrompts[index], [field]: value };
        update({ prompts: newPrompts });
    }

    const removePrompt = (index) => {
        const newPrompts = data.prompts.filter((_, i) => i !== index);
        update({ prompts: newPrompts });
        setActivePromptIndex(null);
    }

    const isValid = data.prompts.length >= 3 && data.prompts.every(p => p.answer.trim().length > 0);

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Profile Prompts</h1>
                <p className="text-white/60">Answer at least 3 prompts. Be specific.</p>
            </div>

            <div className="flex-1 overflow-y-auto -mr-2 pr-2 space-y-4">
                {data.prompts.map((prompt, index) => (
                    <div key={prompt.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <select
                                className="bg-transparent text-accent font-medium text-sm focus:outline-none w-full"
                                value={prompt.question}
                                onChange={(e) => updatePrompt(index, 'question', e.target.value)}
                            >
                                {AVAILABLE_PROMPTS.map(q => (
                                    <option key={q} value={q} className="bg-black text-white">
                                        {q}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => removePrompt(index)}
                                className="text-white/30 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <textarea
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/20 resize-none p-0"
                            placeholder="Your answer..."
                            rows={2}
                            value={prompt.answer}
                            onChange={(e) => updatePrompt(index, 'answer', e.target.value)}
                            autoFocus={activePromptIndex === index}
                        />
                    </div>
                ))}

                {data.prompts.length < 4 && (
                    <button
                        onClick={addPrompt}
                        className="w-full py-4 border border-dashed border-white/20 rounded-xl text-white/40 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> Add Prompt
                    </button>
                )}
            </div>

            <div className="pt-2">
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
                        onClick={() => isValid && next()}
                        disabled={!isValid}
                        className="btn btn-primary flex-[2] justify-center py-4"
                    >
                        Continue <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
