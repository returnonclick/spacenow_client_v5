import { Address } from '@models/address'
import { Availability } from '@models/availability'
import { ListingSpecification } from '@models/listing-specification'
import { ImageData } from '@models/image-data'
export class Space extends Object {
  id:             string                  = null
  ref:            string                  = null
  ownerUid:       string                  = null
  title:          string                  = ''
  description:    string                  = ''
  rules:          string                  = ''
  tags:           string[]                = []
  images:         ImageData[]             = []
  price:          Price                   = new Price() 
  priceUnit:      string                  = 'daily'
  categoryId:     string                  = null
  amenityIds:     string[]                = []
  address:        Address                 = new Address()
  specifications: ListingSpecification[]  = []
  availability:   Availability            = new Availability()
  status:         ListingStatus           = ListingStatus.DRAFT
  createdAt:      Date                    = new Date()
  currency:       string                  = 'AUD'
  tax:            TaxDetails              = new TaxDetails()
  constructor(model: any = null) {
    super()
    if(model) {
      this.id            = model.id || null
      this.ref           = model.ref || null
      this.ownerUid      = model.ownerUid || null
      this.title         = model.title || ''
      this.description   = model.description || ''
      this.rules         = model.rules || ''
      this.tags          = model.tags || []
      this.images        = model.images || []
      switch(model.priceUnit || 'daily') {
        case 'hourly':  
          this.price = new Hourly(model.price)
          break
        case 'daily': 
          this.price = new Daily(model.price)
          break
        case 'weekly':
          this.price = new Weekly(model.price)
          break
        case 'monthly':
          this.price = new Monthly(model.price)
          break
        default:
          this.price = new Price(model.price)
          break
      }
      this.priceUnit      = model.priceUnit || 'daily'
      this.categoryId     = model.categoryId || null
      this.amenityIds     = model.amenityIds || []
      this.address        = model.address || new Address()
      this.availability   = model.availability || new Availability()
      this.status         = model.status || ListingStatus.DRAFT
      this.createdAt      = model.createdAt || new Date()
      this.currency       = model.currency || 'AUD'
      this.tax            = new TaxDetails(model.tax || null)
      this.specifications = model.specifications || null
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
  percent: number = null
  name:    string = 'none'
  country: string = ''
  constructor(model: any = null) {
    super()
    if(model) {
      this.percent = model.percent || null
      this.name    = model.name || 'none'
      this.country = model.country || ''
    }
  }
}
export class Price extends Object {
  price:       number =  null
  minimumTerm: number = 1
  incentives:  boolean = false
  
  constructor(model: any = null) {
    super()
    if(model) {
      this.price       = model.price || null
      this.minimumTerm = model.minimumTerm || 1
      this.incentives  = model.incentives || false
    }
  }
}
export class Hourly extends Price {
  halfDay: number = null
  day:     number = null
  constructor(model: any = null) {
    super(model)
    if(model) {
      this.halfDay = model.halfDay || null
      this.day     = model.day || null
    }
  }
}
export class Daily extends Price {
  week: number = null
  constructor(model: any = null) {
    super(model)
    if(model) {
      this.week = model.week || null
    }
  }
}
export class Weekly extends Price {
  month: number = null
  constructor(model: any = null) {
    super(model)
    if(model) {
      this.month = model.month || null
    }
  }
}
export class Monthly extends Price {
  sixMonths: number = null
  year:      number = null
  constructor(model: any = null) {
    super(model)
    if(model) {
      this.sixMonths = model.sixMonths || null
      this.year      = model.year || null
    }
  }
}