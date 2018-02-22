import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { SpaceEffects } from './space.effects';

describe('SpaceService', () => {
  let actions$: Observable<any>;
  let effects: SpaceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpaceEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SpaceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
