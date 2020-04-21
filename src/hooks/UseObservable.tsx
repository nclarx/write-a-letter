import {
    useEffect,
    useState
}                     from 'react'
import { Observable } from 'rxjs'
import { take }       from 'rxjs/operators'

export default function useObservable<T>(observable$: Observable<T>): T | undefined {
    const [state, setState] = useState<T>()
    useEffect(() => {
        const subscription = observable$
            .pipe(take(1)) // Takes the first value and completes the observable
            .subscribe((nextValue) => {
                setState(nextValue)
                console.log(subscription)
            })
        return () => subscription.unsubscribe()
    }, [])
    return state
}
