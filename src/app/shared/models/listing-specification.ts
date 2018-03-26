/*
 * MODEL NAME
 * Specification
 *
 * Path to firebase: `/listing-specifications`
 *
 *  */

export class ListingSpecification extends Object {
  id: string = ''
  name: string = ''
  slug: string = ''
  order: number = 100

  constructor(model: any = null) {
    super()
    if(model) {
      this.id    = model.id || ''
      this.name  = model.name || ''
      this.slug  = model.slug || ''
      this.order = model.order || ''

    }
  }

}
