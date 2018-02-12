/* 
 * MODEL NAME
 * MealType
 * 
 * IMPORTED MODES
 * 
 * 
 * Path to firebase: `/mealsType`
 * 
 *  */


export class MealType {
    mealTypeId?: string;
    typeName?: string;
    isActive?: boolean;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;

    constructor(row: any = null
      // mealTypeId?: string,
      // typeName?: string,
      // isActive?: boolean,
      // createdBy?: string,
      // createdAt?: Date,
      // updatedBy?: string,
      // updatedAt?: Date
    ) {
      if(row) {
        this.mealTypeId = row.mealTypeId || null;
        this.typeName   = row.typeName || null;
        this.isActive   = row.isActive || false;
        this.createdBy  = row.createdBy || null;
        this.createdAt  = row.createdAt || null;
        this.updatedBy  = row.updatedBy || null;
        this.updatedAt  = row.updatedAt || null;
      }
    }

    // static fromJson({mealTypeId, typeName, isActive, createdBy, createdAt, updatedBy, updatedAt}):MealType {
    //   return new MealType(mealTypeId, typeName, isActive, createdBy, createdAt, updatedBy, updatedAt);
    // }
    //
    // static fromJsonList(mealsType: any): MealType[] {
    //   return mealsType; //.map(MealType.fromJson);
    // }

  }

  // export enum MealTypeStatus {
  //   PUBLISHED,
  //   UNPUBLISHED
  // }

  export default [ MealType ]