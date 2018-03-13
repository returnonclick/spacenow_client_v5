/* 
 * ImageDataModel casts image meta data
 * Each image uploaded will be resized and regenerated
 * in various sizes: original, fullwidth, halfwidth, thumbnail
 *
 * Path to Firebase Storage: `images/...`.
 * `/images/{MODULE}/{moduleID}/{imageID}/{IMAGE_FILE_IN_VARIOUS_SIZE.JPG}`
 * IMAGE_FILE_IN_VARIOUS_SIZE = `original.jpg` | `fullsize.jpg`
 * `halfsize.jpg` | `quartersize.jpg` | `thumbnail.jpg`
 * 
 *  */

export class ImageData extends Object {

    id:         string          = ''
    path:       string          = ''               // Path to image files
    title:      string          = ''               // Image name - used in `<alt>` tag
    tags:       Array<string>   = new Array();
    imageURL:   string          = ''
    storageRef: string          = ''
  
    constructor( model: any = null ) {

        super(model)

        if ( model ) {

            this.id         = model.id
            this.path       = model.path
            this.title      = model.title
            this.tags       = model.tags
            this.imageURL   = model.imageURL
            this.storageRef = model.storageRef

        }

    }

}
