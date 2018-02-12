/* 
 * MODEL NAME
 * TaxCode
 * 
 * IMPORTED MODES
 *
 * 
 * Path to firebase: `/taxCodes`
 * 
 *  */

export class TaxCode {
  taxCodeId: string
  name: string
  percentage: number
  isActive: boolean

  constructor(row: any = null) {
    if(row) {
      this.taxCodeId  = row.$key
      this.name       = row.name
      this.percentage = row.percentage
      this.isActive   = row.isActive
    }
  }

}

export default [ TaxCode ]
