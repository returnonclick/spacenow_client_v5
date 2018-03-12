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
import { ExceptionDay } from '@shared/models/availability'


@Component({
  selector: 'sn-listing-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss']
})

export class ExceptionComponent {

  listing$: Observable<Space>
  listing: Space

  exceptionDays: ExceptionDay[] = []
  exceptionForm: FormGroup

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router
  ) {

     this.exceptionForm = this._fb.group({
      availability: this._fb.group({
        bookingType: [''],
        leadTime: [''],
        isOpen247: [''],
        openingTime: [''],
        exceptionDays: [[]],
        note: [''],
        date: ['']
      }),
      
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
    
    this.exceptionForm = this._fb.group({
      availability: this._fb.group({
        bookingType: this.listing.availability.bookingType,
        leadTime: this.listing.availability.leadTime,
        isOpen247: this.listing.availability.isOpen247,
        openingTime: this.listing.availability.openingTime,
        exceptionDays: this.listing.availability.exceptionDays,
        note: '',
        date: ''
      }),
    })

    // Set existing exceptions
    if(this.listing.availability.exceptionDays.length > 0) {
      this.listing.availability.exceptionDays.forEach(res => {
        this.exceptionDays.push(res)
      })
    }
    
  }

  addExceptionDate() {

    this.exceptionDays.push({ 
      date: this.exceptionForm.controls.availability.value.date,
      note: this.exceptionForm.controls.availability.value.note
    }) 

    const note = this.exceptionForm.controls.availability.get("note") as FormControl
    note.setValue('')
    const date = this.exceptionForm.controls.availability.get("date") as FormControl
    date.setValue(null)

  }

  deleteExceptionDay(date) {
    this.exceptionDays = this.exceptionDays
    .filter(d =>{
      return d.date !== date.date
    })
  }

  onSubmit() {

    delete this.exceptionForm.controls.availability.value.note
    delete this.exceptionForm.controls.availability.value.date

    this.exceptionForm.controls.availability.value.exceptionDays = this.exceptionDays

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.exceptionForm.value ))
    }

    this.router.navigate(['listing', this.listing.id, 'terms'])
  }

  // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
  back() {
    this.router.navigate(['listing', this.listing.id, 'booking'])
  }
 
}
 