import {
  Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList,
  ElementRef, OnDestroy
}                                 from '@angular/core';
import { Subscription, Subject }  from "rxjs";
import { MediaChange}             from "@angular/flex-layout";
import { Router, NavigationEnd }  from "@angular/router";
import { AngularFireAuth }        from 'angularfire2/auth';
import { Observable }             from 'rxjs'

import { Store }                  from '@ngrx/store';
import { User }                   from '@shared/models/user'

import * as actions               from '@core/store/auth/actions/auth'
import * as fromRoot              from '@core/store'

@Component({
  selector: 'gen-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav;

  authUser$: Observable<User[]>
  authUser: User
  isLoggedIn$: Observable<boolean>

  private _mediaSubscription: Subscription;
  private _routerEventsSubscription: Subscription;
  private _ngUnsubscribe: Subject<void> = new Subject<void>()

  quickpanelOpen: boolean = false;
  sidenavOpen: boolean = false;
  sidenavMode: string = 'side';
  isMobile: boolean = false;

  buyNowToolbarVisible = true;

  constructor(
    private router: Router,
    private _store: Store<fromRoot.State>,
    private afAuth: AngularFireAuth
  ) {
    this.authUser$ = this._store.select(fromRoot.getAllAuth)
    this.isLoggedIn$ = this._store.select(fromRoot.getIsSignedInState)
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((userData) => this._store.dispatch(new actions.GetUser(userData)))
    this.authUser$.subscribe( user => this.authUser = user[0] )

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidenav.close();
      }
    });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next()
    this._ngUnsubscribe.complete()
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
