import React         from 'react'
import useObservable from '../hooks/UseObservable'
import { ImageMeta } from '../models/imageMeta'

interface PostcardProps {
    postcard: ImageMeta;
}

const Postcard = (props: PostcardProps) => {
    const postcard = {...props.postcard}
    const imageUrl = useObservable<string>(postcard.imgRef)

    return (
        <div>
            {
                imageUrl && (
                    <img alt={postcard.filename} src={imageUrl} />
                )
            }
        </div>
    )
}

export default Postcard
