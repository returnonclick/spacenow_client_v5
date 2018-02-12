export class IngredientMeal {
  ingredient?: string;
  unit?: string;
  weight?: number;
  
  constructor( 
    ingredient?: string,
    unit?: string,
    weight?: number
  )
  {
    this.ingredient = ingredient || null;
    this.unit = unit || null;
    this.weight = weight || 0;
  }

  static fromJson({
    ingredient,
    unit,
    weight
  }):IngredientMeal {
      return new IngredientMeal(
        ingredient,
        unit,
        weight
      );
  }

  static fromJsonList(ingredientMeal: any): IngredientMeal[] {
      return ingredientMeal; //.map(MealCategory.fromJson);
  }

}

export default [ IngredientMeal ]