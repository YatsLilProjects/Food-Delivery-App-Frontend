import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/Restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  selectedMenuItem: string;
  restaurants: Restaurant[];
  errorMessage: string[] = [];
  selectedRestaurant: Restaurant;
  showOrder: boolean = false;

  constructor(private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedMenuItem = params['menuItem'];
    });
    this.findRestaurantsByMenuItemName();
  }

  findRestaurantsByMenuItemName() {
    this.restaurantService.findRestaurantsByMenuItemName(this.selectedMenuItem).subscribe({
      next: response => {
        this.restaurants = response.responseData;
      },
      error: error => {
        this.errorMessage = error.error.errMessage;
        const arrayAsErrors = this.errorMessage.join(',');
        Swal.fire({
          title: 'Oops! Restaurants Not Found.',
          html: `${arrayAsErrors}`,
          icon: 'error'
        });
      }
    });
  }

  showOrderForm(restaurant: Restaurant) {
    this.router.navigate(['order', restaurant.restaurantName]);
  }


}
