import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer } from '../model/Customer';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../model/Response';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  loggedInCustomer: Customer;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  addCustomer(Customer: Customer): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/addCustomer`, Customer);
  }

  viewAllCustomers(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/viewAllCustomers`);
  }

  deleteCustomer(customerId: Number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/${customerId}`);
  }

  updateCustomer(customerData: Customer): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/updateCustomer`, customerData);
  }

  searchCustomers(searchTerm: string): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/searchCustomers/${searchTerm}`);
  }

  getCustomersByPages(pageNumber: number, pageSize: number, sortColumn: string, sortOrder: string): Observable<Response> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortOrder', sortOrder);
    return this.http.get<Response>(`${this.baseUrl}/getCustomersByPages`, { params });
  }

  countTotalNoOfCustomers(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/noOfCustomers`);
  }

  getTotalPages(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/getTotalPagesOfCustomer`);
  }

  getCustomerById(customerId: number): Observable<Response> {
    const params = new HttpParams().set('customerId', customerId);
    return this.http.get<Response>(`${this.baseUrl}/getCustomerById`, { params });
  }

}
