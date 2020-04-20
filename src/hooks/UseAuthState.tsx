import { User }                from 'firebase'
import { useEffect, useState } from 'react'
import AuthService             from '../services/AuthService'

const useAuthState = () => {
    const [authState, setAuthState] = useState<User | undefined | null>()
    const auth = AuthService.authState
    useEffect(() => {
        const authSubscription = auth.subscribe((user) => setAuthState(user))
        return authSubscription.unsubscribe()
    }, [auth])
    return authState
}

export default useAuthState
