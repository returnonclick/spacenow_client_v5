/* 
 * MODEL NAME
 * ListingModel
 * 
 * IMPORTED MODELS
 * ImageDataModel
 * BookingSlotModel
 * RatingModel
 * AddressModel
 * 
 * Path to firebase: `/listings`
 * 
 *  */
import { Space } from '@shared/models/space';
// import { ImageDataModel } from './image-data.model';
// import { BookingSlotModel } from './booking-slot.model';
// import { RatingModel } from './rating.model';
// import { AddressModel } from './address.model';

export class Listing extends Space {
  constructor() {
    super()
  }
}

export class CarListing extends Space {

  carparks: number

  constructor (model: any = null ) {
    super()

    if (model) {
      this.carparks = model.carparks
    }

  }
}
