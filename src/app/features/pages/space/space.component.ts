import { Component, HostListener } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Space } from '@models/space'

import * as fromRoot from '@core/store'
import * as spaceActions from '@core/store/spaces/actions/space'

@Component({
  selector: 'sn-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent {

  space$:         Observable<Space>
  isLoadingPage$: Observable<boolean>

  fragment:       string = ''
  spaceId:        string = ''
  latitude:       number = 0
  longitude:      number = 0

  constructor(
    private _store:  Store<fromRoot.State>,
    private _route:  ActivatedRoute,
    private _router: Router,
  ) {
    this.isLoadingPage$ = this._store.select(fromRoot.isLoadingSpaces)
    this.space$         = this._store.select(fromRoot.getSpaceEntities).map(spaces => {
      if(spaces[this.spaceId]) {
        let space      = spaces[this.spaceId]
        this.latitude  = +space.address.latitude
        this.longitude = +space.address.longitude

        return space
      }
      return null
    })
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.spaceId = params.id
      this._store.dispatch(new spaceActions.Select([ this.spaceId ]))
    })
    this._route.fragment.subscribe(fragment => {
      this.fragment = fragment
      this.jumpToSection()
    })
  }

  ngAfterViewInit() {
    this.jumpToSection()
  }

  jumpToSection() {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    }
    catch(e) { }
  }

  navigateTo(fragment: string) {
    this._router.navigate(
      [ '.' ], {
        relativeTo: this._route,
        fragment: fragment,
      }
    )
  }

}
