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

export class Category {
  id: string
  name: string
  slug: string
  order: number
  amenities: string[]
  specifications: Object[]
  icon: number[][]
  description: string
  image: ImageData

}

