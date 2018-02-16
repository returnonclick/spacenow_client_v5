import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'sn-space-list-item',
  templateUrl: './space-list-item.component.html',
  styleUrls: [ './space-list-item.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class SpaceListItemComponent {

  @Input() space: any = null

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
      default:
        break;
    }
  }

}
