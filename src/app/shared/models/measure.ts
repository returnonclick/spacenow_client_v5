/**
 * MODEL NAME
 * MeasureUnit
 *
 * IMPORTED MODES
 *
 * Path to firebase: `/measures`
 */

export class Measure {

  id:                 string  = ''
  largeUnitShortName: string  = ''
  largeUnitLongName:  string  = ''
  smallUnitShortName: string  = ''
  smallUnitLongName:  string  = ''
  numRelation:        number  = 0
  isActive:           boolean = true

  constructor(model: any = null) {
    if(model) {
      this.id                 = model.id
      this.largeUnitShortName = model.largeUnitShortName
      this.largeUnitLongName  = model.largeUnitLongName
      this.smallUnitShortName = model.smallUnitShortName
      this.smallUnitLongName  = model.smallUnitLongName
      this.numRelation        = model.numRelation
      this.isActive           = model.isActive
    }
  }

}

export default [ Measure ]
