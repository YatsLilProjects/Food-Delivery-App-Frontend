import { Restaurant } from "./Restaurant";

export class CuisineTypeData {
    cuisineId:number;
    cuisineType: string;
    restaurants:Restaurant[];
    isCuisineEditMode:boolean;
}