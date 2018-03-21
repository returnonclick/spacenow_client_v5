/*
 * MODEL NAME
 * Specification
 *
 * Path to firebase: `/listing-specifications`
 *
 *  */
export class ListingSpecification {
  id: string = ''
  name: string = ''
  slug: string = ''
  order: number = 100

  constructor(model: any = null) {

    if(model) {
      this.id    = model.id || ''
      this.name  = model.name || ''
      this.slug  = model.slug || ''
      this.order = model.order || ''

    }
  }

}
