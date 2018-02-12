
/* 
 * MODEL NAME
 * MealSizes
 * 
 * IMPORTED MODES
 * IngredientMeal, NutritionalInformation
 * 
 * Path to firebase: `/mealsSize`
 * 
 *  */


import { IngredientMeal } from '@shared/models/ingredient-meal';
import { NutritionalInformation } from '@shared/models/nutritional-information';

export class MealSizes {
  mealSizeId?: string;
  mealSizeName?: string;
  customerPrice?: number;
  servingSize?: number;
  servesNumber?: number;
  nutritionalInformation?: NutritionalInformation[];
  ingredientMeal?: IngredientMeal[];
  
  constructor( 
    mealSizeId?: string,
    mealSizeName?: string,
    customerPrice?: number,
    servingSize?: number,
    servesNumber?: number,
    nutritionalInformation?: NutritionalInformation[],
    ingredientMeal?: IngredientMeal[]
  )
  {
    this.mealSizeId = mealSizeId || null;
    this.mealSizeName = mealSizeName || null;
    this.customerPrice = customerPrice || 0;
    this.servingSize = servingSize || 0;
    this.servesNumber = servesNumber || 0;
    this.nutritionalInformation = nutritionalInformation || null;
    this.ingredientMeal = ingredientMeal || null;
  }

  static fromJson({
    mealSizeId,
    mealSizeName,
    customerPrice,
    servingSize,
    servesNumber,
    nutritionalInformation,
    ingredientMeal
  }):MealSizes {
      return new MealSizes(
        mealSizeId,
        mealSizeName,
        customerPrice,
        servingSize,
        servesNumber,
        nutritionalInformation,
        ingredientMeal
      );
  }

  static fromJsonList(mealSizes: any): MealSizes[] {
      return mealSizes; //.map(MealCategory.fromJson);
  }

}
export default [ MealSizes ]