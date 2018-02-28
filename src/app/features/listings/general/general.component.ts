import { Component, Inject, ViewContainerRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Router, ActivatedRoute } from "@angular/router"

import {MatDatepickerInputEvent} from '@angular/material/datepicker' 
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ToastsManager } from 'ng2-toastr'

import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import * as categoryActions from '@core/store/categories/actions/category'
import * as amenityActions from '@core/store/amenities/actions/amenity'
import * as listingSpecificationActions from '@core/store/listing-specifications/actions/listing-specification'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Listing } from '@shared/models/listing'
import { Category } from '@shared/models/category'
import { Amenity } from '@shared/models/amenity'
import { ListingSpecification } from '@shared/models/listing-specification'
import { Booking } from '@models/booking'


@Component({
  selector: 'sn-listing-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  listing$: Observable<Listing>
  listing: Listing
  categories$: Observable<Category[]>
  categories: Category[]
  amenities$: Observable<Amenity[]>
  amenities: Amenity[]
  specifications$: Observable<ListingSpecification[]>
  specifications: ListingSpecification[]

  categoryAmenities: Amenity[]
  categorySpecs: ListingSpecification[]
  editCategory: string = ''
  listingId: string // To edit existing
  price: any
  priceValid: boolean = false
  isTCChecked: boolean = false // Terms and Conditions flag
  isHTChecked: boolean = false // Host Terms flag
  section: number = 1
  amenitiesValid: boolean = false

  // listingID: string // To edit new (?)
  exceptionDays: Date[] = new Array()

  priceUnits = [
    { value: 'hourly', display: 'Price per hour' },
    { value: 'daily', display: 'Price per day' },
    { value: 'weekly', display: 'Price per week' },
    { value: 'monthly', display: 'Price per month' }
  ]

  listingForm: FormGroup = this._fb.group({
    title:              [''],
    description:        [''],
    rules:              [''],
    priceUnit:          [''],
    categoryId:         [''],
    address: this._fb.group({ 
      unit_number:                  [''],
      street_number:                [''],
      route:                        [''],
      locality:                     [''],
      administrative_area_level_1:  [''],
      country:                      [''],
      postal_code:                  [''],
      lat:                  [''],
      lng:                  ['']
    }),
    amenities: this._fb.array([]),
    specifications: this._fb.group({}),
    booking: this._fb.group({
      bookingType: [''],
      leadTime: [''],
      isOpen247: [''],
      openingTime: [''],
      closingTime: [''],
    })
  })

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
    // Get the list of categories
    this._store.dispatch(new categoryActions.Query)
    // Get the list of amenities
    this._store.dispatch(new amenityActions.Query)
    // Get the list of specifications
    this._store.dispatch(new listingSpecificationActions.Query)

    this.categories$ = this._store.select( fromRoot.getAllCategories )
    this.categories$.subscribe( res => this.categories = res )
    this.amenities$ = this._store.select( fromRoot.getAllAmenities )
    this.amenities$.subscribe( res => this.amenities = res )
    this.specifications$ = this._store.select( fromRoot.getAllListingSpecifications )
    this.specifications$.subscribe( res => this.specifications = res )
    this.listing$ = this._store.select( fromRoot.selectCurrentListing )
    
    this.route.params.subscribe(params => {
      this.listingId = params['id']
      this._store.dispatch(new listingActions.QueryOne(this.listingId))
    })

  }

  ngOnInit() {
    if (this.listingId) {
      // Update listing 
      this.listing$.subscribe(res => {
        if(res) {
          this.listing = res
          this.editCategory = this.listing.categoryId
          this.priceValid = true         // Update means price valid from previous save
          this.amenitiesValid = true     // Update means amenities valid from previous save (can run validateAmenity())
          this.loadListingForm()         // Load the form when the listing is ready
          this.loadCategory()            // Load the amenities and specs acording to category
          this.filterClosingHours({value: this.listing.booking.openingTime})    // Initialize closingTime with opening incoming value
        }
      })
    } else {
      // Create new listing
      this.listing = new Listing
      // Create random listing id
      var m = 21, s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
      this.listing.id = s                   // Random listing id
      this.listing.priceUnit = 'daily'
      this.listing.booking.isOpen247 = false
      this.listing.booking.openingTime = 8   // Initialize openingTime in 8:00AM
      this.filterClosingHours({value: 8})    // Initialize closingTime with opening 8:00AM
      this.listing.booking.closingTime = 17  // Initialize closing hours in 8:00AM
      this._store.dispatch(new listingActions.Create( this.listing ))
      this.loadListingForm()
    }
  }

  loadListingForm() {
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
      booking: this._fb.group({
        bookingType: [this.listing.booking.bookingType, Validators.required],
        leadTime: [this.listing.booking.leadTime, Validators.required],
        isOpen247: [this.listing.booking.isOpen247, Validators.required],
        openingTime: [this.listing.booking.openingTime, Validators.required],
        closingTime: [this.listing.booking.closingTime, Validators.required]
      })
    })
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
      const formBooking = this.listingForm.get('booking') as FormGroup
      const open = formBooking.get("openingTime") as FormControl
      const close = formBooking.get("closingTime") as FormControl
      open.setValue(0.0)
      close.setValue(23.5)
      this.closingWeekDays = []
      this.exceptionDays = []
    }
  }

  onWeekDayChange(weekday: number, event) {
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
    this.categoryAmenities.forEach(x => {
      let value: boolean = false

      // Load listing amenities when listing update
      if (this.listingId && (this.listingForm.value.categoryId === this.editCategory))
        this.listing.amenityIds.find(y => { return y === x.id ? value = true : value = false })
      formAmenities.push(new FormControl(value))
    });

    // Load categories specifications 
    this.listingForm.removeControl('specifications')
    this.listingForm.addControl('specifications', this._fb.group({}))
    let formGroupSpec = this.listingForm.get('specifications') as FormGroup;
    this.categorySpecs.map(spec => formGroupSpec.addControl(spec.slug, new FormControl(this.listing.specifications ? this.listing.specifications[spec.slug] : null)))
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
    result.booking.closingWeekDays = this.closingWeekDays
    result.booking.exceptionDays = this.exceptionDays

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
