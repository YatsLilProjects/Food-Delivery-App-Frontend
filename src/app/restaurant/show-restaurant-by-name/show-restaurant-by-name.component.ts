import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { Tile } from 'src/app/tile';

@Component({
  selector: 'app-show-restaurant-by-name',
  templateUrl: './show-restaurant-by-name.component.html',
  styleUrls: ['./show-restaurant-by-name.component.css']
})
export class ShowRestaurantByNameComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public restaurantService: RestaurantService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const restaurantName = params['restaurantName'];
      this.restaurantService.getRestaurantByName(restaurantName).subscribe({
        next: response => {
          this.restaurantService.selectedRestaurant = response.responseData;
        }
      })
    });
  }


}
