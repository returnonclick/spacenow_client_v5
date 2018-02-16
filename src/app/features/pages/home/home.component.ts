import { Component } from '@angular/core'
import { CardComponent } from '@shared/components/custom/card/card.component'

@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {

  sliderComponent: any = CardComponent
  data: Array<any> = [{
    isNew: true
  }, {
    isNew: !true
  }, {
    isNew: true
  }, {
    isNew: true
  }, {
    isNew: !true
  }, {
    isNew: true
  }, {
    isNew: !true
  }, {
    isNew: true
  }]
}
