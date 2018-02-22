// export class ImageData {
//     imageDataID:        string          = ''
//     imageFolderPath:    string          = ''               // Path to image files
//     imageTitle:         string          = ''               // Image name - used in `<alt>` tag
//     imageTags:          Array<string>   = new Array();
//
//     constructor( model: any = null ) {
//
//         if ( model ) {
//
//             this.imageDataID     = model.imageDataID
//             this.imageFolderPath = model.imageFolderPath
//             this.imageTitle      = model.imageTitle
//             this.imageTags       = model.imageTags
//
//         }
//
//     }
//
//   }


export class ImageData extends Object {

constructor(
  public imageURL: string = "", // Path to image files
  public storageRef: string = "", // Path to firebase storage
  public imageTitle: string="", // Image name - used in `<alt>` tag
  public imageTags: string[] = new Array()
) {
    super()
  }
}
