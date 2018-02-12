import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// import { LayoutService } from '../services/layout.service';
import * as layout from '../actions/layout.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LayoutEffects {
  constructor(
    // private layoutService: LayoutService,
    private actions$: Actions
  ) { }
  //
  // @Effect() get$ = this.actions$
  //     .ofType(layout.LOAD)
  //     .switchMap(payload => this.layoutService.get()
  //       // If successful, dispatch success action with result
  //       .map(res => ({ type: layout.LOAD_SUCCESS, payload: res.json() }))
  //       // If request fails, dispatch failed action
  //       .catch(() => Observable.of({ type: layout.LOAD_FAIL}))
  //     );
}
