/* 
 * MODEL NAME
 * Ingredient
 * 
 * IMPORTED MODES
 *
 * 
 * Path to firebase: `/ingredients`
 * 
 *  */

export class Ingredient {
  id:                   string  = null
  ingredientId:         string  = ''
  name:                 string  = ''
  description:          string  = ''
  packagingUnit:        string  = ''
  measurementUnit:      string  = ''
  weightPurchaseUnit:   number  = 0
  quantityType:         string  = ''
  isMeasuredQuantity:   boolean = false
  isActive:             boolean = false
  hasDislikes:          boolean = false

  constructor( model: any = null) {

    if ( model ) {

      this.id                 = model.id
      this.ingredientId       = model.ingredientId
      this.name               = model.name
      this.description        = model.description
      this.packagingUnit      = model.packagingUnit
      this.measurementUnit    = model.measurementUnit
      this.weightPurchaseUnit = model.weightPurchaseUnit
      this.quantityType       = model.quantityType
      this.isMeasuredQuantity = model.isMeasuredQuantity
      this.isActive           = model.isActive
      this.hasDislikes        = model.hasDislikes

    }

  }

}

export default [ Ingredient ]