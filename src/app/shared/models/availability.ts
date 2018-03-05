import { OpeningTime } from './opening-time'
export class Availability extends Object{

  bookingType:   string = null
  leadTime:      number = 0
  // openingTime:   number
  // closingTime:   number
  // openingDays:   any
  openingTime: OpeningTime = new OpeningTime()
  isOpen247:     boolean 
  exceptionDays: Date[]

  constructor( model: any = null ) {

    super(model)

    if ( model ) {

      this.bookingType      = model.bookingType || null
      this.leadTime         = model.leadTime || 0
      // this.openingTime      = model.openingTime || null
      // this.closingTime      = model.closingTime || null
      // this.openingDays      = model.openingDays || {}
      this.openingTime = model.openingTime || new OpeningTime()
      this.isOpen247        = model.isOpen247 || false
      this.exceptionDays    = model.exceptionDays || new Array()

    }

  }

}
