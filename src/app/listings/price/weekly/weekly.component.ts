import { Component, Inject, Input, Output, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import * as actions from '@core/store/listings/actions/listing'
import * as fromRoot from '@core/store'

import { ConfirmDeleteComponent, ConfirmSaveComponent } from '@shared/components'
import { Weekly } from '@shared/models/space'
import { AddPriceComponent } from '../add-price.component'

@Component({
  selector: 'sn-weekly-price',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements AddPriceComponent {

  @Input() inPriceI: Weekly
  @Input() parentForm: FormGroup

  terms = [
    { value: 1, display: '1 week'},
    { value: 2, display: '2 weeks'},
    { value: 3, display: '3 weeks'},
    { value: 4, display: '4 weeks'},
    { value: 5, display: '5 weeks'},
    { value: 6, display: '6 weeks'},
    { value: 9, display: '9 weeks'},
    { value: 12, display: '12 weeks'}
    
  ]

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setInPrice(this.inPriceI)
  }

  setInPrice( inPrice: Weekly ) {
    if (typeof inPrice === 'undefined') {
      inPrice = new Weekly
      inPrice.incentives = false
      inPrice.minimumTerm = 1
    }
    
    const priceFG = this._fb.group({
      price:              inPrice.price,
      minimumTerm:        inPrice.minimumTerm,
      incentives:         inPrice.incentives,
      month:              inPrice.month
    })

    this.parentForm.setControl('price', priceFG);

  }

  get inPrice() {
    return this.parentForm.get('price') as FormGroup
  }

}
