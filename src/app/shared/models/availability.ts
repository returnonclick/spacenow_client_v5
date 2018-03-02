export class Availability extends Object{

  bookingType:   string
  leadTime:      number
  openingTime:   number
  closingTime:   number
  openingDays:   any
  isOpen247:     boolean 
  exceptionDays: Date[]

  constructor( model: any = null ) {

    super(model)

    if ( model ) {

      this.bookingType      = model.bookingType || null
      this.leadTime         = model.leadTime || 0
      this.openingTime      = model.openingTime || null
      this.closingTime      = model.closingTime || null
      this.openingDays      = model.openingDays || {}
      this.isOpen247        = model.isOpen247 || false
      this.exceptionDays    = model.exceptionDays || new Array()

    }

  }

}
