import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userDoc, setUserDoc] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unsubscribeDoc = () => { }

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)

            // Unsubscribe from previous user's doc
            unsubscribeDoc()

            if (user) {
                // Subscribe to new user's doc
                unsubscribeDoc = onSnapshot(doc(db, 'users', user.uid),
                    (docSnap) => {
                        if (docSnap.exists()) {
                            setUserDoc(docSnap.data())
                        } else {
                            setUserDoc(null)
                        }
                        setLoading(false)
                    },
                    (error) => {
                        console.error("Firestore sync error:", error)
                        setLoading(false)
                    }
                )
            } else {
                setUserDoc(null)
                setLoading(false)
            }
        })

        return () => {
            unsubscribeAuth()
            unsubscribeDoc()
        }
    }, [])

    const value = {
        currentUser,
        userDoc,
        loading,
        logout: () => signOut(auth)
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
