import { Booking } from '@models/booking'
import { ImageData } from '@models/image-data'
import { Address } from '@models/address'

export class Space extends Object {
  constructor(
    public id:           string = "",
    public ref:          string = "",
    public ownerUid:     string = "",
    public title:        string = "",
    public description:  string = "",
    public rules:        string = "",
    public tags:         string[] =  new Array(),
    public images:       ImageData[] = new Array(),
    public unit:         string = "",
    public categoryId:   string ="",
    public amenityIds:   string[] = new Array(),
    public isApproved:   boolean = false,
    public address:      Address = new Address(),
    // availability: BookingSlot[],
    // public price: Price = new Price()
    public booking: Booking = new Booking()

    ){
      super()
    }

}

export class Price extends Object {
  price:       number
  minimumTerm: number
  incentives:  boolean

  constructor( model: any = null ) {

    super (model)

    if ( model ) {
      this.price        = model.price || 0
      this.minimumTerm  = model.minimumTerm || 0
      this.incentives   = model.incentives || false
    }
  }
}

export class Hourly extends Price {

  halfDay: number
  day:     number

  constructor( model: any = null ) {

    super(model)

    if (model) {
      this.halfDay = model.halfDay || 0
      this.day     = model.day || 0
    }

  }
}

export class Daily extends Price {

  week: number

  constructor( model: any = null ) {

    super(model)

    if ( model ) {
      this.week = model.week || 0
    }

  }
}

export class Weekly extends Price {

  month: number

  constructor( model: any = null ) {

    super(model)

    if (model) {
      this.month = model.month || 0
    }

  }
}

export class Monthly extends Price {

  sixMonths:  number
  year:       number

  constructor( model: any = null ) {

    super(model)

    if (model) {
      this.sixMonths = model.sixMonths || 0
      this.year      = model.year || 0
    }

  }
}
