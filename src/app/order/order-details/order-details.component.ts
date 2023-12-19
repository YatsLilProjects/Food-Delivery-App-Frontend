import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/Order';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  uniqueItems: string[];
  showErrorMessage: boolean = false;
  errorMessage: string;
  orders: Order[] = []

  constructor(private orderService: OrderService,
    private customerService: CustomerService) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('loggedInCustomer');
    this.customerService.loggedInCustomer = storedUser ? JSON.parse(storedUser) : null;
    this.viewAllOrdersByCustomerId();
  }

  viewAllOrdersByCustomerId() {
    this.orderService.findOrdersByCustomerId(this.customerService.loggedInCustomer.customerId).subscribe({
      next: response => {
        this.orders = response.responseData;
      },
      error: error => {
        this.showErrorMessage = true;
        this.errorMessage = error.error.errMessage;
      }
    });
    setTimeout(() => {
      this.showErrorMessage = false
    }, 2000)
  }

  countItemOccurrences(order: Order, item: string): number {
    return order.itemList.filter(i => i === item).length;
  }
  
  getUniqueItems(order: Order): string[] {
    return [...new Set(order.itemList)];
  }

}
