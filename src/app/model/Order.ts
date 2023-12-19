import { Customer } from "./Customer";
import { Restaurant } from "./Restaurant";

export class Order{
    orderId:number;
    customer:Customer;
    restaurant:Restaurant;
    totalCost:number;
    orderDate: Date;
    specialInstructions:string[];
    itemList:string[];
    menuItemPriceList:number[]
}