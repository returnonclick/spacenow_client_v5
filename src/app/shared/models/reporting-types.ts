
export class ReportingTypes {

  address = [{
    campo: 'addressState',
    description: 'State',
    value: '',
    checked: false,

  }, {
    campo: 'status',
    description: 'Status',
    value: '',
    checked: false
  }, {
    campo: 'description',
    description: 'Description',
    value: '',
    checked: false
  }, {
    campo: 'createdBy',
    description: 'Created By',
    value: '',
    checked: false
  }, {
    campo: 'createdAt',
    description: 'Created Date',
    value: '',
    checked: false
  }, {
    campo: 'approvedBy',
    description: 'Approved By',
    value: '',
    checked: false
  }, {
    campo: 'approvedAt',
    description: 'Approved Date',
    value: '',
    checked: false
  }];

  ingredients = [{
    campo: 'name',
    description: 'Name',
    value: '',
    checked: false
  }, {
    campo: 'description',
    description: 'Description',
    value: '',
    checked: false
  }, {
    campo: 'packagingUnit',
    description: 'PackagingUnit',
    value: '',
    checked: false
  }, {
    campo: 'measurementUnit',
    description: 'measurementUnit',
    value: '',
    checked: false
  }, {
    campo: 'weightPurchaseUnit',
    description: 'WeightPurchaseUnit',
    value: '',
    checked: false
  }, {
    campo: 'quantityType',
    description: 'quantityType',
    value: '',
    checked: false
  }, {
    campo: 'isMeasuredQuantity',
    description: 'isMeasuredQuantity',
    value: '',
    checked: false
  }, {
    campo: 'isActive',
    description: 'isActive',
    value: '',
    checked: false
  }, {
    campo: 'hasDislikes',
    description: 'hasDislikes',
    value: '',
    checked: false
  }, {
    campo: 'createdBy',
    description: 'Created By',
    value: '',
    checked: false
  }, {
    campo: 'createdAt',
    description: 'Created Date',
    value: '',
    checked: false
  }, {
    campo: 'updatedBy',
    description: 'Updated By',
    value: '',
    checked: false
  }, {
    campo: 'updatedAt',
    description: 'Updated Date',
    value: '',
    checked: false
  }];

  IngredientMeal = [{
    campo: 'ingredient',
    description: 'Ingredient',
    value: '',
    checked: false
  }, {
    campo: 'unit',
    description: 'Unit',
    value: '',
    checked: false
  }];

  mealSize = [{
    campo: 'mealSizeName',
    description: 'Meal Size',
    value: '',
    checked: false
  }, {
    campo: 'customerPrice',
    description: 'customerPrice',
    value: '',
    checked: false
  }, {
    campo: 'servingSize',
    description: 'servingSize',
    value: '',
    checked: false
  }, {
    campo: 'servesNumber',
    description: 'servesNumber',
    value: '',
    checked: false
  }, {
    campo: 'nutritionalInformation',
    description: 'nutritionalInformation',
    value: '',
    checked: false
  }, {
    campo: 'ingredientMeal',
    description: 'ingredientMeal',
    value: '',
    checked: false
  }];


  meals = [{
    campo: 'name',
    description: 'Name',
    value: '',
    checked: false
  }, {
    campo: 'description',
    description: 'Description',
    value: '',
    checked: false
  }, {
    campo: 'mealTypeId',
    description: 'mealTypeId',
    value: '',
    checked: false
  }, {
    campo: 'mealCategoryIds',
    description: 'mealCategoryIds',
    value: '',
    checked: false
  }, {
    campo: 'mealSizeIds',
    description: 'mealSizeIds',
    value: '',
    checked: false
  }, {
    campo: 'mealSizes',
    description: 'mealSizes',
    value: '',
    checked: false
  }, {
    campo: 'isActive',
    description: 'isActive',
    value: '',
    checked: false
  }, {
    campo: 'createdBy',
    description: 'Created By',
    value: '',
    checked: false
  }, {
    campo: 'createdAt',
    description: 'Created Date',
    value: '',
    checked: false
  }, {
    campo: 'updatedBy',
    description: 'Updated By',
    value: '',
    checked: false
  }, {
    campo: 'updatedAt',
    description: 'Updated Date',
    value: '',
    checked: false
  }];

  nutritionalInformation = [{
    campo: 'name',
    description: 'Name',
    value: '',
    checked: false
  }, {
    campo: 'perServe',
    description: 'perServe',
    value: '',
    checked: false
  }];

  mealCategory = [{
    campo: 'categoryName',
    description: 'categoryName',
    value: '',
    checked: false
}, {
  campo: 'isActive',
  description: 'isActive',
  value: '',
  checked: false
}, {
  campo: 'hasDislikes',
  description: 'hasDislikes',
  value: '',
  checked: false
}, {
  campo: 'createdBy',
  description: 'Created By',
  value: '',
  checked: false
}, {
  campo: 'createdAt',
  description: 'Created Date',
  value: '',
  checked: false
}, {
  campo: 'updatedBy',
  description: 'Updated By',
  value: '',
  checked: false
}, {
  campo: 'updatedAt',
  description: 'Updated Date',
  value: '',
  checked: false
}];

  discounts = [{
    campo: 'name',
       description: 'Name',
    value: '',
    checked: false
  }, {
    campo: 'type',
    description: 'type',
    value: '',
    checked: false
  }, {
    campo: 'isReusable',
    description: 'isReusable',
    value: '',
    checked: false
  } ,{
    campo: 'endDate',
    description: 'endDate',
    value: '',
    checked: false
  } ,{
    campo: 'amount',
    description: 'amount',
    value: '',
    checked: false
  } ,{
    campo: 'isActive',
    description: 'isActive',
    value: '',
    checked: false
  }
  ];

  measureUnit = [{
    campo: 'largeUnitShortName',
    description: 'largeUnitShortName',
    value: '',
    checked: false
}, {
  campo: 'largeUnitLongName',
  description: 'largeUnitLongName',
  value: '',
  checked: false
}, {
  campo: 'smallUnitShortName',
  description: 'smallUnitShortName',
  value: '',
  checked: false
}, {
  campo: 'smallUnitLongName',
  description: 'smallUnitLongName',
  value: '',
  checked: false
}, {
  campo: 'numRelation',
  description: 'numRelation',
  value: '',
  checked: false
}, {
  campo: 'isActive',
  description: 'isActive By',
  value: '',
  checked: false
}
];

tax = [{
  campo: 'name',
     description: 'Name',
  value: '',
  checked: false
}, {
  campo: 'percentage',
  description: 'percentage',
  value: '',
  checked: false
}, {
  campo: 'isActive',
  description: 'isActive',
  value: '',
  checked: false
}
];

  constructor(
    address?: {campo,description,value,checked}[],
    ingredients?: {campo,description,value,checked}[],
    meals?: {campo,description,value,checked}[],
    taxDiscounts?: {campo,description,value,checked}[],
    measurements?: {campo,description,value,checked}[]
  )
  {}

  // static fromJson({address,ingredients,meals,taxDiscounts,measurements}): ReportingTypes {
  //     return new ReportingTypes(address,ingredients,meals,taxDiscounts,measurements);
  // }

  // static fromJsonList(ReportingTypes: any): ReportingTypes[] {
  //     return reporting; //.map(MealCategory.fromJson);
  // }

}

export default [ ReportingTypes ]