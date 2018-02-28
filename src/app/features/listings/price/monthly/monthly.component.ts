import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Monthly } from '@shared/models/space'

@Component({
  selector: 'sn-monthly-price',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent {

  @Output() price = new EventEmitter<Monthly>();
  @Output() priceValid = new EventEmitter<boolean>();
  @Input() inPrice: Monthly

  priceForm: FormGroup

  terms = [
    { value: '1', display: '1 month'},
    { value: '2', display: '2 months'},
    { value: '3', display: '3 months'},
    { value: '4', display: '4 months'}
  ]

  constructor(
    private _fb: FormBuilder
  ) {}

  sendPrice() {
    // console.log(this.priceForm.value)
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

  ngOnInit() {
    // Initialize when new price
    if (typeof this.inPrice === 'undefined') {
      this.inPrice = new Monthly
      this.inPrice.incentives = false
      this.inPrice.minimumTerm = 1
    }

    this.priceForm = this._fb.group({
      price:              [this.inPrice.price],
      minimumTerm:        [this.inPrice.minimumTerm],
      incentives:         [this.inPrice.incentives],
      sixMonths:          [this.inPrice.sixMonths],
      year:               [this.inPrice.year]
    })
  }

}
