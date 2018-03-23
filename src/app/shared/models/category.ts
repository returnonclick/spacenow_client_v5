/* 
 * MODEL NAME
 * CategoryModel
 * 
 * IMPORTED MODELS
 * 
 * Path to firebase: `/categories`
 * 
 *  */

import { ImageData } from "@shared/models/image-data";

export class Category extends Object {
  icon: number[][]
  description: string
  image: ImageData
  id:             string  = ''
  name:           string = ''
  slug:           string = ''
  order:          number = 100
  amenities:      string[] = []
  specifications: Object[] = []

  constructor( model: any = null ) {
    super()
    if ( model ) {

      this.id             = model.id || ''
      this.name           = model.name || ''
      this.slug           = model.slug || ''
      this.order          = model.order || 100
      this.amenities      = model.amenities || ''
      this.specifications = model.specifications || 100

    }

  }
}

