/*
 * MODEL NAME
 * Amenity
 *
 * Path to firebase: `/amenities`
 *
 *  */
export class Amenity {

  id:   string = ''
  name: string = ''
  slug: string = ''
  icon: string = ''

  constructor( model: any = null ) {
    if(model) {
      this.id   = model.id || ''
      this.name = model.name || ''
      this.slug = model.slug || ''
      this.icon = model.icon || ''
    }
  }

}
