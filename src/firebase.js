// Firebase configuration for Blindly
// Project: blindly-91316
// NOTE: Register a Web App in Firebase Console and update these values
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBesezwyDv6aaJwfI6mma6uTHAPogQn3a8",
    authDomain: "blindly-dating-app-2026.firebaseapp.com",
    projectId: "blindly-dating-app-2026",
    storageBucket: "blindly-dating-app-2026.firebasestorage.app",
    messagingSenderId: "42076933430",
    appId: "1:42076933430:web:82224d6f0a457f60a3f797"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
