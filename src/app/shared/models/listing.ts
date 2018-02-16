/* 
 * MODEL NAME
 * ListingModel
 * 
 * IMPORTED MODELS
 * SpaceDataModel
 * 
 * Path to firebase: `/listings`
 * 
 *  */
import { Space } from '@shared/models/space';

export class Listing extends Space {
  constructor() {
    super()
  }
}

export class CarListing extends Space {

  carparks: number
  // capacity: number
  // kitchen: number

  constructor (model: any = null ) {

    super(model)

    if (model) {
      this.carparks = model.carparks || 0
    }

  }
}

export class OfficeListing extends Space {
  
    carparks: number
  
    constructor (model: any = null ) {
  
      super(model)
  
      if (model) {
        this.carparks = model.carparks || 0
      }
  
    }
  }