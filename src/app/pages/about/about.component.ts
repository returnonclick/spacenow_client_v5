import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromRoot from '@core/store'
import * as layoutActions from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private _store: Store<fromRoot.State>) { }

  ngOnInit() {
    this._store.dispatch(new layoutActions.SetLogoWhite)
  }

}
