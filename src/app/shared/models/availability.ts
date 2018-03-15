// import { OpeningTime } from './opening-time'
export class Availability extends Object{

  bookingType:   string = null
  leadTime:      number = 1
  openingTime:   OpeningTime = new OpeningTime()
  isOpen247:     boolean = false
  exceptionDays: ExceptionDay[] = []

  constructor( model: any = null ) {

    super(model)

    if ( model ) {

      this.bookingType      = model.bookingType || null
      this.leadTime         = model.leadTime || 1
      this.openingTime      = new OpeningTime(model.openingTime) || new OpeningTime()
      this.isOpen247        = model.isOpen247 || false
      this.exceptionDays    = (model.exceptionDays || []).map(day => new ExceptionDay(day))

    }

  }

}

export class ExceptionDay {

  fromDate: Date 
  toDate: Date
  note: string

  constructor( model: any = null ) {
    
    if ( model ) {

      this.fromDate = model.date || null
      this.toDate = model.date || null
      this.note = model.note || ''

    }

  }

}

export class OpeningDay extends Object {
  startHour: number = 0
  closeHour: number = 0
  startMinute: number = 0 // not gonna be used yet
  closeMinute: number = 0 // not gonna be used yet
  isOpen: boolean = true

  constructor(model: any = null) {
    super(model)
    if(model) {
      this.startHour = model.startHour || 0
      this.closeHour = model.clostHour || 0
      this.startMinute = model.startMinute || 0 
      this.closeMinute = model.closeMinute || 0
      this.isOpen = model.isOpen || true
    }
  }

}


export class OpeningTime extends Object {
  sun: OpeningDay = new OpeningDay()
  mon: OpeningDay = new OpeningDay()
  tue: OpeningDay = new OpeningDay()
  wed: OpeningDay = new OpeningDay()
  thu: OpeningDay = new OpeningDay()
  fri: OpeningDay = new OpeningDay()
  sat: OpeningDay = new OpeningDay()
  
  constructor(model: any = null) {
    super(model)

    if(model) {
      this.sun = new OpeningDay(model.sun) || new OpeningDay()
      this.mon = new OpeningDay(model.mon) || new OpeningDay()
      this.tue = new OpeningDay(model.tue) || new OpeningDay()
      this.wed = new OpeningDay(model.wed) || new OpeningDay()
      this.thu = new OpeningDay(model.thu) || new OpeningDay()
      this.fri = new OpeningDay(model.fri) || new OpeningDay()
      this.sat = new OpeningDay(model.sat) || new OpeningDay()
    }
  }
}
