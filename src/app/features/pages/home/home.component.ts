import { Component } from '@angular/core'
import { CardComponent, FeaturedCardComponent } from '@shared/components/custom/cards'

@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {

  sliderComponent: any = CardComponent
  sliderFeaturedComponent: any = FeaturedCardComponent
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

