
export class Space extends Object{
  
    id:           string = null
    ref:          string = null
    ownerUid:     string = null
    title:        string = ''
    // address:      Address
    description:  string = ''
    rules:        string = ''
    tags:         string[] = []
    images:       ImageData[] = []
    price:        any = null
    categoryId:   string = null
    amenityIds:   string[] = null
    // availability: BookingSlot[]
    isApproved:   boolean = false

    constructor( model: any = null ) {

      super(model)

      if ( model ) {
        this.id          = model.id
        this.ref         = model.ref
        this.ownerUid    = model.ownerUid
        this.title       = model.title
        this.description = model.description
        this.rules       = model.rules
        this.tags        = model.tags
        this.images      = model.images
        this.price       = model.price
        this.categoryId  = model.categoryId
        this.amenityIds  = model.amenityIds
        this.isApproved  = model.isApproved
      }
    }
  }
  
  class Price extends Object {
    price:       number  = null
    unit:        string = null
    minimumTerm: number  = null
    incentives:  boolean = false

    constructor( model: any = null ) {

      super (model )

      if ( model ) {
        this.price          = model.price
        this.unit           = model.unit
        this.minimumTerm    = model.minimumTerm
        this.incentives     = model.incentives
      }
    }
  }

  class Hourly extends Price {
    halfDay:  number
    day:      number

    constructor( model: any = null ) {
      super()
      this.halfDay        = model.halfDay
      this.day            = model.day
    }
  }

  export class Daily extends Price {
    halfWeek:  number = null
    week:      number = null

    constructor( model: any = null ) {
      super()
      this.halfWeek       = model.halfWeek
      this.week           = model.week
    }
  }

  class Weekly extends Price {
    halfMonth:  number
    month:      number

    constructor( model: any = null ) {
      super()
      this.halfMonth       = model.halfMonth
      this.month           = model.month
    }
  }

  class Monthly extends Price {
    halfYear:  number
    year:      number

    constructor( model: any = null ) {
      super()
      this.halfYear       = model.halfYear
      this.year           = model.year
    }
  }