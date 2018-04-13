import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromRoot from '@core/store'
import * as layoutActions from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-pages-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent {

  constructor(private _store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

}
