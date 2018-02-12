/**
 * MODEL NAME
 * PackUnit
 *
 * IMPORTED MODES
 *
 * Path to firebase: `/packs`
 */
export class Pack {
  id:         string        = ''
  name:       string        = ''
  isActive:   boolean       = true
  measureIds: Array<string> = []

  constructor(model: any = null) {
    if(model) {
      this.id         = model.id
      this.name       = model.name
      this.isActive   = model.isActive
      this.measureIds = model.measureIds
    }
  }

}

export default [ Pack ]
