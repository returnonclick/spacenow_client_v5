import { Component, HostListener } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Space } from '@models/space'

import * as fromRoot from '@core/store'
import * as spaceActions from '@core/store/spaces/actions/space'
@Component({
  selector: 'sn-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class SpaceComponent {

  // didScroll:      boolean
  // lastScrollTop:  number  = 0
  // delta:          number  = 50
  // isSticky$:      Observable<boolean>

  space$:         Observable<Space>
  isLoadingPage$: Observable<boolean>

  spaceId:        string = ''

  // @HostListener('window:scroll', ['$event'])
  // stopMoving(event) {
  //   this.didScroll = true
  //
  //   if(window.pageYOffset > 240)
  //     this.isSticky$ = Observable.of(true)
  //   else
  //     this.isSticky$ = Observable.of(false)
  //
  //   if(window.screen.availHeight - window.pageYOffset < 300)
  //     this.isSticky$ = Observable.of(false)
  //
  //   setInterval(() => {
  //     if(this.didScroll) {
  //       this.hasScrolled(window.pageYOffset)
  //       this.didScroll = false
  //     }
  //   }, 200)
  // }

  constructor(
    private _store: Store<fromRoot.State>,
    private _route: ActivatedRoute,
  ) {
    this.isLoadingPage$ = this._store.select(fromRoot.isLoadingSpaces)
    this.space$         = this._store.select(fromRoot.getSpaceEntities).map(spaces => {
      if(spaces[this.spaceId])
        return spaces[this.spaceId]
      return null
    })
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.spaceId = params.id
      this._store.dispatch(new spaceActions.Select(this.spaceId))
    })
  }

  // private hasScrolled(st: number) {
  //   if(Math.abs(st - this.lastScrollTop) < this.delta) {
  //     let gap = st - this.lastScrollTop - this.delta
  //     return
  //   }
  //
  //   // If current position > last position
  //   if(st > this.lastScrollTop) // Scroll Down
  //     this.isSticky$ = Observable.of(false)
  //   else // Scroll Up
  //     this.isSticky$ = Observable.of(true)
  //
  //   this.lastScrollTop = st
  // }

}
