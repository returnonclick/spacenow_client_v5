/* 
 * MODEL NAME
 * Program
 * 
 * IMPORTED MODES
 *
 * 
 * Path to firebase: `/programs`
 * 
 *  */

export class Program {
  programId: string
  name: string
  type: ProgramType
  mealPlanId: string
  startDate: Date
  endDate: Date
  isActive: boolean
  createdBy: string
  createdOn: Date
  updatedBy: string
  updatedOn: Date

  constructor(row: any = null) {
    if(row) {
      this.programId  = row.$key
      this.name       = row.name
      this.type       = row.type
      this.mealPlanId = row.mealPlanId
      this.startDate  = row.startDate
      this.endDate    = row.endDate
      this.isActive   = row.isActive
      this.createdBy  = row.createdBy
      this.createdOn  = row.createdOn
      this.updatedBy  = row.updatedBy
      this.updatedOn  = row.updatedOn
    }
  }
}

export enum ProgramType {
  SET     = "Set",
  DYNAMIC = "Dynamic"
}

export default [ Program, ProgramType ]