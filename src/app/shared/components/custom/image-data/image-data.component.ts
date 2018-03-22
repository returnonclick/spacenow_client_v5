import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { AngularFirestore } from 'angularfire2/firestore'
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import * as _ from 'lodash'
import { ImageData } from '@shared/models/image-data'

@Component({
  selector: 'image-data',
  templateUrl: './image-data.component.html',
  styleUrls: ['./image-data.component.scss']
})
export class ImageDataComponent {

  //Storage path
  @Input()
  path: string

  // Emit function to send the Array of Images
  @Output()
  getImage: EventEmitter<ImageData> = new EventEmitter<ImageData>()

  // Images array to be outputed
  listImages: Array<ImageData>

  // Main task 
  task: AngularFireUploadTask

  // Progress monitoring
  percentage: Observable<number>

  // Total Files
  totalFiles: number = 0

  // Number of files
  filesCount: number = 0

  // State for dropzone CSS toggling
  isHovering: boolean

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  async startUpload(fileList: FileList) {

    this.totalFiles = fileList.length
    this.listImages = new Array()
    let filesIndex = _.range(this.totalFiles)
    for (let index of filesIndex) {
      await this.upload(fileList[index]).then(
        res => this.getImage.emit(res)
      )
      this.filesCount++
    }

    if (this.filesCount === this.totalFiles) {
      this.filesCount = 0
      this.totalFiles = 0
    }

  }

  triggerUpload() {
    document.getElementById('fileToUpload').click()
  }

  upload(file:File): Promise<any> {

    let image = new ImageData()
    image.id = new Date().getTime().toString()

    return new Promise(resolve => {

      // Client-side validation example
      if (file.type.split('/')[0] !== 'image') { 
        console.error('unsupported file type :( ')
        return
      }

      // The storage path
      const path = `${this.path}/${image.id}/${file.name}`

      // The main task
      this.task = this.storage.upload(path, file)

      // Progress monitoring
      this.percentage = this.task.percentageChanges()
      
      this.task.percentageChanges().subscribe( perc => console.log(perc))

      // Wait until observable is resolve
      this.task.downloadURL().subscribe(
        res => {
          image.imageURL = res
          return resolve(image)
        }
      )
    })
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}