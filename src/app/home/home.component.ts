import { Component }              from '@angular/core'
import { FormBuilder,  
         FormGroup, 
         Validators }             from '@angular/forms'
import { ActivatedRoute, 
         Router }                 from '@angular/router'

import { Store, select }          from '@ngrx/store'
import { Observable }             from 'rxjs/Observable'

import { CardComponent, 
         FeaturedCardComponent }  from '@shared/components/custom/cards'
import { Category }               from '@shared/models/category'
import { ListingShortDetail }     from '@app/shared/models/listing-short-detail';

import * as fromRoot              from '@core/store'
import * as actions               from '@core/store/layouts/actions/layout'
import * as categoryActions       from '@core/store/categories/actions/category'
import * as listingShortDetailActions        from '@core/store/listings-short-detail/actions/listing-short-detail'
import { switchMap, map }         from 'rxjs/operators';
import { Subscription }           from 'rxjs';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'sn-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  
  form:   FormGroup
  name:   string = ''
  radius: number = 20
  latitude:    number = -33.9108137
  longitude:    number = 151.1960078

  categories$: Observable<Category[]>
  listingsShortDetailAustralia$: Observable<ListingShortDetail[]>
  listingsShortDetailUnitedArabEmirates$: Observable<ListingShortDetail[]>
  listingsShortDetailNewZealand$: Observable<ListingShortDetail[]>
  listingsShortDetailIndonesia$: Observable<ListingShortDetail[]>
  //Indonesia
  //United Arab Emirates

  sliderComponent: any = CardComponent
  sliderFeaturedComponent: any = FeaturedCardComponent

  constructor(
    private _fb:     FormBuilder,
    private _store:  Store<fromRoot.State>,
    private _router: Router,
    private _route:  ActivatedRoute
  ){
    this.categories$ = this._store.pipe(
      select(fromRoot.getAllCategories)
    )
    this.listingsShortDetailAustralia$ = this._store.select(fromRoot.getAllListingsShortDetail)
      .map(listings => listings
      .filter(listing => listing.countryName === 'Australia')
    )
    this.listingsShortDetailUnitedArabEmirates$ = this._store.select(fromRoot.getAllListingsShortDetail)
      .map(listings => listings
      .filter(listing => listing.countryName === 'United Arab Emirates')
    )
    this.listingsShortDetailNewZealand$ = this._store.select(fromRoot.getAllListingsShortDetail)
      .map(listings => listings
      .filter(listing => listing.countryName === 'New Zealand')
    )
    this.listingsShortDetailIndonesia$ = this._store.select(fromRoot.getAllListingsShortDetail)
      .map(listings => listings
      .filter(listing => listing.countryName === 'Indonesia')
    )
    
  }

  ngOnInit() {
    this._store.dispatch(new actions.SetLogoWhite())
    this._store.dispatch(new categoryActions.Query())
    this._store.dispatch(new listingShortDetailActions.Query())
    this.createForm()
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

    this._router.navigate(['/search'], {
      queryParams: {
        name:   encodeURIComponent(formVal.name),
        radius: formVal.radius,
        latitude:    formVal.latitude,
        longitude:    formVal.longitude
      }
    })
  }

  private createForm() {
    this.form = this._fb.group({
      name:   [ this.name, Validators.required ],
      radius: [ this.radius, Validators.required ],
      latitude:    [ this.latitude ],
      longitude:    [ this.longitude ],
    })
  }

  
  // data: Array<any> = [{
  //   isNew: true,
  //   icon: 'add',
  //   button: 'Coworking',
  //   description: 'First test with description'
  // }]
}

