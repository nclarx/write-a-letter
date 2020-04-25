import {
    autorun,
    computed,
    observable
}                    from 'mobx'
import { ImageMeta } from '../models/imageMeta'

class ImageMetaStore {

    @observable metaCollection: ImageMeta[]
    @observable pendingRequests: number

    constructor() {
        this.metaCollection = [] // ensure that anything marked with observable is initialised before `autorun` is called
        this.pendingRequests = 0
        autorun(() => console.log(this.getAllImageMeta))

        // setInterval(() => {
        //     this.addToMetaCollection({
        //         id: 'sdfsdf',
        //         filename: 'dfjskjfsd.jpg',
        //         height: 1000,
        //         oldFilename: 'sfksdfj.jpg',
        //         pairId: 123,
        //         path: 'sdlfj/3dsfdsf/443',
        //         width: 1000,
        //         side: 'front',
        //         imgRef: of('Hello')
        //     })
        //     console.log(this.metaCollection)
        // }, 3000)


    }

    @computed get getAllImageMeta(): ImageMeta[] {
        if (this.metaCollection.length > 0) {
            return this.metaCollection
        }
        return []
    }

    @computed get getCountOfImageMeta(): number {
        return this.metaCollection.length
    }

    public addToMetaCollection(meta: ImageMeta) {
        console.log(`Image meta added to store:`, meta)
        this.metaCollection.push(meta)
    }

    public updateCollection(items: ImageMeta[]): void {
        const currentState = [...this.metaCollection]
        if (currentState) {
            this.metaCollection = [
                ...currentState,
                ...items
            ]
        }
    }
}

export default new ImageMetaStore()
