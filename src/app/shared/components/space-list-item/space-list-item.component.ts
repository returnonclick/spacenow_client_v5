import { Component, Input, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { Space } from '@models/space'

@Component({
  selector: 'sn-space-list-item',
  templateUrl: './space-list-item.component.html',
  styleUrls: [ './space-list-item.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class SpaceListItemComponent {

  @Input() space:          Space   = null
  @Input() showOptions:    boolean = true
  imageIndex:              number  = 0

  constructor(
    private _router: Router,
  ) { }

  handleClick(src) {
    switch(src) {
      case 'view':
        this._router.navigate([ 'space', this.space.id ])
        break;
       case 'favorite':
        console.log('favorite', this.space.id)
        // this.space.isFavorite = !this.space.isFavorite
        break;
      default:
        break;
    }
  }

  nextImage() {
    this.imageIndex = (++this.imageIndex + this.space.images.length) % this.space.images.length
  }

  prevImage() {
    this.imageIndex = (--this.imageIndex + this.space.images.length) % this.space.images.length
  }

}
