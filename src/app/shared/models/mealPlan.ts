/* 
 * MODEL NAME
 * MealPlan
 * 
 * IMPORTED MODES
 * 
 * 
 * Path to firebase: `/mealPlans`
 * 
 *  */


export class MealPlan {
  mealPlanId: string
  name: string
  startDate: Date
  endDate: Date
  isActive: boolean
  schedule: any
  createdBy: string
  createdOn: Date
  updatedBy: string
  updatedOn: Date

  constructor(row: any = null) {
    if(row) {
      this.mealPlanId = row.$key || null
      this.name       = row.name || null
      this.startDate  = row.startDate || null
      this.endDate    = row.endDate || null
      this.isActive   = row.isActive || false
      this.schedule   = row.schedule || {}
      this.createdBy  = row.createdBy || null
      this.createdOn  = row.createdOn || null
      this.updatedBy  = row.updatedBy || null
      this.updatedOn  = row.updatedOn || null
    }
  }

  get mealTypeIds() {
    let mealTypeIds = []
    if(this.schedule) {
      Object.keys(this.schedule).forEach(day => {
        mealTypeIds.push(...Object.keys(this.schedule[day]))
      })
    }

    return Array.from(new Set(mealTypeIds))
  }

}

export default [ MealPlan ]
