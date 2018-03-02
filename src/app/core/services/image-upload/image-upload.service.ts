/* 
 * This service is for handling image files at firebase Storage & FIRESTORE!!!!
 *
 * **************************************************************************** */
import { Injectable, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';

// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';

// 3rd party notification package
// TT. We may better use it in the component that consumes this service. 
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// Models
import { ImageData } from '@models/image-data'
import { Image } from '@shared/directives/image-resize-upload/interfaces'

export class StorageFileModel {
    path: string;
    filename: string;
    downloadURL?: string;
    key?: string;

    constructor() {}
}

@Injectable()
export class ImageUploadService {
  storageRef = firebase.storage().ref()

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private fb: FirebaseApp, 
    private toastr: ToastsManager) {
  }
  ngOnInit() {}

  /** 
    * Returns list of imageData of ImageDataModel type
    *
    * @param { string } collectionName
    * @param { string } documentID
    * @param { string } imageItemName field in document that contains image meta data
    * @returns { ImageDataModel[] }
    * *************************************************************************    */
  getImageList(collectionName: string, documentID: string, imageItemName: string): Observable<ImageData[]> {  
    return new Observable(observer =>{
      let docRef = collectionName + '/' + documentID
      // Check whether doc exists
      this.afs.doc<any>(docRef).snapshotChanges().subscribe(d => {
        // make sure always having an array to return
        let imageList = []

        if(d.payload.exists) { // doc exists
          imageList = d.payload.get(imageItemName)
          if(imageList) { // data exists
            // console.log(imageList)
            observer.next(imageList)
            observer.complete()
          } else { // no data
            observer.next(new Array())
            observer.complete()
          }
        } else { // doc does not exist
          // observer.next(imageList)
          observer.next(null)
          observer.complete()
        }
      })
    })
  }

  /** 
    * `deleteImage()` deletes the image from firebase storage and 
    * its imageData in firestore
    *
    * @param { string } imageURL path to image file
    * @param { string } documentPath path to the document that contains imagedata
    * @param { string } imageItemName name of the item that contains imageData
    * @returns Promise of boolean - success or failure
    * *************************************************************************  */
  deleteImage(collectionName: string, documentID: string, imageItemName: string, storageRef: string, imageURL: string): Promise<boolean> {
    return new Promise((resolve) =>{
      let isSuccess = true;
      const docPath = collectionName + '/' + documentID
      const docRef = this.afs.doc<any>(docPath)

      // Do these as two separate steps so you can still try delete ref if file no longer exists
      // Step 1: Delete image file from firebase storage
      // console.log(storageRef)
      firebase.storage().ref().child(storageRef).delete()
      .then(() =>{
        // Step 2: Delete image data from firestore
        docRef.snapshotChanges().subscribe(doc =>{
          if(doc.payload.exists) {
            let imageList = doc.payload.get(imageItemName)
            let newImageList = []
            // filter out the image to be deleted
            newImageList = imageList.filter(image =>{
              return image.imageURL !== imageURL
            }) 

            // update imageList to the document
            this.updateImageList(docPath, imageItemName, newImageList)
            .then((res) =>{
              if(res) { resolve(true) }
              else { resolve(false) }
            })
            .catch(error =>{
              console.log(error)
              resolve(false)
            })
          } else { // document not exist
            console.log("document that contains image data does NOT exist")
            resolve(true)
          }
        })
        
      })
      .catch((error) =>{ 
          console.log(error.message)
          resolve(false)
      })

    })        
  }

  /**
   * updateImageList updates list of image meta data at imageItemName
   * Assuming that document exists (should check before calling this function)
   *
   * @param { string } docPath - Path to the document
   * @param { string } imageItemName - field at which imageMetaData stay
   * @param { ImageDataModel[] } imageList - Array of Image meta data
   * @return { Promise<boolean> } outcome
   * **************************************************************************  */
  private updateImageList(docPath: string, imageItemName: string, imageList: ImageData[]): Promise<boolean> {
    return new Promise((resolve) =>{
      const docRef = this.afs.doc<any>(docPath)
        /* For ES6 only. ES5 should create object first
         * var foo = "bar";
         * var ob  = {};
         * ob[foo] = "something"; // === ob.bar = "something" */
        docRef.update({[imageItemName]: imageList}).then(() =>{
        resolve(true)
      }).catch((error) =>{
        console.log(error)
        resolve(false)
      })
    })
  }

  /**
    * dataURItoBlob converts base64 to raw binary data held in a string
    * Ref. http://stackoverflow.com/questions/6850276/
    * Doesn't handle URLEncoded DataURIs - see SO answer #6850276 
    * for code that does this
    *
    * @param { DataURI } dataURI Path to data file
    * @returns Blob
    * ************************************************************************* */
  private dataURItoBlob(dataURI) {
      let byteString = atob(dataURI.split(',')[1])

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
      }

      return new Blob([ab], {type: mimeString})

  }

  /** 
    * getImageData returns image data from a document that contains it
    * assuming that image data stored in a document at `imageItemName`
    * as an array of imageData
    *
    * @param { string } documentPath path to the document
    * @param { string } imageItemName name of the 
    * @param { string } imageURL path to image file
    * @returns { ImageDataModel }
    * *************************************************************************    */
  getUploadedImageData(collectionName: string, documentID: string, imageItemName: string, imageURL: string): Promise<ImageData> {  
    return new Promise((resolve) =>{
    const docPath = `${collectionName}/${documentID}`
    const docRef = this.afs.doc<any>(docPath)
      let imageList: ImageData[]

      // Get imageList. Then filter that list
      docRef.snapshotChanges().subscribe(d =>{
        if(d.payload.exists) {
          imageList = d.payload.get(imageItemName).filter(imageData =>{
              return imageData.imageURL == imageURL
          })

          if(imageList.length > 0) {
            resolve(imageList[0])
          } else {
            // not found, just return a blank
            resolve(new ImageData())
          }
          
        } else {
          // not found, just return a blank
          // or maybe a null
          resolve(new ImageData())
        }
      })
    })
  }

  /** 
    * Upload image to firebase storage 
    * then update it metadata to cloud firestore
    *
    * @param { string } collectionName collection of document that contains imageData
    * @param { string } documentID ID of the document that contains imageData
    * @param { string } imageItemName name of item in the document that contains
    *                   image data. Assuming that image data keep in an array
    * @param { Image } imageFile file data to upload
    * @param { string } imageTitle name of the image
    * @returns { Promise<boolean> } outcome of uploading - sucess or failure
    * ************************************************************************* */
  uploadImage(collectionName: string, documentID: string, imageItemName: string, imageFile: Image, imageTitle: string): Promise<{imageURL: string, isSuccess: boolean}> {
    this.toastr.info(documentID)
    return new Promise((resolve) => {
      // TODO(TT): develop to validate image formats and size
      if (imageFile.file.type.split('/')[0] !== 'image') { 
        // console.error('unsupported file type :( ')
        this.toastr.error("Unsupported file type")
        return
      }

      // The storage path
      let filename = imageFile.file.name.split(".")[0]
      let ext = imageFile.file.name.split(".")[1]
      const imagePath = `images/${collectionName}/${documentID}/${filename}_original.${ext}`
      const imageRef = this.storageRef.child(imagePath);

      // the firestore path
      const dataPath = `${collectionName}/${documentID}` 
      const dataRef = this.afs.doc<any>(dataPath)


      // TT. save image to firebase storage, 
      // then save image metadata to cloud firestore
      try {
        let blob = this.dataURItoBlob(imageFile.resized.dataURL)
        // Save image to firebase storage
        imageRef.put(blob).then((snapshot) => {
          // Then save metadata to firestore
          
          // image meta data
          let imageMetaData = new ImageData()
          imageMetaData.imageURL = snapshot.downloadURL
          imageMetaData.storageRef = imagePath
          imageMetaData.imageTitle = imageTitle
          imageMetaData.imageTags.push(filename)

          // get existing imageData list
          this.getImageList(collectionName, documentID, imageItemName).subscribe(imageDataList =>{
            let newImageList: ImageData[] = new Array()
            // No data exist, just create a new document with image data
            if(typeof imageDataList !== undefined) {
              
              // console.log(imageDataList)
              if(imageDataList !== null) {
                // console.log(imageDataList)
                // add new imageData to the list
                // if imageData exist, filter it out first
                newImageList = imageDataList.filter((imageData: ImageData) =>{
                  if (imageData.storageRef == imagePath) {
                    this.toastr.info("Image already exists in our database!!!. We will update it now...")  
                  }
                  return imageData.storageRef !== imagePath 
                })
                // add new imageData to the list
                newImageList.push(imageMetaData)
                // then update the document
                dataRef.update({
                  [imageItemName]: newImageList
                })
                .then(() =>{
                  resolve({
                    imageURL: imageMetaData.imageURL,
                    isSuccess: true
                  })
                })
                .catch((error) =>{
                  console.log(error)
                  resolve({
                    imageURL: "",
                    isSuccess: false
                  })
                })
              } else {
                console.log("doc not exist. Creating one with image data")
                newImageList.push(imageMetaData)
                dataRef.set({ // create new document
                  id: documentID,
                  [imageItemName]: newImageList
                })
                .then(() =>{
                  resolve({
                    imageURL: imageMetaData.imageURL,
                    isSuccess: true
                  })
                })
                .catch((error) =>{
                  console.log(error)
                  resolve({
                    imageURL: "",
                    isSuccess: false
                  })
                })
              }// End if else

            }

          }) 

        }) 

      } catch (error) {
        console.log(error)
      } // End of try-catch

    }) // End of return

  } 


  /** 
    * updateImageData updates image meta data to firestore
    *
    * @param { string } collectionName collection of document that contains imageData
    * @param { string } documentID ID of the document that contains imageData
    * @param { string } imageItemName name of item in the document that contains
    *                   image data. Assuming that image data keep in an array
    * @param { string } imageTitle name of the image
    * @returns { Promise<boolean> } outcome of uploading - sucess or failure
    * ************************************************************************* */
  updateImageData(collectionName: string, documentID: string, imageItemName: string, imageData: ImageData): Promise<boolean> {
    return new Promise((resolve) => {

      // the firestore path
      const dataPath = `${collectionName}/${documentID}` 
      const dataRef = this.afs.doc<any>(dataPath)

        dataRef.snapshotChanges().subscribe(d =>{
          if(d.payload.exists) { // document exists
            let newImageList: ImageData[] = new Array()
            // get existing imageData list
            this.getImageList(collectionName, documentID, imageItemName).subscribe(imageDataList =>{
              if(imageDataList) {
                // add new imageData to the list
                // if imageData exist, filter it out first
                newImageList = imageDataList.filter((image: ImageData) =>{
                  return image.storageRef !== imageData.storageRef 
                })
                // add new imageData to the list
                setTimeout(() =>{
                  newImageList.push(imageData)
                  // then update the document
                  dataRef.update({
                    [imageItemName]: newImageList
                  })
                  .then(() =>{
                    resolve(true)
                  })
                  .catch((error) =>{
                    console.log(error)
                    resolve(false)
                  })

                }, 2000)
                 
              } else {
                newImageList.push(imageData)
                dataRef.update({
                  [imageItemName]: newImageList
                })
              }
            }) // end of calling getImageList function
            
          } else { // document does not exist
            console.log("document does not exist!")
            resolve(true)
          }
        })

    }) // End of return

  } 

}

