import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';
import { Customer } from 'src/app/model/Customer';
import { CustomerService } from 'src/app/service/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit, ComponentCanDeactivate {
  customerData: Customer;
  customers: Customer[];
  errorMessage: string[] = [];
  showForm: boolean = true;
  isNameEditMode: boolean;
  isContactEditMode: boolean;
  isEmailEditMode: boolean;
  isAddressEditMode: boolean;
  isUsernameEditMode: boolean;
  isPasswordEditMode: boolean;
  isDirty: boolean;

  constructor(private customerService: CustomerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const customerId = params['customerId'];
      this.customerService.getCustomerById(customerId).subscribe({
        next: response => {
          this.customerData = response.responseData;
        }
      })
    });
  }

  updateCustomer() {
    if (this.customerData) {
      this.customerService.updateCustomer(this.customerData).subscribe({
        next: response => {
          if (response.success) {
            Swal.fire("Profile Updated Successfully!")
            this.isDirty=false;
          }
        },
        error: error => {
          this.errorMessage = error.error.errMessage;
          const arrayAsErrors = this.errorMessage.join(',');
          Swal.fire({
            title: 'Oops! Customer Not Updated.',
            html: `${arrayAsErrors}`,
            icon: 'error'
          });
        }
      });
    }
  }

  toggleEditMode(field: string) {
    if (field === 'name') {
      this.isNameEditMode = !this.isNameEditMode;
    }
    if (field === 'contact') {
      this.isContactEditMode = !this.isContactEditMode;
    }
    if (field === 'email') {
      this.isEmailEditMode = !this.isEmailEditMode;
    }
    if (field === 'address') {
      this.isAddressEditMode = !this.isAddressEditMode;
    }
    if (field === 'username') {
      this.isUsernameEditMode = !this.isUsernameEditMode;
    }
    if (field === 'password') {
      this.isPasswordEditMode = !this.isPasswordEditMode;
    }
  }

  canDeactivate(): boolean {
    return !this.isDirty;
  }

}
