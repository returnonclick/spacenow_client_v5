import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromRoot              from '@core/store'
import * as layoutActions         from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  showSidenav$:      Observable<boolean>

  constructor(
    private store: Store<fromRoot.State>
  ) { 
    this.showSidenav$      = this.store.pipe(select(fromRoot.getShowSidenav))
  }

}
