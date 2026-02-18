import { useState, useEffect, useRef } from 'react'
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { Send, Loader2, X as XIcon, AlertTriangle } from 'lucide-react'

export default function ChatView() {
    const { userDoc } = useAuth()
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [sending, setSending] = useState(false)
    const [showUnmatch, setShowUnmatch] = useState(false)
    const scrollRef = useRef(null)

    const matchId = userDoc?.currentMatchId
    const uid = auth.currentUser?.uid

    // Subscribe to messages
    useEffect(() => {
        if (!matchId) return

        const q = query(
            collection(db, 'matches', matchId, 'messages'),
            orderBy('createdAt', 'asc')
        )

        const unsub = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
            setMessages(msgs)
        })

        return () => unsub()
    }, [matchId])

    // Auto-scroll on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    async function handleSend(e) {
        e.preventDefault()
        const text = input.trim()
        if (!text || !matchId || sending) return

        setSending(true)
        setInput('')

        try {
            await addDoc(collection(db, 'matches', matchId, 'messages'), {
                text,
                senderId: uid,
                createdAt: serverTimestamp()
            })
        } catch (err) {
            console.error('Send failed:', err)
            setInput(text) // Restore on failure
        } finally {
            setSending(false)
        }
    }

    async function handleUnmatch() {
        if (!matchId) return

        try {
            // Remove match reference from current user
            const userRef = doc(db, 'users', uid)
            await updateDoc(userRef, { currentMatchId: null })

            // Note: In production, a Cloud Function should handle
            // cleaning up the other user's reference and the match doc
            setShowUnmatch(false)
        } catch (err) {
            console.error('Unmatch failed:', err)
        }
    }

    if (!matchId) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">💬</div>
                <h2>No match yet</h2>
                <p>Keep swiping to find your connection.</p>
            </div>
        )
    }

    function formatTime(timestamp) {
        if (!timestamp) return ''
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div className="chat-container">
            {/* Chat Header */}
            <div className="chat-header">
                <div>
                    <div className="chat-match-label">Your Match</div>
                </div>
                <button
                    className="chat-unmatch-btn"
                    onClick={() => setShowUnmatch(true)}
                    title="Unmatch"
                >
                    <XIcon size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="chat-messages" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="chat-empty">
                        <p>Say something! First impressions matter. ✨</p>
                    </div>
                )}

                {messages.map(msg => {
                    const isMine = msg.senderId === uid
                    return (
                        <div
                            key={msg.id}
                            className={`chat-bubble-row ${isMine ? 'mine' : 'theirs'}`}
                        >
                            <div className={`chat-bubble ${isMine ? 'bubble-mine' : 'bubble-theirs'}`}>
                                <p>{msg.text}</p>
                                <span className="bubble-time">{formatTime(msg.createdAt)}</span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Input Bar */}
            <form className="chat-input-bar" onSubmit={handleSend}>
                <input
                    className="chat-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    maxLength={500}
                    autoFocus
                />
                <button
                    type="submit"
                    className="chat-send-btn"
                    disabled={!input.trim() || sending}
                >
                    {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
            </form>

            {/* Unmatch Confirmation */}
            {showUnmatch && (
                <div className="modal-overlay" onClick={() => setShowUnmatch(false)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <AlertTriangle size={32} style={{ color: '#ef4444', marginBottom: '12px' }} />
                        <h3>Unmatch?</h3>
                        <p>This will end the conversation and you'll go back to discovery.</p>
                        <div className="modal-actions">
                            <button className="btn btn-ghost" onClick={() => setShowUnmatch(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={handleUnmatch}>
                                Unmatch
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
