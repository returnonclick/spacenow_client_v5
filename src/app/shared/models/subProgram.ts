/* 
 * MODEL NAME
 * Subprogram
 * 
 * IMPORTED MODES
 *
 * 
 * Path to firebase: `/subprograms`
 * 
 *  */

export class SubProgram {
  subProgramId: string
  name: string
  description: string
  programId: string
  allowDislikes: boolean
  days: number
  subCost: SubProgramCost = new SubProgramCost()
  minCost: SubProgramCost = new SubProgramCost()
  mealTypeSched: any
  isDeleted: boolean
  createdBy: string
  createdOn: Date
  updatedBy: string
  updatedOn: Date

  constructor(row: any = null) {
    if(row) {
      this.subProgramId  = row.$key || null
      this.name          = row.name || null
      this.description   = row.description || null
      this.programId     = row.programId || null
      this.allowDislikes = row.allowDislikes || false
      this.days          = row.days || 0
      this.subCost       = new SubProgramCost(row.subCost)
      this.minCost       = new SubProgramCost(row.minCost)
      this.mealTypeSched = this._initMealTypeSched(row.mealTypeSched)
      this.isDeleted     = row.isDeleted || false
      this.createdBy     = row.createdBy || null
      this.createdOn     = row.createdOn || null
      this.updatedBy     = row.updatedBy || null
      this.updatedOn     = row.updatedOn || null
    }
  }

  private _initMealTypeSched(row: any = null) {
    if(!row)
      return []

    return Object.keys(row).map(day => row[day])
  }

}

export class SubProgramCost {
  base: number
  taxCodeId: string

  constructor(row: any = null) {
    if(row) {
      this.base      = row.base || 0
      this.taxCodeId = row.taxCodeId || null
    }
  }

}

export default [
  SubProgram,
  SubProgramCost
]
