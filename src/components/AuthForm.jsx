import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Phone, Mail, ArrowRight } from 'lucide-react'

export default function AuthForm() {
    const [mode, setMode] = useState('login') // 'login' | 'signup'
    const [method, setMethod] = useState('email') // 'email' | 'phone'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [confirmation, setConfirmation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible'
            })
        }
    }, [])

    async function createUserDoc(uid) {
        await setDoc(doc(db, 'users', uid), {
            createdAt: serverTimestamp(),
            status: 'active',
            currentMatchId: null,
            trustLevel: 0
        }, { merge: true }) // Merge to avoid overwriting if exists
    }

    async function handleEmailAuth(e) {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (mode === 'signup') {
                const result = await createUserWithEmailAndPassword(auth, email, password)
                await createUserDoc(result.user.uid)
            } else {
                await signInWithEmailAndPassword(auth, email, password)
            }
            navigate('/app') // Redirect after success
        } catch (e) {
            setError(e.message.replace('Firebase: ', ''))
        }
        setLoading(false)
    }

    async function sendOTP(e) {
        e.preventDefault()
        if (!phone) return setError('Please enter a valid phone number')

        setLoading(true)
        setError('')

        try {
            const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
            setConfirmation(result)
        } catch (e) {
            setError(e.message.replace('Firebase: ', ''))
            // Reset recaptcha on error
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear()
                window.recaptchaVerifier = null
            }
        }
        setLoading(false)
    }

    async function verifyOTP(e) {
        e.preventDefault()
        if (!otp) return

        setLoading(true)
        setError('')

        try {
            const result = await confirmation.confirm(otp)
            await createUserDoc(result.user.uid)
            navigate('/app')
        } catch (e) {
            setError(e.message.replace('Firebase: ', ''))
        }
        setLoading(false)
    }

    return (
        <div className="auth-card">
            <div className="auth-header">
                <h1 className="auth-title">Blindly</h1>
                <p className="auth-subtitle">
                    {mode === 'login' ? 'Welcome back' : 'Create an account'}
                </p>
            </div>

            <div className="auth-tabs">
                <button
                    className={`auth-tab ${method === 'email' ? 'active' : ''}`}
                    onClick={() => { setMethod('email'); setError('') }}
                >
                    <Mail size={16} /> Email
                </button>
                <button
                    className={`auth-tab ${method === 'phone' ? 'active' : ''}`}
                    onClick={() => { setMethod('phone'); setError('') }}
                >
                    <Phone size={16} /> Phone
                </button>
            </div>

            <form className="auth-form" onSubmit={
                method === 'email' ? handleEmailAuth : (confirmation ? verifyOTP : sendOTP)
            }>

                {method === 'email' && (
                    <>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="auth-input"
                            />
                        </div>
                        <div className="input-group">
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="auth-input"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {method === 'phone' && (
                    <>
                        {!confirmation ? (
                            <div className="input-group">
                                <input
                                    type="tel"
                                    placeholder="+1 555 123 4567"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    className="auth-input"
                                />
                                <p className="input-hint">Format: +[Country Code] [Number]</p>
                            </div>
                        ) : (
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    className="auth-input"
                                    maxLength={6}
                                />
                            </div>
                        )}
                    </>
                )}

                {error && <div className="auth-error">{error}</div>}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary auth-submit"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            {method === 'email'
                                ? (mode === 'login' ? 'Sign In' : 'Sign Up')
                                : (confirmation ? 'Verify code' : 'Send code')}
                            <ArrowRight size={16} />
                        </>
                    )}
                </button>
            </form>

            <div id="recaptcha-container"></div>

            {method === 'email' && (
                <div className="auth-footer">
                    <p>
                        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <button
                            className="link-btn"
                            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        >
                            {mode === 'login' ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            )}
        </div>
    )
}
