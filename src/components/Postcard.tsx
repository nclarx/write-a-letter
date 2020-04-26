import {
    createStyles,
    makeStyles,
    Theme
}                      from '@material-ui/core/styles'
import React, {useRef} from 'react'
import useObservable   from '../hooks/UseObservable'
import { ImageMeta } from '../models/imageMeta'
import ImageViewer   from "./ImageViewer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        image: {
            maxWidth: '300px'
        }
    })
)

interface PostcardProps {
    postcard: ImageMeta;
}

const Postcard = (props: PostcardProps) => {
    const classes = useStyles()

    const postcard = {...props.postcard}
    const imageUrl = useObservable<string>(postcard.imgRef)

    return (
        <div>
            {
                <p>
                    {postcard.filename} - {postcard.height}, {postcard.width}
                </p>
            }
           
            {
                imageUrl && (
                    // <img className={classes.image} alt={postcard.filename} src={imageUrl} />
                    <ImageViewer imageUrl={imageUrl} />
                )
            }
        </div>
    )
}

export default Postcard
