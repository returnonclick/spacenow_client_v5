import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs'

import { Space } from '@shared/models/space'

import * as fromRoot from '@core/store'

@Injectable()
export class SearchService {

  spaces$: Observable<Space[]>

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
      address: {
        latitude: (Math.random() - 0.5) / 100.0,
        longitude: (Math.random() - 0.5) / 100.0,
      },
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
      address: {
        latitude: (Math.random() - 0.5) / 100.0,
        longitude: (Math.random() - 0.5) / 100.0,
      },
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
      address: {
        latitude: (Math.random() - 0.5) / 100.0,
        longitude: (Math.random() - 0.5) / 100.0,
      },
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
      address: {
        latitude: (Math.random() - 0.5) / 100.0,
        longitude: (Math.random() - 0.5) / 100.0,
      },
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
      address: {
        latitude: (Math.random() - 0.5) / 100.0,
        longitude: (Math.random() - 0.5) / 100.0,
      },
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
      address: {
        latitude: (Math.random() - 0.5) / 100.0,
        longitude: (Math.random() - 0.5) / 100.0,
      },
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
      address: {
        latitude: (Math.random() - 0.5) / 100.0,
        longitude: (Math.random() - 0.5) / 100.0,
      },
    },
  ]

  constructor(
    public afs: AngularFirestore,
    public store: Store<fromRoot.State>
  ) {
    this.spaces$ = this.store.select(fromRoot.getAllListings)
  }

  public query(params: any = null) {
    return Observable.of(this.spaces).delay(3000)
    // return this.spaces$.map(spaces =>
    //   spaces.filter(x => x)
    // )
  }

}
