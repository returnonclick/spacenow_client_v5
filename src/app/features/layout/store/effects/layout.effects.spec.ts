import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import { EffectsRunner, EffectsTestingModule } from "@ngrx/effects/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { LayoutEffects } from "../effects/layout.effects";
import { LayoutService } from "../services/layout.service";
import { Observable } from "rxjs/Observable";

describe('LayoutEffects', () => {
  let runner, layoutEffects, layoutService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      LayoutEffects,
      {
        provide: LayoutService,
        useValue: jasmine.createSpyObj('layoutService', ['get'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    layoutEffects = TestBed.get(LayoutEffects);
    layoutService = TestBed.get(LayoutService);
  });

  describe('layout$', () => {

    it('should return a LOAD_SUCCESS action, on success', function () {

    });

    it('should return a LOAD_FAIL action, on error', function () {

    });

  });

});