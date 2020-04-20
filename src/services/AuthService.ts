import { User }            from 'firebase'
import { auth }            from 'firebase/app'
import 'firebase/auth'
import { BehaviorSubject } from 'rxjs'

class AuthService {

    public authState: BehaviorSubject<User | undefined | null>

    constructor() {
        this.authState = new BehaviorSubject<User | undefined | null>(undefined)
    }

    login() {
        const provider = new auth.GoogleAuthProvider()
        return new Promise((resolve, reject) => {
            auth().signInWithPopup(provider)
                  .then((user) => {
                      localStorage.setItem('AUTH_FB', JSON.stringify(user))
                      this.setAuthStateListener()
                  })
        })
    }

    setAuthStateListener() {
        auth().onAuthStateChanged((user => this.authState.next(user)))
    }
}

export default new AuthService()
