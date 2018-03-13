import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { SpaceService } from '@core/store/space/space.service'
import * as actions from '@core/store/space/space.actions'
import { Space } from '@models/space'

@Injectable()
export class SpaceEffects {

  constructor(
    private actions$: Actions,
    private spaceService: SpaceService) {}
    
    @Effect()
    public loadSpaces: Observable<Action> = this.actions$.pipe(
      ofType<actions.LoadSpaces>(actions.SpaceActionTypes.LoadSpaces),
        switchMap(() => this.spaceService.getSpaces()),
        map((data: Space[]) => new actions.LoadSpacesSuccess({spaces: data}))
    )

    @Effect()
    public loadSpace: Observable<Action> = this.actions$.pipe(
        ofType<actions.LoadSpace>(actions.SpaceActionTypes.LoadSpace),
        switchMap(data => this.spaceService.getSpace(data.payload.spaceID)),
        map((space: Space) => new actions.LoadSpaceSuccess({ space: space }))
    )

}
