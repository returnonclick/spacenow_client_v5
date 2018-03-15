import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { Space } from '@models/space'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as spaceActions from '@core/store/spaces/actions/space'

@Component({
  selector: 'sn-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: [ './my-favorites.component.scss' ]
})
export class MyFavoritesComponent {

  spaces: any[] = [
    {
      id: 'aRticTvSPf23265gUOZn',
      name: 'Newtown Office',
      images: [
        'https://s7d4.scene7.com/is/image/roomandboard/parsons_189554_17e_g?$str_g$&size=760,480&scl=1',
        'https://ycdn.space/h/2012/09/001-contemporary-office-space.jpg',
        'http://www.proxsen.com/media/img/nice-spaces-office-space-modern-workplace-space-in-california-architecture-workplace.jpg',
        'https://ycdn.space/h/2012/09/003-contemporary-office-space.jpg',
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
    {
      id: 'DSnaaofV7ai42AFIXiLp',
      name: 'Newtown Office',
      images: [
        'http://www.proxsen.com/media/img/nice-spaces-office-space-modern-workplace-space-in-california-architecture-workplace.jpg'
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
    {
      id: 'CbqprxXGgdg4Nnib0U5A',
      name: 'Newtown Office',
      images: [
        'https://ycdn.space/h/2012/09/001-contemporary-office-space.jpg'
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
    {
      id: 'IOHN8NV2O13ZYiedoxkk',
      name: 'Newtown Office',
      images: [
        'https://ycdn.space/h/2012/09/001-contemporary-office-space.jpg',
        'http://www.proxsen.com/media/img/nice-spaces-office-space-modern-workplace-space-in-california-architecture-workplace.jpg',
        'https://ycdn.space/h/2012/09/003-contemporary-office-space.jpg',
        'https://s7d4.scene7.com/is/image/roomandboard/parsons_189554_17e_g?$str_g$&size=760,480&scl=1',
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
    {
      id: '06Eb1dBXlCUhdmHNPLzq',
      name: 'Newtown Office',
      images: [
        'https://s7d4.scene7.com/is/image/roomandboard/parsons_189554_17e_g?$str_g$&size=760,480&scl=1'
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
    {
      id: 'mV6SxkAoMr6JFkcW5Wle',
      name: 'Newtown Office',
      images: [
        'https://ycdn.space/h/2012/09/001-contemporary-office-space.jpg',
        'https://s7d4.scene7.com/is/image/roomandboard/parsons_189554_17e_g?$str_g$&size=760,480&scl=1',
        'https://ycdn.space/h/2012/09/003-contemporary-office-space.jpg',
        'http://www.proxsen.com/media/img/nice-spaces-office-space-modern-workplace-space-in-california-architecture-workplace.jpg',
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
    {
      id: 'e1tkzwW9BBVyqC3Bpvgr',
      name: 'Newtown Office',
      images: [
        'https://ycdn.space/h/2012/09/003-contemporary-office-space.jpg'
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
    {
      id: 'OLxJ9e0CrrBPnWcRlmhz',
      name: 'Newtown Office',
      images: [
        'https://ycdn.space/h/2012/09/001-contemporary-office-space.jpg',
        'https://s7d4.scene7.com/is/image/roomandboard/parsons_189554_17e_g?$str_g$&size=760,480&scl=1',
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
    {
      id: 'HzjXF6miyaHFxmHy3Ovi',
      name: 'Newtown Office',
      images: [
        'https://s7d4.scene7.com/is/image/roomandboard/parsons_189554_17e_g?$str_g$&size=760,480&scl=1',
        'https://ycdn.space/h/2012/09/001-contemporary-office-space.jpg',
        'http://www.proxsen.com/media/img/nice-spaces-office-space-modern-workplace-space-in-california-architecture-workplace.jpg',
        'https://ycdn.space/h/2012/09/003-contemporary-office-space.jpg',
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
    {
      id: 'iJs5UQ60wEl5U1yOvLay',
      name: 'Newtown Office',
      images: [
        'http://www.proxsen.com/media/img/nice-spaces-office-space-modern-workplace-space-in-california-architecture-workplace.jpg',
        'https://ycdn.space/h/2012/09/001-contemporary-office-space.jpg',
      ],
      price: '40 AUD',
      priceUnit: 'day',
      details: 'Multiple spaces',
    },
  ]

  spaces$: Observable<Space[]>
  user$:   Observable<User>

  constructor(
    private _store: Store<fromRoot.State>
  ) {
    this.spaces$ = this._store.select(fromRoot.getAllSpaces)
    this.user$   = this._store.select(fromRoot.getSelectedAuth)

    Observable.combineLatest(
      this.spaces$,
      this.user$
    ).subscribe(([spaces, user]) => {

    })
  }

  ngOnInit() {
    this._store.dispatch(new spaceActions.All)
  }

}
