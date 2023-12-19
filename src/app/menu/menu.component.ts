import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/Restaurant';
import { Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';
import { tap } from 'rxjs';
import { LoginService } from '../service/login.service';
import { OrderService } from '../service/order.service';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cuisineType: string | null;
  restaurantName: string | null;
  restaurantLocation: string | null;
  restaurants: Restaurant[];
  searchItem: any;
  showSearchSuccess: boolean = false;
  successMessage: string;
  showErrorMessage: boolean = false;
  errorMessage: string;
  customerId: number;
  totalNoOfCarts: number;
  customerName: string;

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    public logInService: LoginService,
    private orderService: OrderService,
    public customerService: CustomerService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInCustomer');
    if (storedUser) {
        this.customerService.loggedInCustomer = JSON.parse(storedUser);
        this.customerId = this.customerService.loggedInCustomer.customerId;
        this.customerName = this.customerService.loggedInCustomer.customerName;
        this.viewTotalCartItemsByCustomerId();
    }
}

  findRestaurantsByCriteria() {
    if (this.searchItem.length > 0) {
      this.viewAllRestaurants().subscribe(() => {
        this.filterRestaurants();
        this.restaurantService.findRestaurantsByCriteria(this.cuisineType, this.restaurantLocation, this.restaurantName).subscribe(
          (response) => {
            localStorage.setItem('restaurantData', JSON.stringify(response.responseData))
            this.router.navigate(['restaurant-by-criteria']);
          },
          (error) => {
            this.errorMessage = error.error.errMessage;
          });
        this.router.navigate(['restaurant-by-criteria']);
      });
      setTimeout(() => {
        this.showSearchSuccess = false;
        this.showErrorMessage = false;
      }, 2000);
    }
  }

  viewAllRestaurants() {
    return this.restaurantService.viewAllRestaurants().pipe(
      tap(response => {
        this.restaurants = response.responseData;
      })
    );
  }

  filterRestaurants() {
    const listOfRestaurantLocations = this.restaurants.filter(restaurant => restaurant.restaurantLocation === this.searchItem);
    const listOfRestaurantNames = this.restaurants.filter(restaurant => restaurant.restaurantName === this.searchItem);
    const listOfCuisineType = this.restaurants.filter(restaurant =>
      restaurant.cuisineTypeData.some(cuisineType =>
        cuisineType.cuisineType === this.searchItem
      )
    );
    this.restaurantName = listOfRestaurantNames.length > 0 ? this.searchItem : null;
    this.cuisineType = listOfCuisineType.length > 0 ? this.searchItem : null;
    this.restaurantLocation = listOfRestaurantLocations.length > 0 ? this.searchItem : null;
  }

  viewTotalCartItemsByCustomerId() {
    this.orderService.findTotalCartItemsByCustomerId(this.customerId).subscribe({
      next: response => {
        this.totalNoOfCarts = response.responseData;
      },
      error: error => {
        console.log(error.error.errMessage);
      }
    })
  }

  routeToCustomerprofile()
  {
    this.router.navigate(['/update-customer/',this.customerId])
  }


}
