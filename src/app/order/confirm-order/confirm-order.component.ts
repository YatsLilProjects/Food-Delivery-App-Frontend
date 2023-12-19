import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css'],
})
export class ConfirmOrderComponent implements OnInit, AfterViewInit {

  constructor(public orderService: OrderService,
    private router: Router,
    public customerService: CustomerService) { }

  foodCartId: number;
  specialInstruction: string = '';
  specialInstructionsList: string[] = [];
  showOrderSuccess: boolean = false;
  showErrorMessage: boolean = false;
  successMessage: string;
  errorMessage: string;
  customerId: number;


  ngOnInit() {
    const storedUser = localStorage.getItem('loggedInCustomer');
    this.customerService.loggedInCustomer = storedUser ? JSON.parse(storedUser) : null;
    this.customerId = this.customerService.loggedInCustomer.customerId;
    this.viewCartByCustomerId();
  }

  ngAfterViewInit() {
    this.updateUniqueItems();
  }

  addOrder() {
    this.orderService.orderObject.customer = this.orderService.foodCartObject.customer;
    this.orderService.orderObject.itemList = this.orderService.foodCartObject.itemList;
    this.orderService.orderObject.restaurant = this.orderService.foodCartObject.restaurant;
    this.orderService.orderObject.totalCost = this.orderService.foodCartObject.totalCost;
    this.orderService.orderObject.specialInstructions = this.specialInstructionsList;
    this.orderService.orderObject.menuItemPriceList = this.orderService.menuItemPrice;
    this.orderService.addOrderDetails(this.orderService.orderObject).subscribe({
      next: response => {
        this.showOrderSuccess = true;
        this.successMessage = 'Order Placed Successfully';
        this.orderService.foodCartObject.itemList = [];
        this.orderService.foodCartObject.totalCost = 0;
        this.specialInstructionsList = [];
        this.router.navigate(['order-success']);
      },
      error: error => {
        this.showErrorMessage = true;
        this.errorMessage = error.error.errMessage;
      }
    })
    setTimeout(() => {
      this.showOrderSuccess = false
      this.showErrorMessage = false
    }, 2000)
  }

  addSpecialInstructions() {
    if (this.specialInstruction) {
      this.specialInstructionsList.push(this.specialInstruction);
      this.specialInstruction = '';
    }
  }

  deleteFromCart() {
    this.orderService.deleteFromCart(this.orderService.foodCartObject.cartId).subscribe({
      next: response => {
        this.orderService.foodCartObject.itemList = [];
        this.orderService.foodCartObject.totalCost = 0;
        this.specialInstructionsList = [];
        this.router.navigate(['confirm-order']);
      },
      error: error => {
        console.log(error.error.errMessage)
      }
    })
  }

  countItemOccurrences(item: string): number {
    return this.orderService.foodCartObject.itemList.filter(i => i === item).length;
  }
  uniqueItems = Array.from(new Set(this.orderService.foodCartObject.itemList));


  private updateUniqueItems() {
    this.uniqueItems = Array.from(new Set(this.orderService.foodCartObject.itemList));
  }

  viewCartByCustomerId() {
    this.orderService.viewCartByCustomerId(this.customerService.loggedInCustomer.customerId).subscribe({
      next: response => {
        this.orderService.foodCartObject = response.responseData;
      },
      error: error => {
        this.orderService.foodCartObject.itemList = [];
      }
    })
  }

}


