import ProtectedRoute from '../components/ProtectedRoute'
import OnboardingGate from '../components/OnboardingGate'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
    return (
        <ProtectedRoute>
            <OnboardingGate>
                <div className="app-shell min-h-screen bg-black text-white">
                    <Outlet />
                </div>
            </OnboardingGate>
        </ProtectedRoute>
    )
}
