
export class Availability extends Object{

  bookingType:   string         = 'instantly'
  leadTime:      number         = 1
  openingTime:   OpeningTime    = new OpeningTime()
  isOpen247:     boolean        = false
  exceptionDays: ExceptionDay[] = []

  constructor( model: any = null ) {
    super()
    if ( model ) {

      this.bookingType      = model.bookingType || 'instantly'
      this.leadTime         = model.leadTime || 1
      this.openingTime      = new OpeningTime(model.openingTime) || new OpeningTime()
      this.isOpen247        = model.isOpen247 || false
      this.exceptionDays    = (model.exceptionDays || []).map(day => new ExceptionDay(day))

    }
  }

}

export class ExceptionDay extends Object {

  fromDate: Date
  toDate:   Date
  note:     string

  constructor( model: any = null ) {
    super()
    if ( model ) {

      this.fromDate = model.fromDate || null
      this.toDate   = model.toDate || null
      this.note     = model.note || ''
    }

  }

}

export class OpeningDay {
  startHour:   number  = 0
  closeHour:   number  = 23
  startMinute: number  = 0 // not gonna be used yet
  closeMinute: number  = 0 // not gonna be used yet
  isOpen:      boolean = true

  constructor(model: any = null) {
    if(model) {
      this.startHour   = model.startHour || 0
      this.closeHour   = model.closeHour || 23
      this.startMinute = model.startMinute || 0
      this.closeMinute = model.closeMinute || 0
      this.isOpen      = typeof model.isOpen == 'undefined' ? true : model.isOpen
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
    super()
    if(model) {
      this.sun = new OpeningDay(model.sun || null)
      this.mon = new OpeningDay(model.mon || null)
      this.tue = new OpeningDay(model.tue || null)
      this.wed = new OpeningDay(model.wed || null)
      this.thu = new OpeningDay(model.thu || null)
      this.fri = new OpeningDay(model.fri || null)
      this.sat = new OpeningDay(model.sat || null)
    }
  }

}
