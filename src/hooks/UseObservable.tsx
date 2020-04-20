import { useEffect, useState } from 'react'
import { Observable }          from 'rxjs'

export default function useObservable<T>(observable$: Observable<T>): T | undefined {
    const [data, setData] = useState<T>()
    useEffect(() => {
        const subscription = observable$
            .subscribe((nextValue) => {
                console.log('Use Observable hook:', nextValue)
                setData(nextValue)
            })
        return subscription.unsubscribe()
    }, [observable$])
    return data
}
