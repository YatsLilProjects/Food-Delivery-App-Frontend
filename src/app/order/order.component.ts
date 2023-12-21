import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Restaurant } from "../model/Restaurant";
import { OrderService } from "../service/order.service";
import { RestaurantService } from "../service/restaurant.service";
import { Router } from "@angular/router";
import { CustomerService } from "../service/customer.service";
import { MenuItem } from "../model/MenuItem";
import { FoodCart } from "../model/FoodCart";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

 
  foodCart: string[] = [];
  totalPrice: any;
  showErrorMessage: boolean = false;
  errorMessage: string;
  selectedMenuItem: string;
  isProcessingAddItemsToCart: boolean = false;
  showAlreadyExists: boolean = false;
  selectedMenuItemPrice: number;
  quantity: number = 0


  constructor(private orderService: OrderService,
    public restaurantService: RestaurantService,
    private router: Router,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('loggedInCustomer');
    this.customerService.loggedInCustomer = storedUser ? JSON.parse(storedUser) : null;
    const storedRestaurant=localStorage.getItem('selectedRestaurant');
    this.restaurantService.selectedRestaurant=storedRestaurant?JSON.parse(storedRestaurant) : null;
  }

  onMenuItemSelect(menuItem: MenuItem) {
    menuItem.quantity = (menuItem.quantity || 0) + 1;
    this.quantity++;
    this.selectedMenuItem = menuItem.menuItemName;
    this.selectedMenuItemPrice = menuItem.menuItemPrice;
    if (this.foodCart) {
      this.foodCart.push(this.selectedMenuItem);
    }
    if (this.orderService.menuItemPrice) {
      this.orderService.menuItemPrice.push(this.selectedMenuItemPrice);
    }
    this.selectedMenuItem = '';
  }

  onMenuItemDeSelect(menuItem: MenuItem) {
    this.quantity--;
    if (menuItem.quantity > 0) {
      menuItem.quantity--;
      this.foodCart.pop();
    }
    this.selectedMenuItem = '';
  }

  calculateTotalPrice() {
    this.orderService.calculateTotalPrice(this.foodCart).subscribe({
      next: response => {
        this.totalPrice = response.responseData;
        this.processAddItemsToCart();
      }
    });
  }

  addItemsToFoodCart() {
    this.isProcessingAddItemsToCart = true;
    if (this.isProcessingAddItemsToCart) {
      this.calculateTotalPrice();
    }
  }

  processAddItemsToCart() {
    if (this.isProcessingAddItemsToCart) {
      this.isProcessingAddItemsToCart = false;
      this.orderService.foodCartObject.customer = this.customerService.loggedInCustomer;
      this.orderService.foodCartObject.totalCost = this.totalPrice;
      this.orderService.foodCartObject.itemList = this.foodCart;
      this.orderService.foodCartObject.restaurant = this.restaurantService.selectedRestaurant;
      this.orderService.addItemsToFoodCart(this.orderService.foodCartObject).subscribe({
        next: response => {
          this.orderService.foodCartObject = response.responseData;
          this.router.navigate(['confirm-order'])
        },
        error: error => {
          this.showErrorMessage = true;
          this.errorMessage = error.error.errMessage;
        }
      });
    }
  }
}















