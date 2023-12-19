import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/Customer';
import { TopBrand } from '../model/TopBrand';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  welcomeMessage: String = "Welcome to Mumbai's Best Food";
  username: String;
  customer: Customer;
  topBrandList: TopBrand[] = [];

  constructor(private restaurantService: RestaurantService,
    private router: Router) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInCustomer');
    this.customer = storedUser ? JSON.parse(storedUser) : null;
    this.username = this.customer.customerName;
    this.getAllTopBrands();
  }

  onMenuItemBtnClick(menuName: string) {
    localStorage.setItem('selectedMenuItem', menuName);
    this.router.navigate(['restaurants', menuName]);
  }

  getAllTopBrands() {
    this.restaurantService.viewAllTopBrands().subscribe({
      next: response => {
        this.topBrandList = response.responseData;
      },
      error: error => {
        console.log(error.error.errMessage);
      }
    })
  }


}
