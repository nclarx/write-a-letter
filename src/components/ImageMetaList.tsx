import { observer }  from 'mobx-react'
import React         from 'react'
import { ImageMeta } from '../models/imageMeta'
import Postcard      from './Postcard'

interface ImageMetaListProps {
    imageMeta: ImageMeta[] | undefined
}

const ImageMetaList = observer((props: ImageMetaListProps): JSX.Element => {

    const imageMeta = props.imageMeta

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
