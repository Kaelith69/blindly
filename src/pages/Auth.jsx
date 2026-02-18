import AuthForm from '../components/AuthForm'

function Auth() {
    return (
        <div className="app-container">
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />

            <div className="auth-page">
                <AuthForm />
            </div>
        </div>
    )
}

export default Auth
