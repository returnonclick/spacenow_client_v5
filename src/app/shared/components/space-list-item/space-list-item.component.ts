import { Component, Input, ViewEncapsulation } from '@angular/core'

import { Space } from '@models/space'

@Component({
  selector: 'sn-space-list-item',
  templateUrl: './space-list-item.component.html',
  styleUrls: [ './space-list-item.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class SpaceListItemComponent {

  @Input() space:          Space   = null
  @Input() multipleImages: boolean = true
  @Input() showOptions:    boolean = true
  imageIndex:              number  = 0

  handleClick(src) {
    switch(src) {
      case 'view':
        console.log('view', this.space.id)
        break;
      case 'edit':
        console.log('edit', this.space.id)
        break;
      case 'delete':
        console.log('delete', this.space.id)
        break;
      case 'duplicate':
        console.log('duplicate', this.space.id)
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
