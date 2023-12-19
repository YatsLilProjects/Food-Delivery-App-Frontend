import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogIn } from '../model/LogIn';
import { Response } from '../model/Response';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../model/CustomerResponse';
import { environment } from '../environments/environment';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrlPublic;
  constructor(private http: HttpClient,
    private customerService: CustomerService) { }

  customerLogin(logInData: LogIn): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(`${this.baseUrl}/login`, logInData);
  }

  logout() {
    localStorage.removeItem('loggedInCustomer');
    localStorage.removeItem('selectedMenuItem');
    localStorage.removeItem('selectedRestaurant');
    localStorage.removeItem('restaurantData')
  }
 
  isUserLoggedIn(): boolean {
    let user = localStorage.getItem('loggedInCustomer');
    if (user !== null) {
      const loggedInCustomer = JSON.parse(user);     
      if (loggedInCustomer.userType === 'CUSTOMER')     
        return true;
    }
    return false;
  }

  isAdminLoggedIn(): boolean {
    let user = localStorage.getItem('loggedInCustomer');
    if (user !== null) {
      const loggedInCustomer = JSON.parse(user);
      if (loggedInCustomer.userType === 'ADMIN')
        return true;
    }
    return false;
  }
} 
