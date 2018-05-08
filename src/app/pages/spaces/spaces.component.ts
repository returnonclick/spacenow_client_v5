import { Component, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core'
import { FormBuilder,  FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AgmMap, AgmMarker } from '@agm/core'
import { } from 'googlemaps'

import { Space } from '@shared/models/space'
import { Category } from '@shared/models/category'

import * as fromRoot from '@core/store'
import * as categoryActions from '@core/store/categories/category.action'
import * as searchActions from '@core/store/search/actions/search'
import * as layoutActions from '@core/store/layouts/actions/layout'

import { SearchService } from '@core/store/search/services/search'

@Component({
  selector: 'sn-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: [ './spaces.component.scss' ]
})

export class SpacesComponent {

  @ViewChild(AgmMap) map: AgmMap

  zoom:       number                                    = 15
  name:       string                                    = ''
  latitude:   number                                    = null
  longitude:  number                                    = null

  results$:       Observable<Space[]> 
  isLoading$:     Observable<boolean>

  form:       FormGroup
  nativeMap:  google.maps.Map                           = null
  markerMap:  { [spaceId: string]: google.maps.Marker } = {}

  categories$:   Observable<Category[]>
  minPrice:      number                                   = null
  maxPrice:      number                                   = null
  categoryId:    string                                   = ''
  country:       string                                   = ''
  locality:      string                                   = ''
  street:        string                                   = ''

  constructor(
    private _fb:     FormBuilder,
    private _route:  ActivatedRoute,
    private _router: Router,
    public el:       ElementRef,
    // public results:  SearchService,    For pagination service (next, back buttons)
    private _store:  Store<fromRoot.State>
  ) {
    this.results$ = this._store.select(fromRoot.getAllSearches)
    this.isLoading$   = this._store.select(fromRoot.isLoadingSearch)
    this.categories$  = this._store.select(fromRoot.getAllCategories)
  }

  ngOnInit() {
    this._store.dispatch(new layoutActions.SetLogoGreen)
    this._store.dispatch(new categoryActions.Query())
    Observable.combineLatest(
      this._route.queryParams,
      this.map.mapReady,
    ).subscribe(([queryParams, map]) => {
      if(queryParams && map) {
        this.name       = queryParams.name ? decodeURIComponent(queryParams.name): this.name
        this.latitude   = +queryParams.latitude || this.latitude
        this.longitude  = +queryParams.longitude || this.longitude
        this.categoryId = queryParams.categoryId || this.categoryId
        this.maxPrice   = +queryParams.maxPrice || this.maxPrice
        this.minPrice   = +queryParams.minPrice || this.minPrice
        this.country    = queryParams.country || this.country
        this.locality   = queryParams.locality || this.locality
        this.street     = queryParams.street || this.street
        this._store.dispatch(new searchActions.Query(queryParams))

        // ** For using the next and back buttons **
        // this.results.query(queryParams)
        // this.results$ = this.results.data

        if(!this.nativeMap)
          this.nativeMap = <google.maps.Map> map

        this._updateForm()
        this._clearForm(this.form.value)
      }
    })
    Observable.combineLatest(
      this.results$,
      this.map.mapReady,
    ).subscribe(([searchResults, map]) => {
      this._clearMarkers()
      if(searchResults && map) {
        for(let result of searchResults) {
          let latLng = new google.maps.LatLng(result.address.latitude, result.address.longitude);
          let marker = new google.maps.Marker({
            map:      this.nativeMap,
            position: latLng,
            icon:     'assets/icons/linkedin_icon.svg',
          })
          this.markerMap[result.id] = marker
        }
      }
    })
    this._updateForm()  
  }


  selectedAddress(address) {
    this.form.get('name').setValue(address.full_name)
    this.country = address.country
    this.locality = address.locality
    this.latitude = address.latitude
    this.longitude = address.longitude
    this.street = address.route
    this.el.nativeElement.querySelector("#submit").click()
  }

  onSubmit() {
    let formVal: any = ''
    this.form.updateValueAndValidity()

    if(this.form.invalid)
      return

    formVal = this.form.value
    this._clearForm(formVal)

    // this.results.query( ** For using the next and back buttons **
    this._router.navigate(['/spaces'], {
      queryParams: {
        name:      encodeURIComponent(formVal.name),
        categoryId:  formVal.categoryId,
        minPrice: formVal.minPrice,
        maxPrice: formVal.maxPrice,
        latitude:  this.latitude,
        longitude: this.longitude,
        country:  this.country,
        locality:  this.locality,
        street:  this.street
    }})
  }

  // **For using the next and back buttons**

  // nextPage() {
  //   let formVal: any = ''
  //   formVal = this.form.value
  //   this.results.next(
  //     {
  //       name:      encodeURIComponent(formVal.name),
  //       categoryId:  formVal.categoryId,
  //       minPrice: formVal.minPrice,
  //       maxPrice: formVal.maxPrice,
  //       latitude:  this.latitude,
  //       longitude: this.longitude,
  //       country:  this.country,
  //       locality:  this.locality,
  //       street:  this.street
  //     })
  // }

  // backPage() {
  //   let formVal: any = ''
  //   formVal = this.form.value
  //   this.results.back(
  //     {
  //       name:      encodeURIComponent(formVal.name),
  //       categoryId:  formVal.categoryId,
  //       minPrice: formVal.minPrice,
  //       maxPrice: formVal.maxPrice,
  //       latitude:  this.latitude,
  //       longitude: this.longitude,
  //       country:  this.country,
  //       locality:  this.locality,
  //       street:  this.street
  //     })
  // }

  toggleHover(space, enterFlag) {
    let marker: google.maps.Marker = this.markerMap[space.id]
    if(enterFlag)
      marker.setIcon('assets/icons/linkedin_icon.svg')
    else
      marker.setIcon('assets/icons/linkedin_icon.svg')
  }

  private _clearMarkers() {
    let markerIds = Object.keys(this.markerMap)
    for(let markerId of markerIds) {
      let marker = this.markerMap[markerId]
      marker.setMap(null)
      delete this.markerMap[markerId]
    }
  }

  private _updateForm() {
    this.form = this._fb.group({
      name:       [ this.name ],
      minPrice:   [ this.minPrice ],
      maxPrice:   [ this.maxPrice ],
      categoryId: [ this.categoryId ]
    })
  }

  private _clearForm(formVal) {
    if (formVal.categoryId == '') this.categoryId = ''
    if (formVal.maxPrice == null) this.maxPrice = null
    if (formVal.minPrice == null) this.minPrice = null

    if (formVal.name == '') {
      this.getLocation()
      this.name = ''
      this.country = ''
      this.locality = ''
      this.street = ''
      this.zoom = 12
    } else this.zoom = 14

    if ((this.locality == '' && this.country != '') 
        || ((this.locality == this.country) 
        && this.country != '')) this.zoom = 5 
  }

  x = document.getElementById("search")

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
      })
    }
  }
}
