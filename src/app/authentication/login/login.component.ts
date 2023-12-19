import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerResponse } from 'src/app/model/CustomerResponse';
import { LogIn } from 'src/app/model/LogIn';
import { CustomerService } from 'src/app/service/customer.service';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  invalidLogin = false;
  logInData: LogIn = new LogIn();



  constructor(
    private route: Router,
    private logInService: LoginService) { }

  ngOnInit(): void { }

  handleLogin() {
    this.logInService.customerLogin(this.logInData).subscribe({
      next: (response: CustomerResponse) => {
        this.invalidLogin = false;
        if (response.customer.userType === 'CUSTOMER') {
          this.route.navigate(['welcome']);
        }
        else {
          this.route.navigate(['admin-dashboard', this.logInData.username]);
        }
        localStorage.setItem('loggedInCustomer', JSON.stringify(response.customer));
      },
      error: error => {
        this.invalidLogin = true;
        this.errorMessage = error.error.errMessage;
      }
    });
  }



}
