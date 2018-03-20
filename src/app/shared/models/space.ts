import { Address } from '@models/address'
import { Availability } from '@models/availability'
import { ImageData } from '@models/image-data'

export class Space extends Object {

  id:             string        = null
  ref:            string        = null
  ownerUid:       string        = null
  title:          string        = ''
  description:    string        = ''
  rules:          string        = ''
  tags:           string[]      = []
  images:         ImageData[]   = []
  price:          {
    hourly:  Hourly
    daily:   Daily
    weekly:  Weekly
    monthly: Monthly
  }
  priceUnit:      string        = 'daily'
  categoryId:     string        = null
  amenityIds:     string[]      = []
  address:        Address       = new Address()
  specifications: Object[]
  availability:   Availability  = new Availability()
  status:         ListingStatus = ListingStatus.DRAFT
  createdAt:      Date          = new Date()

  constructor(model: any = null) {
    super(model)
    if(model) {
      this.id            = model.id || null
      this.ref           = model.ref || null
      this.ownerUid      = model.ownerUid || null
      this.title         = model.title || ''
      this.description   = model.description || ''
      this.rules         = model.rules || ''
      this.tags          = model.tags || []
      this.images        = model.images || []
      this.price.hourly  = new Hourly(model.price)
      this.price.daily   = new Daily(model.price)
      this.price.weekly  = new Weekly(model.price)
      this.price.monthly = new Monthly(model.price)
      this.priceUnit     = model.priceUnit || 'daily'
      this.categoryId    = model.categoryId || null
      this.amenityIds    = model.amenityIds || []
      this.address       = model.address || new Address()
      this.availability  = model.availability || new Availability()
      this.status        = model.status || ListingStatus.DRAFT
      this.createdAt     = model.createdAt || new Date()
    }
  }

}

export enum ListingStatus {
  DRAFT   = 'draft',
  PENDING = 'pending',
  ACTIVE  = 'active',
  HIDDEN  = 'hidden',
  DELETED = 'deleted'
}

export class TaxDetails extends Object {
  percent: number
  name:    string
  country: string

  constructor(model: any = null) {
    super(model)
    if(model) {
      this.percent = model.percent
      this.name    = model.name
      this.country = model.country
    }
  }

}

export class Price extends Object {

  price:       number
  minimumTerm: number
  incentives:  boolean
  currency:    string = 'AUD'
  tax:         TaxDetails

  constructor(model: any = null) {
    super(model)
    if(model) {
      this.price       = model.price || 0
      this.minimumTerm = model.minimumTerm || 0
      this.incentives  = model.incentives || false
      this.currency    = model.currency || 'AUD'
      this.tax         = new TaxDetails(model.tax || null)
    }
  }

}

export class Hourly extends Price {

  halfDay: number
  day:     number

  constructor(model: any = null) {
    super(model)
    if(model) {
      this.halfDay = model.halfDay || 0
      this.day     = model.day || 0
    }
  }

}

export class Daily extends Price {

  week: number

  constructor(model: any = null) {
    super(model)
    if(model) {
      this.week = model.week || 0
    }
  }

}

export class Weekly extends Price {

  month: number

  constructor(model: any = null) {
    super(model)
    if(model) {
      this.month = model.month || 0
    }
  }

}

export class Monthly extends Price {

  sixMonths: number
  year:      number

  constructor(model: any = null) {
    super(model)
    if(model) {
      this.sixMonths = model.sixMonths || 0
      this.year      = model.year || 0
    }
  }

}
