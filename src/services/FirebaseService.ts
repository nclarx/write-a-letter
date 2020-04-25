import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import {
    BehaviorSubject,
    from,
    Observable,
    of
}                    from 'rxjs'

class FirebaseService {

    app: firebase.app.App

    constructor() {
        this.app = firebase.initializeApp(
            {
                apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
                authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
                projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
                storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || ''
            })
    }

    public getAll<T>(collectionName: string, limit: number = 10): Observable<T[]> {
        const firestoreRef = firebase.firestore()
        const collection$: BehaviorSubject<any> = new BehaviorSubject(null)

        firestoreRef.collection(collectionName).limit(limit)
                    .onSnapshot((document) => {
                        const collection: T[] = []
                        document.forEach(
                            (doc) =>
                                collection.push(doc.data() as T))
                        console.log('Collection', collection)
                        collection$.next(collection)
                    })
        return collection$
    }

    public getItemById<T>(collectionName: string, itemId: string): Observable<T> {
        return of()
    }

    public getPathToAsset(path: string): Observable<string> {
        const storageRef = firebase.storage()
        return from(storageRef.ref(path).getDownloadURL())
    }
}

export default new FirebaseService()
