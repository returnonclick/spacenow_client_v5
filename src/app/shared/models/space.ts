import { Address } from '@models/address'

export class Space extends Object{

    id:           string
    ref:          string
    ownerUid:     string
    title:        string
    description:  string
    rules:        string
    tags:         string[]
    images:       ImageData[]
    price:        Price[]
    unit:         string
    categoryId:   string
    amenityIds:   string[]
    isApproved:   boolean
    address:      Address = new Address()
    // availability: BookingSlot[]

    constructor( model: any = null ) {

      super(model)

      if ( model ) {
        this.id          = model.id || null
        this.ref         = model.ref || null
        this.ownerUid    = model.ownerUid || null
        this.title       = model.title || ''
        this.description = model.description || ''
        this.rules       = model.rules || ''
        this.tags        = model.tags || []
        this.images      = model.images || []

        switch(model.unit) {
          case 'Hourly':  this.price.push(new Hourly(model))
          case 'Daily':   this.price.push(new Daily(model))
          case 'Weekly':  this.price.push(new Weekly(model))
          case 'monthly': this.price.push(new Monthly(model))
        }
        this.unit        = model.unit || 'daily'
        this.categoryId  = model.categoryId || null
        this.amenityIds  = model.amenityIds || []
        this.isApproved  = model.isApproved || false
        this.address = model.address || new Address()
      }
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
