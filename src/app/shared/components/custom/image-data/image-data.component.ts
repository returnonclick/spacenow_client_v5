import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { tap } from "rxjs/operators";

@Component({
  selector: 'image-data',
  templateUrl: './image-data.component.html',
  styleUrls: ['./image-data.component.scss']
})
export class ImageDataComponent {
  // Main task 
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {}
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  
  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }
    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;
    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()
    // The file's download URL
    this.downloadURL = this.task.downloadURL(); 

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('photos').add( { path, size: snap.totalBytes })
        }
      })
    )

  }
  
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
  
}

// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
// import { Store } from '@ngrx/store';

// import { ImageData } from '@shared/models/image-data';

// // import * as imageDataActions from '@core/store/images-data/actions/imageData';
// // import * as fromImageData from '@core/store/images-data/reducers';

// @Component({
//   selector: './gen-image-data',
//   templateUrl: './image-data.component.html',
//   styleUrls: ['./image-data.component.scss'],
// })
// export class ImageDataComponent {

//   imageData: ImageData;
//   selectedFiles: FileList;

//   constructor(
//     private _dialogRef: MatDialogRef<ImageDataComponent>,
//     // private _store: Store<fromImageData.State>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) { }

//   detectFiles(event) {
//     this.selectedFiles = event.target.files;
//   }

//   send() {
//     this._dialogRef.close('Your message has been sent.');
//   }

//   uploadImageData() {
//     let file = this.selectedFiles.item(0);
//     this.imageData = new ImageData();

//     // this._store.dispatch(
//     //   new imageDataActions.uploadImageData({
//     //     image: this.imageData
//     //   })
//     // );
//   }

// }
