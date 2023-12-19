
import { CuisineTypeData } from "./CuisineTypeData";
import { MenuItem } from "./MenuItem";

export class Restaurant {
    restaurantId: number;
    restaurantName: string;
    restaurantContactNo: string;
    restaurantLocation: string;
    restaurantImage:string;
    cuisineTypeData: CuisineTypeData[]
    menuItems: MenuItem[];
}