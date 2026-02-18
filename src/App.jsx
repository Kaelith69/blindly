import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './layouts/AppLayout'

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />

                        {/* Protected Route: Onboarding (Step 1) */}
                        <Route
                            path="/onboarding"
                            element={
                                <ProtectedRoute>
                                    <Onboarding />
                                </ProtectedRoute>
                            }
                        />

                        {/* App Routes (Step 2 - Gated by Onboarding) */}
                        <Route path="/app" element={<AppLayout />}>
                            <Route index element={<Dashboard />} />
                            {/* Add nested routes like 'match', 'chat' here */}
                        </Route>

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
