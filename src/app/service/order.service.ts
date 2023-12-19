import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../model/Response';
import { environment } from '../environments/environment';
import { FoodCart } from '../model/FoodCart';
import { Order } from '../model/Order';
import { MenuItem } from '../model/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.baseUrl;
  foodCartObject: FoodCart = new FoodCart();
  orderObject: Order = new Order();
  menuItemPrice: number[] = [];
  foodCartId:number;

  foodCartForCustomer:FoodCart=new FoodCart();


  constructor(private http: HttpClient) { }

  calculateTotalPrice(menuItems: string[]): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/calculateTotalPrice/${menuItems}`);
  }

  addItemsToFoodCart(foodCart: FoodCart): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/addItemsToFoodCart`, foodCart);
  }

  checkOrderExists(customerId: number): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/checkOrderExists/${customerId}`);
  }

  addOrderDetails(order: Order): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/addOrder`, order);
  }

  viewAllOrders(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/viewAllOrders`);
  }

  findOrdersByCustomerId(customerId: number): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/ordersByCustomerId/${customerId}`);
  }

  countTotalOrders(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/noOfOrders`);
  }

  findOrderDetailsByMonthAndYear(month: number, year: number) {
    return this.http.get(`${this.baseUrl}/ordersByMonthAndYear/month/${month}/year/${year}`, {
      responseType: 'blob',
    });
  }

  deleteFromCart(foodCartId: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/deleteFoodCart/${foodCartId}`)
  }

  viewCartByCustomerId(customerId:number):Observable<Response>{
    return this.http.get<Response>(`${this.baseUrl}/viewCartByCustomerId/${customerId}`)
  }

  findTotalCartItemsByCustomerId(customerId:number):Observable<Response>{
    const params = new HttpParams().set('customerId',customerId)
    return this.http.get<Response>(`${this.baseUrl}/noOfCartsByCustomerId`,{params})
  }

}
