import { Component, Inject, Input, ViewContainerRef, OnInit, OnChanges, AfterContentInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Router, ActivatedRoute } from "@angular/router"

import {MatDatepickerInputEvent} from '@angular/material/datepicker' 
import { Store } from '@ngrx/store'
import { Observable, BehaviorSubject } from 'rxjs'
import { ToastsManager } from 'ng2-toastr'

import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Space } from '@shared/models/space'
import { Category } from '@shared/models/category'
import { Amenity } from '@shared/models/amenity'
import { ListingSpecification } from '@shared/models/listing-specification'
import { Availability } from '@models/availability'


@Component({
  selector: 'sn-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  @Input() listing: Space
  @Input() categories: Category[]
  @Input() amenities: Amenity[]
  @Input() specifications: ListingSpecification[]

  listingForm: FormGroup

  categoryAmenities: Amenity[]
  categorySpecs: ListingSpecification[]
  editCategory: string = ''
  price: any
  priceValid: boolean = false
  isTCChecked: boolean = false         // Terms and Conditions flag
  isHTChecked: boolean = false         // Host Terms flag
  amenitiesValid: boolean = false
  exceptionDays: Date[] = new Array()
  isLoadingAmenity$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  priceUnits = [
    { value: 'hourly', display: 'Price per hour' },
    { value: 'daily', display: 'Price per day' },
    { value: 'weekly', display: 'Price per week' },
    { value: 'monthly', display: 'Price per month' }
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

  // closingWeekDays: number[] = [1, 2, 3, 4, 5, 6, 0]
  exceptionDates: Observable<number[]>

  constructor(
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
    private listingEffects: ListingEffects,
    private toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {

    // Set root view for toastr notification
    this.toastr.setRootViewContainerRef(vcr)

  }

  ngOnInit() {

    this.editCategory = this.listing.categoryId ? this.listing.categoryId : null              // Backup of category id
    this.listing.price ? this.priceValid = true : this.priceValid                             // Initialize price validation
    this.listing.amenityIds ? this.amenitiesValid = true : this.amenitiesValid                // Initialize amenities validation

    this.filterClosingHours({value: this.listing.availability.openingTime})

    this.listingForm = this._fb.group({
      title:              [this.listing.title, Validators.required],
      description:        [this.listing.description, Validators.required],
      rules:              [this.listing.rules],
      priceUnit:          [this.listing.priceUnit, Validators.required],

      categoryId:         [this.listing.categoryId, Validators.required],
      
      address: this._fb.group({
        unit_number:                  [this.listing.address.unit_number],
        street_number:                [this.listing.address.street_number, Validators.required],
        route:                        [this.listing.address.route, Validators.required],
        locality:                     [this.listing.address.locality, Validators.required],
        administrative_area_level_1:  [this.listing.address.administrative_area_level_1, Validators.required],
        country:                      [this.listing.address.country, Validators.required],
        postal_code:                  [this.listing.address.postal_code, Validators.required],
        lat:                          [this.listing.address.lat],
        lng:                          [this.listing.address.lng]
      }),

      amenities: this._fb.array([]),
      specifications: this._fb.group({}),
      availability: this._fb.group({
        bookingType: [this.listing.availability.bookingType, Validators.required],
        leadTime: [this.listing.availability.leadTime, Validators.required],
        isOpen247: [this.listing.availability.isOpen247, Validators.required],
        openingTime: [this.listing.availability.openingTime, Validators.required],
        closingTime: [this.listing.availability.closingTime, Validators.required],
        openingDays: this._fb.group({
          monday: [true],
          tuesday: [true],
          wednesday: [true],
          thursday: [true],
          friday: [true],
          saturday: [true],
          sunday: [true],
        })
      }),
    })
    this.loadCategory()

  }

  ////////////// PRICE //////////////
  // Get price form
  getPrice(price) {
    this.price = price 
  }

  // Get price form validation
  getPriceValid(valid) {
    this.priceValid = valid
  }

  ///////////// ADDRESS //////////////
  getAddressChange(event) {
    const address = this.listingForm.get('address');
    address.setValue(event)
  }

  /////// TERMS & CONDITIONS /////////
  onTCChange(event) {
    this.isTCChecked = event.checked
  }

  onHTChange(event) {
    this.isHTChecked = event.checked
  }

  /////////BOOKINGS & EXCEPTIONS ////////////
  onOpen247Change(event) {
    // Auto-reset other fields
    if(event.checked) {
      this.exceptionDays = []

      // Set opening and closing times 24 hours
      const formBooking = this.listingForm.get('availability') as FormGroup
      const open = formBooking.get("openingTime") as FormControl
      const close = formBooking.get("closingTime") as FormControl
      open.setValue(0.0)
      close.setValue(23.5)

      // Set availability 7 days
      const formAvailability = formBooking.get('openingDays') as FormGroup
      const mon = formAvailability.get("monday") as FormControl
      const tue = formAvailability.get("tuesday") as FormControl
      const wed = formAvailability.get("wednesday") as FormControl
      const thu = formAvailability.get("thursday") as FormControl
      const fri = formAvailability.get("friday") as FormControl
      const sat = formAvailability.get("saturday") as FormControl
      const sun = formAvailability.get("sunday") as FormControl
      mon.setValue(true)
      tue.setValue(true)
      wed.setValue(true)
      thu.setValue(true)
      fri.setValue(true)
      sat.setValue(true)
      sun.setValue(true)

    }
  }

  addExceptionDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.exceptionDays.push(event.value) 
  }

  deleteExceptionDay(date: Date) {
    this.exceptionDays = this.exceptionDays.filter(d =>{
      return d !== date
    })
  }

  filterClosingHours(event) {
    this.closingHours = Observable.of(this.openingHours.filter(hour =>{
      return hour.key > event.value
    }))
  }
  
  //////////// CATEGORY SPECS & AMENS ////////////
  loadCategory() { 
    this.isLoadingAmenity$.next(true)
    // Load amenities and specifications according to category
    var category = this.categories.find(x => x.id === this.listingForm.value.categoryId)
    this.categoryAmenities = this.amenities.filter(amenity => {
      return category.amenities.indexOf(amenity.id) !== -1
    })
    this.categorySpecs = this.specifications.filter(specification => {
      return category.specifications.indexOf(specification.id) !== -1
    })

    // Add dynamic controls for amenities and specifications
    this.listingForm.removeControl('amenities')
    this.listingForm.addControl('amenities', this._fb.array([]))
    const formAmenities = this.listingForm.get('amenities') as FormArray;
    this.categoryAmenities.forEach((amenity) => {

      // Load listing amenities when listing update
      if (this.listingForm.value.categoryId === this.editCategory)
        formAmenities.push(new FormControl(this.listing.amenityIds.indexOf(amenity.id) !== -1))
      else 
        formAmenities.push(new FormControl(false))

    });

    // Load categories specifications 
    this.listingForm.removeControl('specifications')
    this.listingForm.addControl('specifications', this._fb.group({}))
    let formGroupSpec = this.listingForm.get('specifications') as FormGroup;
    this.categorySpecs.map(spec => formGroupSpec.addControl(spec.slug, new FormControl(this.listing.specifications ? this.listing.specifications[spec.slug] : null)))
    setTimeout(() => { // hacks
      this.isLoadingAmenity$.next(false)
    }, 0)
  }

  //////// AMENITIES VALIDATION ///////
  validateAmenity() {
    this.amenitiesValid = this.listingForm.controls.amenities.value.find(item => item === true)
  }
  
  onSubmit() {
    this.toastr.info("submiting now...")
    // Store the array of amenityIds
    let result = Object.assign({}, 
      this.listingForm.value, { 
        amenityIds: this.categoryAmenities
        .filter((x, i) => !!this.listingForm.value.amenities[i]).map(a =>{
          return a.id
        })
      })

    delete result.amenities
    this.listingForm.updateValueAndValidity()

    if (this.price)
      result.price = this.price
    // result.availability.closingWeekDays = this.closingWeekDays
    result.availability.exceptionDays = this.exceptionDays

    // Save listing in the DB
    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, result ))

      // Listen for `success` action generated from update effect.  
      this.listingEffects.update$
        .filter(action => action.type === listingActions.SUCCESS)
        .subscribe(res =>{
          this.toastr.success("listing updated successfully.")
        })
    }

  }

}
