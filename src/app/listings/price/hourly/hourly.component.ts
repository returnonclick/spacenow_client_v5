import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Hourly } from '@shared/models/space'
import { AddPriceComponent } from '../add-price.component'

@Component({
  selector: 'sn-hourly-price',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss']
})
export class HourlyComponent implements AddPriceComponent {

  @Input() inPriceI: Hourly
  @Input() parentForm: FormGroup

  terms = [
    { value: 1, display: '1 hour'},
    { value: 2, display: '2 hours'},
    { value: 3, display: '3 hours'},
    { value: 4, display: '4 hours'}
  ]

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setInPrice(this.inPriceI)
  }

  setInPrice( inPrice: Hourly ) {

    if (typeof inPrice === 'undefined') {
      inPrice = new Hourly
      inPrice.incentives = false
      inPrice.minimumTerm = 1
    }
    
    const priceFG = this._fb.group({
      price:              inPrice.price,
      minimumTerm:        inPrice.minimumTerm,
      incentives:         inPrice.incentives,
      halfDay:            inPrice.halfDay,
      day:                inPrice.day
    })

    this.parentForm.setControl('price', priceFG);

  }

  get inPrice() {
    return this.parentForm.get('price') as FormGroup
  }

}
