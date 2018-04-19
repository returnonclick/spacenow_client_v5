/*
 * ImageDataModel casts image meta data
 * Each image uploaded will be resized and regenerated
 * in various sizes: original, fullwidth, halfwidth, thumbnail
 *
 * Path to Firebase Storage: `images/...`.
 * Image path format for `spaces` node
 * `/images/spaces/{spaceID}/{imageID}/{IMAGE_FILE_IN_VARIOUS_SIZE.JPG}`
 * IMAGE_FILE_IN_VARIOUS_SIZE = `original.jpg` | `fullsize.jpg`
 * `halfsize.jpg` | `quartersize.jpg` | `thumbnail.jpg`
 *  */
export class ImageDataModel extends Object {
  imageURL:   string   = "" // Path to image files
  storageRef: string   = "" // Path to firebase storage
  imageTitle: string   = "" // Image name - used in `<alt>` tag
  imageTags:  string[] = new Array() 

  constructor() {
    super()
  }
}
