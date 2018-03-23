import { Component, Inject, Input, Output, OnInit, EventEmitter, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Daily } from '@shared/models/space'
import { AddPriceComponent } from '../add-price.component'

@Component({
  selector: 'sn-daily-price',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements AddPriceComponent {

  @Input() inPriceI: Daily
  @Input() parentForm: FormGroup

  terms = [
    { value: 1, display: '1 day'},
    { value: 2, display: '2 days'},
    { value: 3, display: '3 days'},
    { value: 4, display: '4 days'},
    { value: 5, display: '5 days'},
    { value: 10, display: '10 days'}
  ]

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setInPrice(this.inPriceI)
  }

  setInPrice( inPrice: Daily ) {

    if (typeof inPrice === 'undefined') {
      inPrice = new Daily
      inPrice.incentives = false
      inPrice.minimumTerm = 1
    }

    const priceFG = this._fb.group({
      price:              inPrice.price,
      minimumTerm:        inPrice.minimumTerm,
      incentives:         inPrice.incentives,
      week:               inPrice.week
    })

    this.parentForm.setControl('price', priceFG);

  }

  get inPrice() {
    return this.parentForm.get('price') as FormGroup
  }

}
