import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Observable } from 'rxjs/Observable'

import { OpeningDay } from '@models/availability'

@Component({
  selector: 'sn-opening-day',
  templateUrl: './opening-day.component.html',
  styleUrls: ['./opening-day.component.scss']
})
export class OpeningDayComponent implements OnInit {

  openingHours = [
    {key: 0.0, value: "00:00 AM"},
    {key: 0.5, value: "00:30 AM"},
    {key: 1.0, value: "01:00 AM"},
    {key: 1.5, value: "01:30 AM"},
    {key: 2.0, value: "02:00 AM"},
    {key: 2.5, value: "02:30 AM"},
    {key: 3.0, value: "03:00 AM"},
    {key: 3.5, value: "03:30 AM"},
    {key: 4.0, value: "04:00 AM"},
    {key: 4.5, value: "04:30 AM"},
    {key: 5.0, value: "05:00 AM"},
    {key: 5.5, value: "05:30 AM"},
    {key: 6.0, value: "06:00 AM"},
    {key: 6.5, value: "06:30 AM"},
    {key: 7.0, value: "07:00 AM"},
    {key: 7.5, value: "07:30 AM"},
    {key: 8.0, value: "08:00 AM"},
    {key: 8.5, value: "08:30 AM"},
    {key: 9.0, value: "09:00 AM"},
    {key: 9.5, value: "09:30 AM"},
    {key: 10.0, value: "10:00 AM"},
    {key: 10.5, value: "10:30 AM"},
    {key: 11.0, value: "11:00 AM"},
    {key: 11.5, value: "11:30 AM"},

    {key: 12.0, value: "00:00 PM"},
    {key: 12.5, value: "00:30 PM"},
    {key: 13.0, value: "01:00 PM"},
    {key: 13.5, value: "01:30 PM"},
    {key: 14.0, value: "02:00 PM"},
    {key: 14.5, value: "02:30 PM"},
    {key: 15.0, value: "03:00 PM"},
    {key: 15.5, value: "03:30 PM"},
    {key: 16.0, value: "04:00 PM"},
    {key: 16.5, value: "04:30 PM"},
    {key: 17.0, value: "05:00 PM"},
    {key: 17.5, value: "05:30 PM"},
    {key: 18.0, value: "06:00 PM"},
    {key: 18.5, value: "06:30 PM"},
    {key: 19.0, value: "07:00 PM"},
    {key: 19.5, value: "07:30 PM"},
    {key: 20.0, value: "08:00 PM"},
    {key: 20.5, value: "08:30 PM"},
    {key: 21.0, value: "09:00 PM"},
    {key: 21.5, value: "09:30 PM"},
    {key: 22.0, value: "10:00 PM"},
    {key: 22.5, value: "10:30 PM"}, 
    {key: 23.0, value: "11:00 PM"},
    {key: 23.5, value: "11:30 PM"},
  ]

  @Input() openingDay: OpeningDay
  @Input() weekday: string
  @Output() onOpeningDayChange = new EventEmitter<{time: OpeningDay, weekday: string, valid: boolean}>()

  openingDayForm: FormGroup
  closingHours: Observable<any[]> 
  isValid: boolean
  isSlideOpened: boolean = true

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterClosingHours({value: this.openingDay.startHour})
    
    this.openingDayForm = this.fb.group({
      isOpen: [this.openingDay.isOpen],
      startHour: [this.openingDay.startHour],
      closeHour: [this.openingDay.closeHour]
    })

    if(this.openingDay.startHour === 0) {
      this.openingDayForm.controls['startHour'].setValue(8.0)
    }

    if(this.openingDay.closeHour === 23 || this.openingDay.closeHour === 0) {
      this.openingDayForm.controls['closeHour'].setValue(18.0)
    }

    this.isSlideOpened = this.openingDayForm.controls['isOpen'].value

    this.openingDayChange()
    
  }


  filterClosingHours(event) {
    this.closingHours = Observable.of(this.openingHours.filter(hour =>{
      return hour.key > event.value
    }))
  }

  openingDayChange() {
    // reset if being a closed day
    // console.log(this.openingDayForm.controls['isOpen'].value)
    if(!(this.openingDayForm.controls['isOpen'].value)) {
      this.openingDayForm.controls['startHour'].setValue(0)
      this.openingDayForm.controls['closeHour'].setValue(0)
      this.isSlideOpened = false  
    } else {
      if(!this.isSlideOpened) {
        this.openingDayForm.controls['startHour'].setValue(8.0)
        this.openingDayForm.controls['closeHour'].setValue(18.0)
        this.isSlideOpened = true
      }
    }

    this.onOpeningDayChange.emit({ time: this.openingDayForm.value, weekday: this.weekday, valid: this.openingDayForm.valid })
  }


}
