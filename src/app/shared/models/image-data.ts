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

    imageDataID:        string          = ''
    imageFolderPath:    string          = ''               // Path to image files
    imageTitle:         string          = ''               // Image name - used in `<alt>` tag
    imageTags:          Array<string>   = new Array(); 
  
    constructor( model: any = null ) {

        super(model)

        if ( model ) {

            this.imageDataID     = model.imageDataID
            this.imageFolderPath = model.imageFolderPath
            this.imageTitle      = model.imageTitle
            this.imageTags       = model.imageTags

        }

    }

  }
