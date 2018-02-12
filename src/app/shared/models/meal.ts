/* 
 * MODEL NAME
 * Meal
 * 
 * IMPORTED MODES
 * MealSizes
 * 
 * Path to firebase: `/meals`
 * 
 *  */


import { MealSizes } from '@shared/models/meal-sizes';

export class Meal {
  mealId?: string;
  name?: string;
  description?: string;
  mealTypeId?: string;
  mealCategoryIds?: string[];
  mealSizeIds?: string[];
  mealSizes?: MealSizes[];
  isActive?: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;

  constructor(row: any = null) {
    if(row) {
      this.mealId          = row.$key || null;
      this.name            = row.name || null;
      this.description     = row.description || null;
      this.mealTypeId      = row.mealTypeId || null,
      this.mealCategoryIds = row.mealCategoryIds || null,
      this.mealSizeIds     = row.mealSizeIds || null,
      this.mealSizes       = row.mealSizes || [],
      this.isActive        = row.isActive || false;
      this.createdBy       = row.createdBy || null;
      this.createdAt       = row.createdAt || null;
      this.updatedBy       = row.updatedBy || null;
      this.updatedAt       = row.updatedAt || null;
    }
  }

}
export default [ Meal ]