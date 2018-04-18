import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker' 

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import { Space } from '@shared/models/space'
import { OpeningTime } from '@models/availability'


@Component({
  selector: 'sn-listing-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent {

  listing$: Observable<Space>
  listing: Space

  exceptionDays: Date[] = new Array()
  openingTime: OpeningTime
  isOpeningTimeValid: boolean
  bookingForm: FormGroup

  leadTimeOptions = [1, 2, 3, 4, 5, 8, 10, 12, 15]
  leadTimeType: any


  bookingTypes = [
    { display: "Instant booking", value: 'instantly' },
    { display: "Request booking", value: 'request' },
    { display: "Manual enquiry", value: 'enquiry' }
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

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router
  ) {

    this.bookingForm = this._fb.group({
      availability: this._fb.group({
        bookingType: ['', Validators.required],
        leadTime: ['', Validators.required],
        isOpen247: ['', Validators.required],
        exceptionDays: ['']
      })
    })

    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    this.listing$.subscribe(listing => {
      if (listing) {
        this.listing = listing
        this.createForm()
      }
    })

  }

  createForm() {
    this.bookingForm = this._fb.group({
      availability: this._fb.group({
        bookingType: this.listing.availability.bookingType,
        leadTime:    this.listing.availability.leadTime,
        isOpen247:   this.listing.availability.isOpen247,
        exceptionDays: []
      })
    })

    // Set fixed booking type as 'enquiry' when price is '0'
    if (this.listing.price.price === 0) {
      let type = this.bookingForm.controls.availability.get('bookingType') as FormControl
      type.setValue('enquiry')
    }

    switch (this.listing.priceUnit) {
      case "hourly":
        this.leadTimeType = 'Hour'
        break
      case "daily":
        this.leadTimeType = 'Day'
        break
      case "weekly":
        this.leadTimeType = 'Week'
        break
      case "monthly":
        this.leadTimeType = 'Month'
        break
    }
  }

  onOpen247Change(event) {
    // Auto-reset other fields
    if(event.checked) {
      this.openingTime = new OpeningTime()
    }
  }

  filterClosingHours(event) {
    this.closingHours = Observable.of(this.openingHours.filter(hour =>{
      return hour.key > event.value
    }))
  }

  updateOpeningTime(event) {
    this.openingTime = event.openingTime
    this.isOpeningTimeValid = event.valid
  }

  onSubmit() {

    this.bookingForm.updateValueAndValidity()

    // reset opening time when open 24/7
    if(this.bookingForm.value.availability.isOpen247) { this.openingTime = new OpeningTime() }

    this.bookingForm.value.availability.openingTime = this.openingTime
    
    this.bookingForm.value.availability.exceptionDays = this.listing.availability.exceptionDays
    console.log(this.bookingForm.value)
    // this.bookingForm.value.availability.exceptionDays = Object.assign(this.bookingForm.value.availability.exceptionDays, this.openingTime)

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.bookingForm.value ))
    }

    this.router.navigate(['listing', this.listing.id, 'exception'])
  }

  // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
  back() {
    this.router.navigate(['listing', this.listing.id, 'price'])
  }
    
}
 