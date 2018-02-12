/* 
 * MODEL NAME
 * discountCodes
 * 
 * IMPORTED MODES
 *
 * 
 * Path to firebase: `/discountCodes`
 * 
 *  */


export class DiscountCode {
  name: string
  type: DiscountType
  isReusable: boolean
  numUses: number
  endDate: Date
  amount: number
  isActive: boolean
  key: string

  constructor(row: any = null) {
    if(row) {
      this.name = row.name
      this.type = row.type
      this.isReusable = row.isReusable
      this.numUses = row.numUses
      this.endDate = row.endDate
      this.amount = row.amount
      this.isActive = row.isActive
      this.key = row.$key
    }
  }
}

export enum DiscountType {
  FLAT = 'Flat Dollar',
  PERCENT = 'Percentage',
  DELIVERY = 'Free Delivery'
}

export default [
  DiscountCode,
  DiscountType
]
