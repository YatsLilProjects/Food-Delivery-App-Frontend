import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';
import { Customer } from 'src/app/model/Customer';
import { CustomerAddress } from 'src/app/model/CustomerAddress';
import { SignUp } from 'src/app/model/SignUp';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements ComponentCanDeactivate {

  customer: Customer;
  successMessage: string;
  errorMessage: string[] = [];
  showSuccessMessage: boolean = false;
  showError: boolean = false;
  isDirty: boolean = false;


  constructor(private customerService: CustomerService,
    private formBuilder: FormBuilder) {
    this.customer = new Customer();
    this.customer.customerAddress = new CustomerAddress();
    this.customer.signUp = new SignUp();
  }

  addCustomerHandler() {
    this.addDataToCustomerObject();
    this.customerService.addCustomer(this.customer).subscribe({
      next: response => {
        this.showSuccessMessage = true;
        this.successMessage = "Registration Successful";
        this.registerForm.reset();
      },
      error: error => {
        this.showError = true;
        this.errorMessage = error.error.errMessage;
      }
    });
    setTimeout(() => {
      this.showSuccessMessage = false
      this.showError = false
    }, 2000)
  }

  canDeactivate(): boolean {
    return !this.isDirty;
  }

  registerForm = this.formBuilder.group({
    name: ["", { validators: [Validators.required, Validators.pattern("^[a-zA-Z]{2,10}$")] }],
    contact: ["", { validators: [Validators.required, Validators.pattern("^\\d{10}$")] }],
    email: ["", { validators: [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")] }],
    city: ["", { validators: [Validators.required, Validators.pattern("^[a-zA-Z\\s-]{2,10}$")] }],
    street: ["", { validators: [Validators.pattern("^[a-zA-Z0-9\\s-]*$")] }],
    pincode: ["", { validators: [Validators.required, Validators.pattern("^\\d{6}$")] }],
    username: ["", { validators: [Validators.required, Validators.pattern("^[a-zA-Z0-9_]{3,10}$")] }],
    password: ["", { validators: [Validators.required, Validators.minLength(8)] }]
  });

  get registerFormControl() {
    return this.registerForm.controls;
  }


  addDataToCustomerObject() {
    const formData = this.registerForm.value;
    this.customer.customerName = formData.name || '';
    this.customer.customerEmailId = formData.email || '';
    this.customer.customerContactNo = formData.contact || '';
    this.customer.customerAddress.customerCity = formData.city || '',
      this.customer.customerAddress.customerStreet = formData.street || '',
      this.customer.customerAddress.customerPinCode = formData.pincode || ''
    this.customer.signUp.username = formData.username || '';
    this.customer.signUp.password = formData.password || '';
  }

}




