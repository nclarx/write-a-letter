import { User }                              from 'firebase'
import { auth }                              from 'firebase/app'
import 'firebase/auth'
import { BehaviorSubject, from, Observable } from 'rxjs'

class AuthService {

    public authState: BehaviorSubject<User | undefined | null>

    constructor() {
        this.authState = new BehaviorSubject<User | undefined | null>(undefined)
    }

    public login(): Observable<User | null> {
        const provider = new auth.GoogleAuthProvider()
        return from(
            auth().signInWithPopup(provider)
                  .then((userCredential) => {
                      localStorage.setItem('AUTH_FB', JSON.stringify(userCredential))
                      this.setAuthStateListener()
                      return userCredential.user || null
                  })
        )
    }

    public logout(): Observable<void> {
        return from(auth().signOut())
    }

    private setAuthStateListener() {
        auth().onAuthStateChanged((user => this.authState.next(user)))
    }
}

export default new AuthService()
