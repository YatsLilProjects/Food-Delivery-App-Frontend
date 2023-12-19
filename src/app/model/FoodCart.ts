import { Customer } from "./Customer";
import { MenuItem } from "./MenuItem";
import { Restaurant } from "./Restaurant";

export class FoodCart {
    cartId: number;
    restaurant: Restaurant;
    customer: Customer;
    itemList: string[];
    totalCost: number;
}