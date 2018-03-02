import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { tap, map } from "rxjs/operators";
import { ImageData } from "@shared/models//image-data"

@Component({
  selector: 'image-data',
  templateUrl: './image-data.component.html',
  styleUrls: ['./image-data.component.scss']
})


export class ImageDataComponent {

  // The storage path
  @Input('path')
  public path: string

  @Output('imagesList') 
  public imagesList = new EventEmitter<ImageData[]>();

  images: Array<ImageData> = new Array()
  image: ImageData

  // Main task 
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  constructor(
    private storage: AngularFireStorage, 
    private db: AngularFirestore) {}
  
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
    const path = `${this.path}/${new Date().getTime()}_${file.name}`
    //const path = `test/${new Date().getTime()}_${file.name}`;
    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()
    // The file's download URL
    this.downloadURL = this.task.downloadURL()
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {

        //   this.image.imageFolderPath = snap.totalBytes
        //   this.images.push(this.image)
        //   this.imagesList.emit(this.images)
         
        }
      })
    )

  }
  
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
  
}
