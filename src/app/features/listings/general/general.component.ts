import { Component, Inject, ViewContainerRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Router } from '@angular/router'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ToastsManager } from 'ng2-toastr'

import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'
import * as categoryActions from '@core/store/categories/actions/category'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Listing } from '@shared/models/listing'
import { Category } from '@shared/models/category'

@Component({
  selector: 'sn-listing-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  listing: Listing
  listingForm: FormGroup
  categories$: Observable<Category[]>
  price: any
  priceValid: boolean = false

  isTCChecked: boolean = false // Terms and Conditions flag
  isHTChecked: boolean = false // Host Terms flag

  units = [
    { value: 'hourly', display: 'Price per hour' },
    { value: 'daily', display: 'Price per day' },
    { value: 'weekly', display: 'Price per week' },
    { value: 'monthly', display: 'Price per month' }
  ]

  amenities = [
    { id: '24/7 access', name: '24/7 access' },
    { id: 'AV Equipment', name: 'AV Equipment' },
    { id: 'Cafe', name: 'Cafe' },
    { id: 'Coffee/Tea', name: 'Coffee/Tea' },
    { id: 'Full Serviced', name: 'Full Serviced' },
    { id: 'Gym', name: 'Gym' },
    { id: 'Kitchen', name: 'Kitchen' },
    { id: 'Natural Lighting', name: 'Natural Lighting' },
  ]

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
    private listingEffects: ListingEffects,
    private toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {

    // Set root view for toastr notification
    this.toastr.setRootViewContainerRef(vcr)
    this.categories$ = this._store.select(fromRoot.getAllCategories)

  }

  // Get price form
  getPrice(price) {
    this.price = price
  }

  // Get price form validation
  getPriceValid(status) {
    this.priceValid = status
  }

  ngOnInit() {


    console.log()
    // this.listing = this.data.item || new Listing() -> Enable line when ready to edit
    this.listing = new Listing() // remove
    console.log(this.listing)
    this.listing.priceUnit = 'daily' // set when not listing.id

    // create a new listing
    this._store.dispatch(new listingActions.Create( this.listing ))

    // Get the categories
    this._store.dispatch(new categoryActions.Query)

    this.listingForm = this._fb.group({
      title:              [this.listing.title, Validators.required],
      description:        [this.listing.description, Validators.required],
      rules:              [this.listing.rules],
      unit:               [this.listing.priceUnit, Validators.required],

      categoryId:               [this.listing.categoryId, Validators.required],
      // amenityIds:               [this.listing.amenityIds, Validators.required],
      // capacity:               [this.listing.capacity, Validators.required],
      // size:               [this.listing.size, Validators.required],
      // tcAcceptance: [Validators.required],

      address: this._fb.group({
        unit_number:                  [this.listing.address.unit_number],
        street_number:                [this.listing.address.street_number, Validators.required],
        route:                        [this.listing.address.route, Validators.required],
        locality:                     [this.listing.address.locality, Validators.required],
        administrative_area_level_1:  [this.listing.address.administrative_area_level_1, Validators.required],
        country:                      [this.listing.address.country, Validators.required],
        postal_code:                  [this.listing.address.postal_code, Validators.required],
      }),

      amenities: this._fb.array([])

    })

    // Add controls to amenities FormArray
    const formArray = this.listingForm.get('amenities') as FormArray;
    this.amenities.forEach(x => formArray.push(new FormControl(false)));


  }

  getAddressChange(event) {
    const address = this.listingForm.get('address');
    address.setValue(event)
  }

  onTCChange(event) {
    this.isTCChecked = event.checked
    console.log(this.isTCChecked)
  }

  onHTChange(event) {
    this.isHTChecked = event.checked
  }



  onSubmit() {

    this.toastr.info("submiting now...")


    // TODO(TT): create private function to convert checkbox groups
    // into array of selected items.
    let tmpAmenityIDs = []
    let i = 0
    const result = Object.assign({},
      this.listingForm.value, {
        amenityIds: this.amenities
        .filter((x, i) => !!this.listingForm.value.amenities[i]).map(a =>{
          return a.id
        })
      })

    delete result.amenities

    // console.log(result);

    this.listingForm.updateValueAndValidity()
    // this.listing = this.listingForm.value
    if (this.price)
      result.price = this.price
      if(result.id) {
        this._store.dispatch(new listingActions.Update( result.id, result ))

        // Listen for `success` action generated from update effect.
        this.listingEffects.update$
          .filter(action => action.type === listingActions.SUCCESS)
          .subscribe(res =>{
            this.toastr.success("listing updated successfully.")
          })

      } else {
        this._store.dispatch(new listingActions.Create( result ))

        // Listen for `success` action generated from create effect.
        this.listingEffects.create$
          .filter(action => action.type === listingActions.SUCCESS)
          .subscribe(res =>{
            this.toastr.success("listing created successfully.")
            setTimeout(() =>{
              this.router.navigate(['/home'])
            }, 3000)
          })

        // Listen for `fail` action generated from create effect.
        this.listingEffects.create$
          .filter(action => action.type === listingActions.FAIL)
          .subscribe(res =>{
            this.toastr.error("Oops. Something goes wrong at our side. Please try again.")
          })
      }

  }

}
