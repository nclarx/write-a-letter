import { Observable }  from 'rxjs'
import {
    catchError,
    filter,
    map
}                      from 'rxjs/operators'
import { ImageMeta }   from '../models/imageMeta'
import FirebaseService from './FirebaseService'

export const getImageCollection = (collectionName: string): Observable<ImageMeta[]> => {
    return FirebaseService
        .getAll<ImageMeta>(collectionName)
        .pipe(
            filter(items => !!items),
            map((items) => items
                .map((item) => {
                    return {
                        ...item,
                        imgRef: FirebaseService.getPathToAsset(`${item.path}/${item.filename}`)
                    }
                })
            ),
            map((items) => {

                return items
            }),
            catchError((error, caught$) => {
                console.error('Error retrieving image collection:', error)
                return caught$
            })
        )
}
