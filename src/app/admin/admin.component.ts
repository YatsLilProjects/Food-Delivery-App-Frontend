import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { RestaurantService } from '../service/restaurant.service';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminName: string;
  totalOrders: number;
  totalRestaurants: number;
  totalCustomers: number;
  selectedMonth: number;
  selectedYear: number;
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  years = [2022, 2023, 2024];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private restaurantService: RestaurantService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.adminName = this.route.snapshot.params['name'];
    this.fetchTotalOrders();
    this.fetchTotalRestaurants();
    this.fetchTotalCustomers();
  }

  fetchTotalOrders() {
    this.orderService.countTotalOrders().subscribe({
      next: response => {
        this.totalOrders = response.responseData;
      },
      error: error => {
        console.log(error.error.errMessage);
      }
    });
  }

  fetchTotalRestaurants() {
    this.restaurantService.countTotalNoOfRestaurants().subscribe({
      next: response => {
        this.totalRestaurants = response.responseData;
      },
      error: error => {
        console.log(error.error.errMessage);
      }
    });
  }

  fetchTotalCustomers() {
    this.customerService.countTotalNoOfCustomers().subscribe({
      next: response => {
        this.totalCustomers = response.responseData;
      },
      error: error => {
        console.log(error.error.errMessage);
      }
    });
  }
  
  getOrderDetailsByMonthAndYear() {
    this.orderService.findOrderDetailsByMonthAndYear(this.selectedMonth, this.selectedYear).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }


}


