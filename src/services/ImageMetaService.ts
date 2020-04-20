import { Observable }  from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { ImageMeta }   from '../models/imageMeta'
import FirebaseService from './FirebaseService'

export const getImageCollection = (collectionName: string): Observable<ImageMeta[]> => {
    return FirebaseService.getAll<ImageMeta>(collectionName)
                          .pipe(
                              filter(items => !!items),
                              map((items) => items
                                  .map((item) => {
                                      const imgMeta = {...item}
                                      imgMeta.imgRef = FirebaseService.getPathToAsset(`${item.path}/${item.filename}`)
                                      return imgMeta
                                  })
                              )
                          )
}
