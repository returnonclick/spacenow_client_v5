class Booking {
  id:            string        = ''
  userId:        string        = ''
  spaceId:       string        = ''
  numGuests:     number        = 0
  finalPrice:    number        = 0
  currency:      string        = ''
  bookingStatus: BookingStatus = null
  paymentStatus: PaymentStatus = null
  bookingDates:  BookingDate[] = []
  userNotes:     string        = ''
  hostNotes:     string        = ''
  poaDetails:    PoaDetails    = null
  cancellation:  Cancellation  = null
  createdOn:     Date          = new Date()

  constructor(model: any = null) {
    if(model) {
      this.id            = model.id || ''
      this.userId        = model.userId || ''
      this.spaceId       = model.spaceId || ''
      this.numGuests     = model.numGuests || 0
      this.finalPrice    = model.finalPrice || 0
      this.currency      = model.currency || ''
      this.bookingStatus = model.bookingStatus || null
      this.paymentStatus = model.paymentStatus || null
      this.bookingDates  = (model.bookingDates || []).map(date => new BookingDate(date))
      this.userNotes     = model.userNotes || ''
      this.hostNotes     = model.hostNotes || ''
      this.poaDetails    = model.poaDetails ? new PoaDetails(model.poaDetails) : null
      this.cancellation  = model.cancellation ? new Cancellation(model.cancellation) : null
      this.createdOn     = model.createdOn || new Date()
    }
  }
}

enum BookingStatus {
  PENDING   = 'Pending',
  ENQUIRY   = 'Enquiry',
  BOOKED    = 'Booked',
  APPROVED  = 'Approved',
  DECLINED  = 'Declined',
  CONFIRMED = 'Confirmed',
  CANCELED  = 'Canceled',
  COMPLETED = 'Completed',
}

enum PaymentStatus {
  PENDING    = 'Pending',
  AUTHORIZED = 'Authorized',
  COMPLETED  = 'Completed',
}

class BookingDate {
  date:     Date   = new Date()
  fromHour: number = 0
  toHour:   number = 0

  constructor(model: any = null) {
    if(model) {
      this.date     = model.date     || new Date()
      this.fromHour = model.fromHour || 0
      this.toHour   = model.toHour   || 0
    }
  }
}
class PoaDetails {
  name:    string = ''
  email:   string = ''
  number:  string = ''
  message: string = ''

  constructor(model: any = null) {
    if(model) {
      this.name    = model.name || ''
      this.email   = model.email || ''
      this.number  = model.number || ''
      this.message = model.message || ''
    }
  }
}

class Cancellation {
  reason: string = ''
  date:   Date   = new Date()

  constructor(model: any = null) {
    if(model) {
      this.reason = model.reason || ''
      this.date   = model.date || new Date()
    }
  }
}


export {
  Booking,
  BookingDate,
  BookingStatus,
  Cancellation,
  PaymentStatus,
  PoaDetails,
}

export default [
  Booking,
  BookingDate,
  BookingStatus,
  Cancellation,
  PaymentStatus,
  PoaDetails,
]
