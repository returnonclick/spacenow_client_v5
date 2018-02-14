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

  @Output() price: EventEmitter<number> = new EventEmitter<number>()

  @Input()
  parentCount: number;

  aux: number = 2
  
  terms = [
    { value: '1', display: '1 day'},
    { value: '2', display: '2 days'},
    { value: '3', display: '3 days'},
    { value: '4', display: '4 days'}
  ]

  ngOnInit() {
    // this.price.emit(2)
    
    // this.daily = new Daily() 
    // console.log(this.price)
    // this.daily.subscribe(daily => {
    //   if(daily)
    //     this.dailyMap = daily.reduce((acc, curr) => {
    //       acc[curr.id] = curr
    //       return acc
    //     }, {})
    // })

  }

  // valMap = (key, obj) => {
  //   let value = obj[key] || ''
  //   switch(key) {
  //     case 'incentives':   return value
  //     case 'price':        return value
  //     case 'unit':         return value
  //     case 'minimumTerm':  return value
  //     case 'halfWeek':     return value
  //     case 'week':         return value
  //     default:             return (JSON.stringify(value) || '').replace(/\"/g, '')
  //   }
  // }
}
