import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  welcomeMessage: String = "Welcome to Mumbai's Best Food";
  username: String;
  customer: Customer;

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInCustomer');
    this.customer = storedUser ? JSON.parse(storedUser) : null;
    this.username = this.customer.customerName;
  }

  onMenuItemBtnClick(menuName: string) {
    localStorage.setItem('selectedMenuItem',menuName);
    this.router.navigate(['restaurants', menuName]);
  }

}
