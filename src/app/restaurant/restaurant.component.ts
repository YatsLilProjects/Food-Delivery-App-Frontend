import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/Restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  selectedMenuItem: string;
  restaurants: Restaurant[];
  errorMessage: String;
  showErrorMessage: boolean = false;
  selectedRestaurant: Restaurant;
  showOrder: boolean = false;

  constructor(private restaurantService: RestaurantService,
    private router: Router) { }

  ngOnInit(): void {
    const storedUser=localStorage.getItem('selectedMenuItem');
    this.restaurantService.selectedMenuItem = storedUser || null;
    this.findRestaurantsByMenuItemName();
  }

  findRestaurantsByMenuItemName() {
    const selectedMenuItem = this.restaurantService.selectedMenuItem;
    if (selectedMenuItem !== null) {
    this.restaurantService.findRestaurantsByMenuItemName(selectedMenuItem).subscribe({
      next: response => {
        this.restaurants = response.responseData;
      },
      error: error => {
        this.errorMessage = error.error.errMessage;
        this.showErrorMessage = true;
      }
    });
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 2000);
  }
}

  showOrderForm(restaurant: Restaurant) {
    localStorage.setItem('selectedRestaurant',JSON.stringify(restaurant));
    this.router.navigate(['order',restaurant.restaurantName]);
  }


}
