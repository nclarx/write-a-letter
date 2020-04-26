import OpenSeadragon from "openseadragon";
import React, {
    useEffect,
    useRef
}                    from 'react'

interface ImageViewerProps {
    imageUrl: string
}

const ImageViewer = (props: ImageViewerProps) => {
    const {imageUrl} = props
    const imgViewerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log(imgViewerRef)
        if (imgViewerRef) {
            const imageViewerOptions: OpenSeadragon.Options = {
                element: imgViewerRef.current || undefined,
                tileSources: {url: imageUrl},
                autoHideControls: true,
                crossOriginPolicy: false
            }
            const seaDragon: OpenSeadragon.Viewer = OpenSeadragon({...imageViewerOptions})
        }

    }, [imgViewerRef])

    // seaDragon.addHandler('open', (imgViewer) => {
    //    imgViewer.
    // })

    return (
        <div ref={imgViewerRef}>
        </div>
    )
}

export default ImageViewer