import { Component, OnInit, ViewChild, Input, ViewContainerRef, HostListener, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'sn-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {

    public didScroll: boolean;
    public lastScrollTop: number = 0;
    public delta: number = 50;
    public isStopNow: Observable<boolean>;

    Math: any;

    @HostListener('window:scroll', ['$event'])
        stopMoving(event) {
            this.didScroll = true;
            // console.log(window.pageYOffset);
            if(window.pageYOffset > 200) {
                this.isStopNow = Observable.of(true);
            }

            if(window.screen.availHeight - window.pageYOffset < 300) {
              this.isStopNow = Observable.of(false)
            }

            setInterval(() =>{
                if(this.didScroll) {
                    this.hasScrolled(window.pageYOffset);
                    this.didScroll = false;
                }
            },200);
        }
    constructor() {
        this.Math = Math;
    }

  ngOnInit() {
  }


    private hasScrolled(st: number) {
       if (this.Math.abs(st - this.lastScrollTop) < this.delta){
            let gap = st - this.lastScrollTop - this.delta; 
            return;
       }
        
        // If current position > last position
        if (st > this.lastScrollTop){
          // Scroll Down
          this.isStopNow = Observable.of(false);
        } else {
          // Scroll Up
          this.isStopNow = Observable.of(true);
        }

        this.lastScrollTop = st;
    }

}
