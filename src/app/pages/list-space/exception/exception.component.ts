import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from "@angular/router"
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker' 
import * as moment from 'moment'

import * as fromRoot from '@core/store'
import * as listingActions from '@core/store/listings/actions/listing'
import { ListingEffects } from '@core/store/listings/effects/listing'

import { Space } from '@shared/models/space'


@Component({
  selector: 'sn-listing-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss']
})

export class ExceptionComponent {

  listing$: Observable<Space>
  listing: Space

  exceptionDays: any = []
  exceptionForm: FormGroup

  constructor(private _store: Store<fromRoot.State>,
              private _fb: FormBuilder,
              private listingEffects: ListingEffects,
              private router: Router,
              private cdRef: ChangeDetectorRef
  ) {

     this.exceptionForm = this._fb.group({
      availability: this._fb.group({
        bookingType: [''],
        leadTime: [''],
        isOpen247: [''],
        openingTime: [''],
        exceptionDays: [''],
        note: [''],
        fromDate: [''],
        toDate: ['']
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

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
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
        fromDate: '',
        toDate: ''
      }),
    })

     // Set existing exceptions
    this.exceptionDays = []
    if(this.listing.availability.exceptionDays.length > 0) {
      this.listing.availability.exceptionDays.forEach(res => {
        this.exceptionDays.push(res)
      })
    }
    
  }

  addExceptionDate() {
    
    if (!this.exceptionForm.value.availability.toDate) 
      this.exceptionForm.value.availability.toDate = this.exceptionForm.value.availability.fromDate

    this.exceptionDays.push({ 
      fromDate: this.exceptionForm.value.availability.fromDate,
      toDate: this.exceptionForm.value.availability.toDate,
      note: this.exceptionForm.controls.availability.value.note
    }) 

    // Reset aux formControls
    const note = this.exceptionForm.controls.availability.get("note") as FormControl
    note.setValue('')
    const fromDate = this.exceptionForm.controls.availability.get("fromDate") as FormControl
    fromDate.setValue(null)
    const toDate = this.exceptionForm.controls.availability.get("toDate") as FormControl
    toDate.setValue(null)

  }

  deleteExceptionDay(date) {
    this.exceptionDays = this.exceptionDays
    .filter(d =>{
      return d.fromDate !== date.fromDate && d.toDate !== date.toDate 
    })
  }

  onSubmit() {

    delete this.exceptionForm.controls.availability.value.note
    delete this.exceptionForm.controls.availability.value.fromDate
    delete this.exceptionForm.controls.availability.value.toDate

    if (this.exceptionDays.length > 0)
      this.exceptionForm.value.availability.exceptionDays = this.exceptionDays
    else
      this.exceptionForm.value.availability.exceptionDays = []

    if(this.listing.id) {
      this._store.dispatch(new listingActions.Update( this.listing.id, this.exceptionForm.value ))
    }

    this.router.navigate(['list-space', this.listing.id, 'description'])
  }

  // TODO: Change this function for 'routerLink' in 'back-button' of price.component.html
  back() {
    this.router.navigate(['list-space', this.listing.id, 'booking'])
  }
 
}
 