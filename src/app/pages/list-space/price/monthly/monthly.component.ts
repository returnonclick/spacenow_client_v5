import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Monthly } from '@shared/models/space'
import { AddPriceComponent } from '../add-price.component'

@Component({
  selector: 'sn-monthly-price',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent implements AddPriceComponent {

  @Input() inPriceI: Monthly
  @Input() parentForm: FormGroup
  focus: boolean
  focusSem: boolean
  focusYear: boolean
  terms = [
    { value: 1, display: '1 month'},
    { value: 3, display: '3 months'},
    { value: 6, display: '6 months'},
    { value: 12, display: '12 months'}
  ]

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setInPrice(this.inPriceI)
  }

  setInPrice( inPrice: Monthly ) {

    if (typeof inPrice === 'undefined') {
      inPrice = new Monthly
      inPrice.incentives = false
      inPrice.minimumTerm = 1
    }
    
    const priceFG = this._fb.group({
      price:              inPrice.price,
      minimumTerm:        inPrice.minimumTerm,
      incentives:         inPrice.incentives,
      sixMonths:          inPrice.sixMonths,
      year:               inPrice.year
    })

    this.parentForm.setControl('price', priceFG);

  }

  get inPrice() {
    return this.parentForm.get('price') as FormGroup
  }

}
