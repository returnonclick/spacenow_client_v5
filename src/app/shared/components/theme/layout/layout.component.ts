import {
  Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList,
  ElementRef, OnDestroy
} from '@angular/core';
import { Subscription, Subject } from "rxjs";
import { MediaChange} from "@angular/flex-layout";
import { Router, NavigationEnd } from "@angular/router";

import { Store } from '@ngrx/store';

@Component({
  selector: 'gen-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav;

  private _mediaSubscription: Subscription;
  private _routerEventsSubscription: Subscription;
  private _ngUnsubscribe: Subject<void> = new Subject<void>()

  quickpanelOpen: boolean = false;
  sidenavOpen: boolean = true;
  sidenavMode: string = 'side';
  isMobile: boolean = false;

  buyNowToolbarVisible = true;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
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
