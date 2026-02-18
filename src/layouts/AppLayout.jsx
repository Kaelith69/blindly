import ProtectedRoute from '../components/ProtectedRoute'
import OnboardingGate from '../components/OnboardingGate'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
    return (
        <ProtectedRoute>
            <OnboardingGate>
                <div className="app-shell">
                    <Outlet />
                </div>
            </OnboardingGate>
        </ProtectedRoute>
    )
}
