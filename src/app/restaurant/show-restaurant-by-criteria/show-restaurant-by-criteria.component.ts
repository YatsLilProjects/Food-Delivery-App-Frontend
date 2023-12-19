import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-show-restaurant-by-criteria',
  templateUrl: './show-restaurant-by-criteria.component.html',
  styleUrls: ['./show-restaurant-by-criteria.component.css']
})
export class ShowRestaurantByCriteriaComponent {
  restaurants: Restaurant[] = [];
  errorMessage: String;
  showErrorMessage: boolean = false;

  constructor(private restaurantService: RestaurantService,
    private router: Router) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('restaurantData');
    if (storedUser !== null) {
      this.restaurants = JSON.parse(storedUser) as Restaurant[];
    } else {
      this.restaurants = [];
    }
  }

  showOrderForm(restaurant: Restaurant) {
    localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
    this.router.navigate(['order', restaurant.restaurantName]);
  }
}
