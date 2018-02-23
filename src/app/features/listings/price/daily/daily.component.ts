import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Daily } from '@shared/models/space'

@Component({
  selector: 'sn-daily-price',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent {

  @Output() price = new EventEmitter<Daily>();
  @Output() priceValid = new EventEmitter<boolean>();
  @Input() inPrice: Daily

  priceForm: FormGroup

  terms = [
    { value: '1', display: '1 day'},
    { value: '2', display: '2 days'},
    { value: '3', display: '3 days'},
    { value: '4', display: '4 days'}
  ]

  constructor(
    private _fb: FormBuilder
  ) {}

  sendPrice() {
    this.priceForm.updateValueAndValidity()
    this.inPrice = this.priceForm.value
    // Send price values
    this.price.emit(
       this.inPrice
    )
    // Send form status for validation
    this.priceValid.emit(
      this.priceForm.valid
    )
  }

  sendPriceValid() {
    this.priceValid.emit(this.priceForm.valid)
  }

  ngOnInit() {
    // Initialize when new price
    if (typeof this.inPrice === 'undefined') {
      this.inPrice = new Daily
      this.inPrice.incentives = false
    }

    this.priceForm = this._fb.group({
      price:              [this.inPrice.price],
      minimumTerm:        [this.inPrice.minimumTerm],
      incentives:         [this.inPrice.incentives],
      week:               [this.inPrice.week]
    })
    this.sendPrice()
  }

}
