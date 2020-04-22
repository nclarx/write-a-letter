import { observer }         from 'mobx-react'
import React, { useEffect } from 'react'
import { ImageMeta }        from '../models/imageMeta'
import Postcard             from './Postcard'

interface ImageMetaListProps {
    imageMeta: ImageMeta[]
}

const ImageMetaList = observer((props: ImageMetaListProps): JSX.Element => {

    const imageMeta = props.imageMeta

    useEffect(() => {
        console.log('Image Meta updated, number of imageMeta: ', props.imageMeta.length)
        console.log(`Look at me, i'm not just an array of image meta..i'm wrapped in MobX's observable stuff: `, props.imageMeta)
        console.log(`This use effect fires because its dependency is imageMeta.length`)
    }, [props.imageMeta.length])

    const renderCardList = () => (
        <section>
            <ul>
                {
                    imageMeta && imageMeta.map((card, idx) => (
                        <div key={idx}>
                            <Postcard postcard={card} />
                        </div>
                    ))
                }
            </ul>
        </section>
    )
    return (
        <section>
            {renderCardList()}
        </section>
    )

})

export default ImageMetaList
