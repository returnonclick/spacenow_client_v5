import { Component, Inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'sn-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: [ './video-player.component.scss' ]
})

export class VideoPlayerComponent {

    videoSource: SafeResourceUrl

    constructor(private sanitizer: DomSanitizer, private dialogRef: MatDialogRef<VideoPlayerComponent>, @Inject(MAT_DIALOG_DATA) public data : any){
        this.videoSource = this.sanitizer.bypassSecurityTrustResourceUrl(data)
    }

    public closeDialog(){
        this.dialogRef.close();
    }

}