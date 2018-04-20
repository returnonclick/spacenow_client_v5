import { AgmMap } from '@agm/core'
import { Component, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Dictionary } from '@ngrx/entity/src/models'
import { Store } from '@ngrx/store'
import { } from 'googlemaps'
import { Observable, Subject } from 'rxjs'
import 'rxjs/add/operator/takeUntil'

import { Amenity } from '@models/amenity'
import { Category } from '@models/category'
import { Profile } from '@models/profile'
import { Space } from '@models/space'
import { ListingShortDetail } from '@models/listing-short-detail'
import { User } from '@models/user'

import * as fromRoot from '@core/store'
import * as amenityActions from '@core/store/amenities/actions/amenity'
import * as categoryActions from '@core/store/categories/actions/category'
import * as layoutActions from '@core/store/layouts/actions/layout'
import * as profileActions from '@core/store/users-profile/actions/user-profile'
import * as spaceActions from '@core/store/spaces/actions/space'
import * as userActions from '@core/store/users/actions/user'

@Component({
  selector: 'sn-space',
  templateUrl: './space.component.html',
  styleUrls: [ './space.component.scss' ],
})
export class SpaceComponent {

  @ViewChild(AgmMap) map: AgmMap

  amenities$:     Observable<Dictionary<Amenity>>
  categories$:    Observable<Dictionary<Category>>
  isLoadingPage$: Observable<boolean>
  owner$:         Observable<Dictionary<User>>
  spaces$:        Observable<Dictionary<Space | ListingShortDetail>>
  stopper$:       Subject<boolean>

  fragment:       string  = ''
  latitude:       number  = 0
  longitude:      number  = 0
  owner:          User    = null
  ownerProfile:   Profile = null
  space:          Space   = null
  spaceId:        string  = ''

  constructor(
    private _store:  Store<fromRoot.State>,
    private _route:  ActivatedRoute,
    private _router: Router,
  ) {
    this.amenities$     = this._store.select(fromRoot.getAmenityEntities)
    this.categories$    = this._store.select(fromRoot.getCategoryEntities)
    this.isLoadingPage$ = this._store.select(fromRoot.isLoadingSpaces)
    this.owner$         = this._store.select(fromRoot.getUserEntities)
    this.spaces$        = this._store.select(fromRoot.getSpaceEntities)
    this.stopper$       = new Subject()


    Observable.combineLatest(
      this.spaces$,
      this.owner$,
    ).takeUntil(this.stopper$)
      .subscribe(([spaces, owner]) => {
        if(spaces[this.spaceId]) {
          this.space     = spaces[this.spaceId] as Space
          this.latitude  = +this.space.address.latitude
          this.longitude = +this.space.address.longitude

          if(owner[this.space.ownerUid]) {
            this.owner = owner[this.space.ownerUid]
            this._store.dispatch(new profileActions.Query(this.owner.uid))
          }
          else
            this._store.dispatch(new userActions.Select([ this.space.ownerUid ]))
        }
      })

    this._store.select(fromRoot.getSelectedUserProfile).subscribe(profile => {

      if(profile)
        this.ownerProfile = profile
    })
  }

  ngOnInit() {
    this._store.dispatch(new amenityActions.Query)
    this._store.dispatch(new categoryActions.Query)
    this._store.dispatch(new layoutActions.SetLogoGreen)

    this._route.params
      .takeUntil(this.stopper$)
      .subscribe(params => {
        this.spaceId = params.id
        this._store.dispatch(new spaceActions.Select([ this.spaceId ]))
      })

    this._route.fragment.subscribe(fragment => {
      this.fragment = fragment
      this.jumpToSection()
    })

    Observable.combineLatest(
      this.map.mapReady,
      this.spaces$,
    ).subscribe(([map, spaces]) => {
      if(map && spaces && spaces[this.spaceId]) {
        let latLng = new google.maps.LatLng(this.latitude, this.longitude)
        new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          map:       map as google.maps.Map,
          position:  latLng,
          icon:      'assets/icons/spacenow_icon_01.svg',
        })
      }
    })
  }

  ngOnDestroy() {
    this.stopper$.next(false)
    this.stopper$.complete()
  }

  mapPriceUnit() {
    if(!this.space)
      return ''

    switch(this.space.priceUnit) {
      case 'hourly':  return 'hour'
      case 'daily':   return 'day'
      case 'weekly':  return 'week'
      case 'monthly': return 'month'
      default:        return ''
    }
  }

  ngAfterViewInit() {
    this.jumpToSection()
  }

  jumpToSection() {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView()
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
