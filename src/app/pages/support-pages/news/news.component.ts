import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'

import * as fromRoot from '@core/store'
import * as pageActions from '@core/store/pages/actions/page'

import { Page } from '@shared/models/page'

@Component({
  selector: 'sn-newss',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent {
 

  pages$: Observable<Page[]>
  pages: Page[]

  closeHelp: boolean = false

  constructor(private _store: Store<fromRoot.State>,
              private router: Router
  ) {

    this.pages$ = this._store.select( fromRoot.getAllPages )
    this.pages$.subscribe(page => {
      if (page) {
        console.log(page)
      }
    })
   }

   ngOnInit() {
    this._store.dispatch(new pageActions.Query())
     console.log('hola')
   }

}
 