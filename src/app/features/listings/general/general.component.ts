import { Component, Inject, ViewContainerRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Router } from '@angular/router'

import {MatDatepickerInputEvent} from '@angular/material/datepicker' 
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ToastsManager } from 'ng2-toastr'

import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'
import * as categoryActions from '@core/store/categories/actions/category'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Category } from '@shared/models/category'

import { Listing } from '@models/listing'
// import { Space as Listing } from '@models/space.model'
import { Booking } from '@models/booking'

@Component({
  selector: 'sn-listing-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  listing: Listing
  listingID: string
  listingForm: FormGroup
  categories$: Observable<Category[]>
  price: any
  priceValid: boolean = false
  // priceValid: Observable<boolean>

  isTCChecked: boolean = false // Terms and Conditions flag
  isHTChecked: boolean = false // Host Terms flag

  exceptionDays: Date[] = new Array()

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

  bookingTypes = [
    "Instant booking",
    "Request booking",
    "Manunal enquiries"
  ]

  openingHours = [
    {key: 0.0, value: "00:00 AM"},
    {key: 0.5, value: "00:30 AM"},
    {key: 1.0, value: "01:00 AM"},
    {key: 1.5, value: "01:30 AM"},
    {key: 2.0, value: "02:00 AM"},
    {key: 2.5, value: "02:30 AM"},
    {key: 3.0, value: "03:00 AM"},
    {key: 3.5, value: "03:30 AM"},
    {key: 4.0, value: "04:00 AM"},
    {key: 4.5, value: "04:30 AM"},
    {key: 5.0, value: "05:00 AM"},
    {key: 5.5, value: "05:30 AM"},
    {key: 6.0, value: "06:00 AM"},
    {key: 6.5, value: "06:30 AM"},
    {key: 7.0, value: "07:00 AM"},
    {key: 7.5, value: "07:30 AM"},
    {key: 8.0, value: "08:00 AM"},
    {key: 8.5, value: "08:30 AM"},
    {key: 9.0, value: "09:00 AM"},
    {key: 9.5, value: "09:30 AM"},
    {key: 10.0, value: "10:00 AM"},
    {key: 10.5, value: "10:30 AM"},
    {key: 11.0, value: "11:00 AM"},
    {key: 11.5, value: "11:30 AM"},

    {key: 12.0, value: "00:00 PM"},
    {key: 12.5, value: "00:30 PM"},
    {key: 13.0, value: "01:00 PM"},
    {key: 13.5, value: "01:30 PM"},
    {key: 14.0, value: "02:00 PM"},
    {key: 14.5, value: "02:30 PM"},
    {key: 15.0, value: "03:00 PM"},
    {key: 15.5, value: "03:30 PM"},
    {key: 16.0, value: "04:00 PM"},
    {key: 16.5, value: "04:30 PM"},
    {key: 17.0, value: "05:00 PM"},
    {key: 17.5, value: "05:30 PM"},
    {key: 18.0, value: "06:00 PM"},
    {key: 18.5, value: "06:30 PM"},
    {key: 19.0, value: "07:00 PM"},
    {key: 19.5, value: "07:30 PM"},
    {key: 20.0, value: "08:00 PM"},
    {key: 20.5, value: "08:30 PM"},
    {key: 21.0, value: "09:00 PM"},
    {key: 21.5, value: "09:30 PM"},
    {key: 22.0, value: "10:00 PM"},
    {key: 22.5, value: "10:30 PM"},
    {key: 23.0, value: "11:00 PM"},
    {key: 23.5, value: "11:30 PM"},
  ]

  closingHours: Observable<any[]>

  weekdays = [
    {key: 1, value: "Monday"},
    {key: 2, value: "Tuesday"},
    {key: 3, value: "Wednesday"},
    {key: 4, value: "Thursday"},
    {key: 5, value: "Friday"},
    {key: 6, value: "Saturday"},
    {key: 0, value: "Sunday"}
  ]

  closingWeekDays: number[] = [1, 2, 3, 4, 5, 6, 0]
  exceptionDates: Observable<number[]>

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

    this._store.select(fromRoot.selectCurrentListingId).subscribe(id =>{
      if(id) {
        this.listingID = id
      }
    })

    this._store.select(fromRoot.selectCurrentListing).subscribe(listing =>{
      if(listing) {
        console.log(listing)
      }
    })
    
  }

  // Get price form
  getPrice(price) {
    console.log(price)
    this.price = price 
    this.price.unit = this.listingForm.controls['unit'].value
  }

  // Get price form validation
  getPriceValid(status) {
    console.log(status)
    this.priceValid = status
  }
  
  ngOnInit() {
    this.listing = new Listing()
    this.listing.unit = 'daily' // set when not listing.id
    // create a new listing
    this._store.dispatch(new listingActions.Create( new Listing() ))

    this._store.dispatch(new categoryActions.Query)

    this.listingForm = this._fb.group({
      title:              [this.listing.title, Validators.required],
      description:        [this.listing.description, Validators.required],
      rules:              [this.listing.rules],
      unit:               [this.listing.unit, Validators.required],

      categoryId:               [this.listing.categoryId, Validators.required],
      // amenityIds:               [this.listing.amenityIds, Validators.required],
      // capacity:               [this.listing.capacity, Validators.required],
      // size:               [this.listing.size, Validators.required],

      address: this._fb.group({
        unit_number:                  [this.listing.address.unit],
        street_number:                [this.listing.address.streetNumber, Validators.required],
        route:                        [this.listing.address.street, Validators.required],
        locality:                     [this.listing.address.city, Validators.required],
        administrative_area_level_1:  [this.listing.address.state, Validators.required],
        country:                      [this.listing.address.countryName, Validators.required],
        postal_code:                  [this.listing.address.postalCode, Validators.required],
        lat:                  [this.listing.address.lat],
        lng:                  [this.listing.address.lng]
      }),

      amenities: this._fb.array([]),
      bookingType: [this.listing.booking.bookingType, Validators.required],
      leadTime: [this.listing.booking.leadTime, Validators.required],
      isOpen247: [this.listing.booking.isOpen247, Validators.required],
      openingTime: [this.listing.booking.openingTime, Validators.required],
      closingTime: [this.listing.booking.closingTime, Validators.required],

    })

    // Add controls to amenities FormArray
    const formArray = this.listingForm.get('amenities') as FormArray
    this.amenities.forEach(x => formArray.push(new FormControl(false)))

  }

  getAddressChange(event) {
    // console.log(event)
    const address = this.listingForm.get('address')
    address.setValue(event)
  }

  /* 
   * Update T&C acceptance flags
   * ******************************************** */
  onTCChange(event) {
    this.isTCChecked = event.checked
  }

  onHTChange(event) {
    this.isHTChecked = event.checked
  }

  onOpen247Change(event) {
    // console.log(event.checked)
    this.listing.booking.isOpen247 = event.checked

    // Auto-reset other fields
    if(event.checked) {
      this.listingForm.controls['openingTime'].setValue(0.0)
      this.listingForm.controls['closingTime'].setValue(23.5)
      this.closingWeekDays = []
      this.exceptionDays = []
    }
 
  }

  onWeekDayChange(weekday: number, event) {
    console.log(event)
    // opening date
    if(event.checked) {
      // filter that out if exists
      this.closingWeekDays = this.closingWeekDays.filter(d =>{
        return d !== weekday
      })
    } else { // closing date
      // If not existing, append to the array
      if(this.closingWeekDays.indexOf(weekday) <= -1) {
       this.closingWeekDays.push(weekday) 
      }
    }
  }

  addExceptionDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.exceptionDays.push(event.value) 
  }

  deleteExceptionDay(date: Date) {
    console.log(date)
    this.exceptionDays = this.exceptionDays.filter(d =>{
      return d !== date
    })
  }

  filterClosingHours(event) {
    // console.log(event.value)
    this.closingHours = Observable.of(this.openingHours.filter(hour =>{
      return hour.key > event.value
    }))
  }

  /* 
   * Submit the form
   *
   * - First: collect all data from listingForm, other
   * seperate variables to `listing` object
   * - Dispatch action to get data updated to database
   * ******************************************** */
  onSubmit() {
    this.toastr.info("submiting now...")
    this.listingForm.updateValueAndValidity()
    this.listing = new Listing()
    // TODO(TT) delete this log
    console.log(this.listingForm.value)

    // TODO(TT): create private function to convert checkbox groups
    // into array of selected items. 
    let tmpAmenityIDs = []
    let i = 0
    tmpAmenityIDs = this.amenities.filter((x, i) => !!this.listingForm.value.amenities[i]).map(a =>{
      return a.id
    })

    this.listing.id = this.listingID
    this.listing.title = this.listingForm.controls['title'].value
    this.listing.unit = this.listingForm.controls['unit'].value
    if (this.price)
      this.listing.price = this.price
    this.listing.address = this.listingForm.controls['address'].value
    this.listing.amenityIds = tmpAmenityIDs
    //booking
    this.listing.booking.bookingType = this.listingForm.controls['bookingType'].value
    this.listing.booking.leadTime = this.listingForm.controls['leadTime'].value
    this.listing.booking.openingTime = this.listingForm.controls['openingTime'].value
    this.listing.booking.closingTime = this.listingForm.controls['closingTime'].value
    this.listing.booking.isOpen247 = this.listingForm.controls['isOpen247'].value
    this.listing.booking.closingWeekDays = this.closingWeekDays
    this.listing.booking.exceptionDays = this.exceptionDays

    console.log(this.listing)

    // Listen for `success` action generated from update effect.  
    // Need to subscribing before dispatching new action
    this.listingEffects.update$
      .filter(action => action.type === listingActions.SUCCESS)
      .subscribe(res =>{
        this.toastr.success("listing updated successfully.")
    })

    this._store.dispatch(new listingActions.Update( this.listing.id, this.listing ))

  }


  // TODO(TT): delete listing from firestore and images from fire storage 
  // when user cancel listing 
  cancelListing(listingID: string) {
    // setup listen for outcome of cancel listing action here...
    
    // Dispatch action here...

    // Notification and/or redirect based on outcome here...
  }

}

