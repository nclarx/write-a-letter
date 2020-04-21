import { BehaviorSubject } from 'rxjs'
import { ImageMeta }       from '../models/imageMeta'

class ImageMetaStore {

    metaCollection: BehaviorSubject<ImageMeta[] | undefined>

    constructor() {
        this.metaCollection = new BehaviorSubject<ImageMeta[] | undefined>(undefined)
    }

    public updateCollection(items: ImageMeta[]): void {
        const currentState = this.metaCollection.getValue()
        if (currentState) {
            this.metaCollection.next([
                ...currentState,
                ...items
            ])
        }
    }
}

export default new ImageMetaStore()
