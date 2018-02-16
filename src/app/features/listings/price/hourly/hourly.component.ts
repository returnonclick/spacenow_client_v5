import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Hourly } from '@shared/models/space'

@Component({
  selector: 'sn-hourly-price',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss']
})
export class HourlyComponent {

  @Output() price = new EventEmitter<Hourly>();
  @Output() priceValid = new EventEmitter<boolean>();

  hourly: Hourly = new Hourly
  priceForm: FormGroup

  terms = [
    { value: '1', display: '1 hour'},
    { value: '2', display: '2 hours'},
    { value: '3', display: '3 hours'},
    { value: '4', display: '4 hours'}
  ]

  constructor(
    private _fb: FormBuilder
  ) {}

  sendPrice() {
    console.log(this.priceForm)
    this.priceForm.updateValueAndValidity()
    this.hourly = this.priceForm.value
    // Send price values
    this.price.emit(
       this.hourly
    )
    // Send form status for validation
    this.priceValid.emit(
      this.priceForm.valid
    )
  }

  ngOnInit() {
    // Initialize
    this.hourly.incentives = false

    this.priceForm = this._fb.group({
      price:              [this.hourly.price],
      minimumTerm:        [this.hourly.minimumTerm],
      incentives:         [this.hourly.incentives],
      halfDay:            [this.hourly.halfDay],
      day:                [this.hourly.day]
    })

  }

}
