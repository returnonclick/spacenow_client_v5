import { Component } from '@angular/core'
import { Store, select }          from '@ngrx/store'
import { CardComponent, FeaturedCardComponent } from '@shared/components/custom/cards'

import * as fromRoot              from '@core/store'
import * as actions         from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {

  constructor(
    private _store: Store<fromRoot.State>
  ){}

  ngOnInit() {
    this._store.dispatch(new actions.SetLogoWhite())
  }

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

