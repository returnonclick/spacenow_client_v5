class Booking {
  id:            string         = ''
  userId:        string         = ''
  createdOn:     Date           = null
  finalPrice:    number         = 0
  currency:      string         = ''
  paymentStatus: string         = ''
  bookingStatus: string         = ''
  cancellation:  Cancellation   = null
  spaceBookings: BookingSpace[] = []

  constructor(model: any = null) {
    if(model) {
      this.id            = model.id                                                      || ''
      this.userId        = model.userId                                                  || ''
      this.createdOn     = model.createdOn                                               || null
      this.finalPrice    = model.finalPrice                                              || 0
      this.currency      = model.currency                                                || ''
      this.paymentStatus = model.paymentStatus                                           || ''
      this.bookingStatus = model.bookingStatus                                           || ''
      this.cancellation  = new Cancellation(model.cancellation)                          || null
      this.spaceBookings = model.spaceBookings.map(booking => new BookingSpace(booking)) || []
    }
  }
}

class Cancellation {
  reason: string = ''
  date:   Date   = null

  constructor(model: any = null) {
    if(model) {
      this.reason = model.reason || ''
      this.date   = model.date   || null
    }
  }
}

class BookingSpace {
  spaceId:      string        = ''
  numGuests:    number        = 0
  bookingDates: BookingDate[] = []

  constructor(model: any = null) {
    if(model) {
      this.spaceId      = model.spaceId                                         || ''
      this.numGuests    = model.numGuests                                       || 0
      this.bookingDates = model.bookingDates.map(date => new BookingDate(date)) || []
    }
  }
}

class BookingDate {
  date:     Date   = null
  fromHour: number = 0
  toHour:   number = 0

  constructor(model: any = null) {
    if(model) {
      this.date     = model.date     || null
      this.fromHour = model.fromHour || 0
      this.toHour   = model.toHour   || 0
    }
  }
}

export {
  Booking,
  Cancellation,
  BookingSpace,
  BookingDate
}

export default [
  Booking,
  Cancellation,
  BookingSpace,
  BookingDate
]
