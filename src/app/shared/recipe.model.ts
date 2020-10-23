import { IngredientModel } from './ingredient.model';
export class RecipeModel{
    public name : string;
    public description : string;
    public imagePath : string;
    public ingredients : IngredientModel[];

    constructor(name : string , desc :string , imagepath : string, ing : IngredientModel[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imagepath;
        this.ingredients = ing;
    }
}