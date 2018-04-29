import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { OpeningDay } from '@models/availability'
import { OpeningTime } from '@models/availability'

@Component({
  selector: 'sn-opening-time',
  templateUrl: './opening-time.component.html',
  styleUrls: ['./opening-time.component.scss'],
})
export class OpeningTimeComponent implements OnInit {
  weekdays = [
    { key: "mon", value: "MON" },
    { key: "tue", value: "TUE" },
    { key: "wed", value: "WED"  },
    { key: "thu", value: "THU"  },
    { key: "fri", value: "FRI"  },
    { key: "sat", value: "SAT"  },
    { key: "sun", value: "SUN"  },
  ]

  @Input() openingTime: OpeningTime = new OpeningTime()
  @Output() onOpeningTimeChange = new EventEmitter<{ openingTime: OpeningTime, valid: boolean }>()

  monValid: boolean = false
  tueValid: boolean = false
  wedValid: boolean = false
  thuValid: boolean = false
  friValid: boolean = false
  satValid: boolean = false
  sunValid: boolean = false
  valid: boolean = false

  selectedOpeningTime: OpeningTime = new OpeningTime()

  constructor() {}

  ngOnInit() {}

  getOpeningDay(event) {
    this.updateOpeningTime(event.weekday, event.time, event.valid)
    this.onOpeningTimeChange.emit({
      openingTime: this.selectedOpeningTime,
      valid: this.checkValid()
    })
  }

  private updateOpeningTime(day: string, time: OpeningDay, valid: boolean) {
    switch(day) {
      case "MON": 
        this.selectedOpeningTime.mon = time
        this.monValid = valid
        break
      case "TUE": 
        this.selectedOpeningTime.tue = time
        this.tueValid = valid
        break
      case "WED": 
        this.selectedOpeningTime.wed = time
        this.wedValid = valid
        break
      case "THU": 
        this.selectedOpeningTime.thu = time
        this.thuValid = valid
        break
      case "FRI": 
        this.selectedOpeningTime.fri = time
        this.friValid = valid
        break
      case "SAT": 
        this.selectedOpeningTime.sat = time
        this.satValid = valid
        break
      case "SUN": 
        this.selectedOpeningTime.sun = time
        this.sunValid = valid
        break
    }
  }

  private checkValid(): boolean {
    return ( this.monValid &&
        this.tueValid &&
        this.wedValid &&
        this.thuValid &&
        this.friValid &&
        this.satValid &&
        this.sunValid)
  }
}
