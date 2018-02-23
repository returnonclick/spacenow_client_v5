import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Weekly } from '@shared/models/space'

@Component({
  selector: 'sn-weekly-price',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent {

  @Output() price = new EventEmitter<Weekly>();
  @Output() priceValid = new EventEmitter<boolean>();
  @Input() inPrice: Weekly

  priceForm: FormGroup

  terms = [
    { value: '1', display: '1 week'},
    { value: '2', display: '2 weeks'},
    { value: '3', display: '3 weeks'},
    { value: '4', display: '4 weeks'}
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
      this.inPrice = new Weekly
      this.inPrice.incentives = false
    }

    this.priceForm = this._fb.group({
      price:              [this.inPrice.price],
      minimumTerm:        [this.inPrice.minimumTerm],
      incentives:         [this.inPrice.incentives],
      month:              [this.inPrice.month]
    })
    this.sendPrice()
  }

}
