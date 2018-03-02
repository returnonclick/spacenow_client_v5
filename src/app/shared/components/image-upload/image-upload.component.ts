import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { tap } from 'rxjs/operators'

import { ToastsManager } from 'ng2-toastr'

import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'
import * as categoryActions from '@core/store/categories/actions/category'
import * as fromRoot from '@core/store'

import { Listing } from '@shared/models/listing'
import { Image, ResizeOptions } from '@shared/directives/image-resize-upload/interfaces'
import { ImageDataModel } from '@models/image-data.model'

import { ImageUploadService } from '@core/services/image-upload/image-upload.service'

export class StorageFileModel {
    path: string;
    filename: string;
    downloadURL?: string;
    key?: string;

    constructor() {}
}

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent implements OnInit {

  subfolderPath: string = "listings"

  listings: Observable<Listing[]>
  //mockup spaceID
  spaceID = "jdeDFNJooBPhIkpRcY9I"

  listingId: Observable<string>
  listing: Observable<Listing>

  uploadStatus: Observable<string>
  imageTitle: string = ""

  isShowImageTitleInput: Observable<boolean> = Observable.of(false)
  imageTitleToEdit: Observable<string>

  toUploadImage: Image
  uploadedImageData: ImageDataModel
  uploadedImageDataList: ImageDataModel[] = []
  imageDataListObservable: Observable<ImageDataModel[]>

  // TT. Need to modify depending on how large and high resolution
  // E.g. Do we intend to serve for `retinal` screen?
  desktopSize: ResizeOptions = { resizeMaxWidth: 800 }

  constructor(
    private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private imageUploadService: ImageUploadService,
    private toastr: ToastsManager,
    private store: Store<fromRoot.State>,
    private listingEffects: ListingEffects,
  ) { 


  }


  ngOnInit() {
    // use selector to get entity by Id
    this.listingId = this.store.select(fromRoot.selectCurrentListingId)

    this.listingId.subscribe(id =>{
      if(id) {
        this.spaceID = id
      }
    })
    // this.listing = this.store.select(fromRoot.selectCurrentListing)
  }

  /** 
   * Returns resized-image data emitted from image-resize-upload directive
   * When image is selected to upload into the input image-resize-upload directive
   * the image will be resized, then resized-image data is emitted from the view
   * back to component through this function. Image data is used to update
   *
   * @param image $event type of Image
   * @returns void
   *  */
  getResizedImage(image: Image): void {
    this.toUploadImage = image;
    this.uploadStatus = Observable.of('engaged')
  }

  /**
   * Calls uploadImage from pageDataService to upload the resized image to firebase storage
   *
   * @param { string } subfolderPath path to store image file at firebase storage
   * @returns void
   *  */
  uploadImageFile(collectionName: string, documentID: string, imageItemName: string, image: Image, imageTitle: string): void {
    // Show loading...
    this.uploadStatus = Observable.of('loading')

    this.imageUploadService.uploadImage(collectionName, documentID, imageItemName, image, imageTitle)
    .then(res =>{
      if(res.isSuccess) {
        setTimeout(() =>{
          this.imageUploadService.getUploadedImageData(collectionName, documentID, imageItemName, res.imageURL)
          .then(imageData =>{
            this.uploadedImageData = imageData
            // Make sure we don't have duplicated images
            console.log(this.uploadedImageData)
            this.uploadedImageDataList = this.uploadedImageDataList.filter((image: ImageDataModel) =>{
              return image.storageRef !== imageData.storageRef 
            })
            this.uploadedImageDataList.push(imageData)
            this.imageDataListObservable = Observable.of(this.uploadedImageDataList)
            this.toUploadImage = null;
           });

          if(res) { this.toastr.success("image uploaded"); }

          // Show image thumbnail
          this.uploadStatus = Observable.of('complete')
          this.isShowImageTitleInput = Observable.of(false)
        }, 0);
      } else {
        this.toastr.error("error uploading images. Please try again.")
      }
    })
    .catch(error =>{
      console.log(error);
    });

  }

  /** 
   * Delete image from storage and update its metadata at firebase /images node
   *
   * @param { string } collectionName 
   * @param { string } documentID
   * @param { string } imageItemName: image item in document that contains imageData
   * @param { string } storageRef: path to firebase storage
   * @param { string } imageURL URL
   * @returns void
   *  */
  deleteImageFile(collectionName: string, documentID: string, imageItemName: string, imageData: ImageDataModel): void {
    let storageRef = imageData.storageRef
    let imageURL = imageData.imageURL

    // Show loading
    this.uploadStatus = Observable.of('loading')

    this.imageUploadService.deleteImage(collectionName, documentID, imageItemName, storageRef, imageURL)
    .then(res =>{        
      if(res) { 
        this.uploadedImageData = null
        this.uploadedImageDataList = this.uploadedImageDataList.filter((image: ImageDataModel) =>{
          return image.storageRef !== imageData.storageRef
        })
        this.uploadStatus = Observable.of(null)
        this.imageDataListObservable = Observable.of(this.uploadedImageDataList)
        this.toastr.success("image deleted")
        // Hide loading
        this.uploadStatus = Observable.of('complete')
      } else { // Deleting unsuccessfully
        this.toastr.error("Could not delete the image. Please try again")
        this.uploadStatus = Observable.of('complete')
      }
    })
    .catch(error =>{
      console.log(error);
      this.uploadStatus = Observable.of('complete')
    });
  }


  /**
   * Update Image Meta Data
   *
   * @param { string } 
   * @returns void
   *  */
  updateImageData(collectionName: string, documentID: string, imageItemName: string, imageData: ImageDataModel, imageTitle: string): void {
    // Show loading...
    let newImageData: ImageDataModel = imageData
    newImageData.imageTitle = imageTitle
    this.imageUploadService.updateImageData(collectionName, documentID, imageItemName, newImageData)
    .then(res =>{
      if(res) {
        //Update local ImageDataList
        let tmpImageDataList = this.uploadedImageDataList.filter(imageData =>{
          return imageData.storageRef !== imageData.storageRef
        }) 

        tmpImageDataList.push(newImageData)
        this.uploadedImageDataList = tmpImageDataList
        this.imageDataListObservable = Observable.of(this.uploadedImageDataList)
        
        this.toastr.success("Image title updated!")
        this.isShowImageTitleInput = Observable.of(false)
      } else {
        this.toastr.error("error uploading images. Please try again.")
        this.isShowImageTitleInput = Observable.of(false)
      }
    })
    .catch(error =>{
      console.log(error);
    });

  }

  toggleImageTitleInput(imageTitle) {
    this.isShowImageTitleInput = Observable.of(true)
    this.imageTitleToEdit = Observable.of(imageTitle)
  }

}
