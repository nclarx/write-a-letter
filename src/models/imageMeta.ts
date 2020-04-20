import { Observable } from 'rxjs'

export interface ImageMeta {
    id: string;
    filename: string;
    height: number;
    oldFilename: string;
    pairId: number;
    path: string;
    width: number;
    side: string;
    imgRef: Observable<string>;
}
