import { Subscription } from 'rxjs'
import {
    catchError,
    filter,
    map
}                       from 'rxjs/operators'
import { ImageMeta }    from '../models/imageMeta'
import ImageMetaStore   from '../stores/ImageMetaStore'
import FirebaseService  from './FirebaseService'

class ImageMetaService {

    imageMetaCollection: ImageMeta[] | undefined

    constructor() {
    }

    public getImageCollection(collectionName: string): Subscription {
        console.log('getImageCollection called')
        return FirebaseService
            .getAll<ImageMeta>(collectionName)
            .pipe(
                filter(items => !!items),
                map((items) => items
                    .forEach((item) => {
                        ImageMetaStore.addToMetaCollection({
                            ...item,
                            imgRef: FirebaseService.getPathToAsset(`${item.path}/${item.filename}`)
                        })
                    })
                ),
                catchError((error, caught$) => {
                    console.error('Error retrieving image collection:', error)
                    return caught$
                })
            ).subscribe()
    }

}

export default new ImageMetaService()
