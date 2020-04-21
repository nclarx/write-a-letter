import { User }    from 'firebase'
import {
    useEffect,
    useState
}                  from 'react'
import AuthService from '../services/AuthService'

const useAuthState = () => {
    const [authState, setAuthState] = useState<User | undefined | null>(null)
    const auth = AuthService.authState
    const authValue = AuthService.authState.getValue()
    useEffect(() => {
        const authSubscription = auth.subscribe((user) => setAuthState(user))
        return authSubscription.unsubscribe()
    }, [auth, authValue])
    return authState
}

export default useAuthState
