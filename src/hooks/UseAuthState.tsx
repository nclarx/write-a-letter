import { User }                from 'firebase'
import { useEffect, useState } from 'react'
import AuthService             from '../services/AuthService'

const useAuthState = () => {
    const [authState, setAuthState] = useState<User | undefined | null>()
    const auth = AuthService.authState
    const authStateValue = AuthService.authState.getValue()
    useEffect(() => {
        const authSubscription = auth.subscribe((user) => setAuthState(user))
        return authSubscription.unsubscribe()
        console.log('AuthState updated')
    }, [authStateValue])
    return authState
}

export default useAuthState
