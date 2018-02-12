export class MealSize {
    mealSizeId?: string;
    sizeName?: string;
    isActive?: boolean;
    startDate?: Date;
    endDate?: Date;
    createdBy?: string;
    createdAt?: Date;
    updatedBy?: string;
    updatedAt?: Date;
  
    constructor( 
      mealSizeId?: string,
      sizeName?: string,
      isActive?: boolean,
      startDate?: Date,
      endDate?: Date,
      createdBy?: string,
      createdAt?: Date,
      updatedBy?: string,
      updatedAt?: Date
    ) {
      this.mealSizeId = mealSizeId || null;
      this.sizeName   = sizeName || null;
      this.isActive   = isActive || false;
      this.startDate  = startDate || null;
      this.endDate    = endDate || null;
      this.createdBy  = createdBy || null;
      this.createdAt  = createdAt || null;
      this.updatedBy  = updatedBy || null;
      this.updatedAt  = updatedAt || null;
    }
  
    static fromJson({mealSizeId, sizeName, isActive, startDate, endDate, createdBy, createdAt, updatedBy, updatedAt}):MealSize {
      return new MealSize(mealSizeId, sizeName, isActive, startDate, endDate, createdBy, createdAt, updatedBy, updatedAt);
    }
  
    static fromJsonList(mealsSize: any): MealSize[] {
      return mealsSize; //.map(MealSize.fromJson);
    }
  
  }
  
  export default [ MealSize ]