export interface ListIngredientsResponse {
    meals: Ingredient[];
}

export interface Ingredient {
    idIngredient: string;
    strIngredient: string;
    strDescription: string;
    strType: string;
    strThumb: string;
}