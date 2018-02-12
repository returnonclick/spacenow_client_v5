import { Measure } from '@shared/models/measure'
import { Pack } from '@shared/models/pack'

export class PackMeasure {
  pack:    Pack
  measure: Measure

  constructor(model: any = null) {
    if(model) {
      this.pack    = model.pack
      this.measure = model.measure
    }
  }
}

export default [ PackMeasure ]
