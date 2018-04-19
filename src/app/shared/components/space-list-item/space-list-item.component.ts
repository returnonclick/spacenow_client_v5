import { Component, Input, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { ListingShortDetail } from '@shared/models/listing-short-detail'

@Component({
  selector: 'sn-space-list-item',
  templateUrl: './space-list-item.component.html',
  styleUrls: [ './space-list-item.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class SpaceListItemComponent {

  @Input() space: ListingShortDetail = null
  imageIndex:     number             = 0

  imageRequest = "https://sn-image-service.appspot.com/crop?key=Spacenow123&width=400&height=300&url="

  constructor(private _router: Router) { }

  handleClick(src) {
    switch(src) {
      case 'view':
        this._router.navigate([ 'space', this.space.id ])
        break
      default:
        break
    }
  }

}
