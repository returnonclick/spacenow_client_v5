/* 
 * MODEL NAME
 * MealCategory
 * 
 * IMPORTED MODES
 *
 * 
 * Path to firebase: `/mealsCategory`
 * 
 *  */

export class MealCategory {
  mealCategoryId?: string;
  categoryName?: string;
  isActive?: boolean;
  hasDislikes?: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;

  constructor( 
    mealCategoryId?: string,
    categoryName?: string,
    isActive?: boolean,
    hasDislikes?: boolean,
    createdBy?: string,
    createdAt?: Date,
    updatedBy?: string,
    updatedAt?: Date
  ) {
    this.mealCategoryId = mealCategoryId || null;
    this.categoryName = categoryName || null;
    this.isActive = isActive || false;
    this.hasDislikes = hasDislikes || false;
    this.createdBy = createdBy || null;
    this.createdAt = createdAt || null;
    this.updatedBy = updatedBy || null;
    this.updatedAt = updatedAt || null;
  }

  static fromJson({mealCategoryId, categoryName, isActive, hasDislikes, createdBy, createdAt, updatedBy, updatedAt}):MealCategory {
    return new MealCategory(mealCategoryId, categoryName, isActive, hasDislikes, createdBy, createdAt, updatedBy, updatedAt);
  }

  static fromJsonList(mealsCategory: any): MealCategory[] {
    return mealsCategory; //.map(MealCategory.fromJson);
  }

}
export default [ MealCategory ]