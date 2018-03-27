import { Component, Inject, Injectable }              from '@angular/core'
import { FormBuilder,  
         FormGroup, 
         Validators }             from '@angular/forms'
import { ActivatedRoute, 
         Router }                 from '@angular/router'

import { Store, select }          from '@ngrx/store'
import { Observable }             from 'rxjs/Observable'

import { CardComponent, 
         FeaturedCardComponent }  from '@shared/components/custom/cards'
import { TestimonialComponent }   from "@shared/components/custom"
import { Category }               from '@shared/models/category'
import { ListingShortDetail }     from '@app/shared/models/listing-short-detail'

import * as fromRoot              from '@core/store'
import * as actions               from '@core/store/layouts/actions/layout'
import * as categoryActions       from '@core/store/categories/actions/category'
import * as listingShortDetailActions        from '@core/store/listings-short-detail/actions/listing-short-detail'
import { switchMap, map }         from 'rxjs/operators';
import { Subscription }           from 'rxjs';
import { filter } from 'rxjs/operator/filter';
import { MatDialog } from '@angular/material';
import { VideoPlayerComponent } from '@app/shared/components/custom/video-player/video-player.component';

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
  testimonials: Array<any>
  //Indonesia
  //United Arab Emirates

  sliderComponent: any = CardComponent
  sliderFeaturedComponent: any = FeaturedCardComponent
  sliderTestimonialComponent: any = TestimonialComponent
  gallerySize: number

  constructor(
    private _fb:     FormBuilder,
    private _store:  Store<fromRoot.State>,
    private _router: Router,
    private _route:  ActivatedRoute,
    public _dialog: MatDialog,
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
    this.testimonials = [{
      background: 'https://firebasestorage.googleapis.com/v0/b/spacenow-bca9c.appspot.com/o/images%2Fhome%2Ftestimonial-01.jpg?alt=media&token=3f12acd5-bca4-4a8d-92ee-c9fe467cbcff',
      testimonial: 'Spacenow has allowed me to share my restaurant in down time and make a profit',
      author: 'John Maks',
      position: 'CEO of Burger Joint'
    },
    {
      background: 'https://firebasestorage.googleapis.com/v0/b/spacenow-bca9c.appspot.com/o/images%2Fhome%2Ftestimonial-02.jpg?alt=media&token=086e4aa2-ba79-4570-902d-01d832673767',
      testimonial: 'Our showroom can be used as a big event space or even as a gallery. Spacenow allows people from all different industries to use their space for whatever their need.',
      author: 'Jason Leppa',
      position: 'Gasoline Motor Co.'
    }]
    console.log(window.screen.width)
    this.gallerySize = window.screen.width
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
  
  openVideo() {
    let dialogRef = this._dialog.open(VideoPlayerComponent, {
      data: 'https://www.youtube.com/embed/Nyw7ytSKbus?rel=0&controls=0&showinfo=0&autoplay=1', 
      panelClass: 'dialog-reset',
      width: '100vw',
      height: '80vh'
    })
  }
}

