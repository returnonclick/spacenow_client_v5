import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as fromRoot              from '@core/store'
import * as layoutActions         from '@core/store/layouts/actions/layout'

@Component({
  selector: 'eff-quick-sidebar',
  templateUrl: './quick-sidebar.component.html',
  styleUrls: ['./quick-sidebar.component.scss']
})
export class QuickSidebarComponent {

  
  sidenavComponent$: Observable<string>
  sidenavComponent:  string

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.sidenavComponent$ = this.store.pipe(select(fromRoot.getSidenavComponent))

    this.sidenavComponent$.subscribe(sidenavComponent => {
      this.sidenavComponent = sidenavComponent
    })

   }

  closeSidenav() {
    this.store.dispatch(new layoutActions.CloseSidenav)
  }

}
