import { Component, ViewChild } from '@angular/core'
import { FormBuilder,  FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AgmMap, AgmMarker } from '@agm/core'
import { } from 'googlemaps'

import { ListingShortDetail } from '@shared/models/listing-short-detail'

import * as fromRoot from '@core/store'
import * as searchActions from '@core/store/search/actions/search'
import * as layoutActions from '@core/store/layouts/actions/layout'

@Component({
  selector: 'sn-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ]
})
export class SearchComponent {

  @ViewChild(AgmMap) map: AgmMap

  zoom:      number = 16
  name:      string = ''
  radius:    number = 20
  latitude:  number = -33.9108137
  longitude: number = 151.1960078

  results$:   Observable<ListingShortDetail[]>
  isLoading$: Observable<boolean>

  form:      FormGroup
  nativeMap: google.maps.Map = null
  markerMap: { [spaceId: string]: google.maps.Marker }

  constructor(
    private _fb:     FormBuilder,
    private _route:  ActivatedRoute,
    private _router: Router,
    private _store:  Store<fromRoot.State>,
  ) {
    this._store.dispatch(new layoutActions.SetLogoGreen())
    this.results$   = this._store.select(fromRoot.getAllSearches)
    this.isLoading$ = this._store.select(fromRoot.isLoadingSearch)
  }

  ngOnInit() {
    Observable.combineLatest(
      this._route.queryParams,
      this.map.mapReady,
    ).subscribe(([queryParams, map]) => {
      if(queryParams && map) {
        //this.deleteMarkers(map)
        this.name      = queryParams.name ? decodeURIComponent(queryParams.name): this.name
        this.radius    = +queryParams.radius || this.radius
        this.latitude  = +queryParams.latitude || this.latitude
        this.longitude = +queryParams.longitude || this.longitude
        this._store.dispatch(new searchActions.Query(queryParams))

        if(!this.nativeMap)
          this.nativeMap = <google.maps.Map> map

        this._updateForm()
      }
    })

    Observable.combineLatest(
      this.results$,
      this.map.mapReady,
    ).subscribe(([searchResults, map]) => {
      if(searchResults && map) {
        this.markerMap = {}
        for(let result of searchResults) {
          let markerLatLng = new google.maps.LatLng(result.geopoint.latitude, result.geopoint.longitude);
          let thisLoc      = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            map:       this.nativeMap,
            position:  markerLatLng,
            icon:      'assets/icons/spacenow_icon_01.svg',
          })
          this.markerMap[result.id] = thisLoc
        }
      }
    })

    this._updateForm()
  }

  selectedAddress(address) {
    this.form.get('latitude').setValue(address.latitude)
    this.form.get('longitude').setValue(address.longitude)
    this.form.get('name').setValue(address.full_name)
  }

  onSubmit() {
    this.form.updateValueAndValidity()
    if(this.form.invalid)
      return

    let formVal = this.form.value

    this._router.navigate(['search'], {
      queryParams: {
        name:      encodeURIComponent(formVal.name),
        radius:    formVal.radius,
        latitude:  formVal.latitude,
        longitude: formVal.longitude,
      }
    })
  }

  private _updateForm() {
    this.form = this._fb.group({
      name:      [ this.name, Validators.required ],
      radius:    [ this.radius, Validators.required ],
      latitude:  [ this.latitude ],
      longitude: [ this.longitude ],
    })
  }

  toggleHover(space, enterFlag) {
    let marker: google.maps.Marker = this.markerMap[space.id]
    if(enterFlag)
      marker.setIcon('assets/icons/spacenow_icon_02.svg')
    else
      marker.setIcon('assets/icons/spacenow_icon_01.svg')
  }

}
