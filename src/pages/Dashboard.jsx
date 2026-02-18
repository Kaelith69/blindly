import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Heart, MessageCircle } from 'lucide-react'

export default function Dashboard() {
    const { currentUser, userDoc, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/')
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-2xl font-bold">Blindly App</h1>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                        {currentUser?.email || currentUser?.phoneNumber}
                    </div>
                    <button onClick={handleLogout} className="btn btn-ghost px-3 py-2 text-sm">
                        <LogOut size={16} className="mr-2" />
                        Logout
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <Heart className="mb-4 text-pink-500" size={32} />
                    <h2 className="text-xl font-bold mb-2">Discovery</h2>
                    <p className="text-gray-400 mb-4">Find your one match.</p>
                    <button className="btn btn-primary w-full">Start Swiping</button>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <MessageCircle className="mb-4 text-blue-500" size={32} />
                    <h2 className="text-xl font-bold mb-2">Messages</h2>
                    <p className="text-gray-400 mb-4">Chat with your match.</p>
                    <button className="btn btn-ghost w-full">Open Chat</button>
                </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm">
                Debugging: <br />
                UID: {currentUser?.uid} <br />
                User Doc: {userDoc ? 'Loaded' : 'None'}
            </div>
        </div>
    )
}
