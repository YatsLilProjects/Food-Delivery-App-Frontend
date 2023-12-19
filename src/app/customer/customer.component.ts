import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../model/Customer';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  showUpdate: boolean = false;
  showDeleteSuccess: boolean = false;
  showLoadDataSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMessage: string[] = [];
  successMessage: string;
  searchItem: string;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number;
  selectedPageSize: number = 5;
  pageSizeOptions: number[] = [];
  totalNoOfPages: number;
  sortColumn: string = "customerName";
  sortOrder: string = "asc";


  constructor(private customerService: CustomerService,
    private router: Router) { }

  ngOnInit() {
    this.viewAllCustomers();
    this.getTotalPages();
  }


  viewAllCustomers() {
    this.customerService.viewAllCustomers().subscribe({
      next: response => {
        this.customers = response.responseData.slice(0, 5);
        this.showLoadDataSuccessMessage = response.success;
        this.successMessage = 'Customer data loaded successfully'
      },
      error: error => {
        this.showErrorMessage = true;
        this.errorMessage = error.error.errMessage;
      }
    });
    setTimeout(() => {
      this.showLoadDataSuccessMessage = false
      this.showErrorMessage = false
    }, 2000)
  }

  deleteCustomer(customerId: Number) {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: response => {
        Swal.fire("Customer Deleted Successfully")
        this.refreshData();
      },
      error: error => {
        this.errorMessage = error.error.errMessage;
        const arrayAsErrors = this.errorMessage.join(',');
        Swal.fire({
          title: 'Oops! Customer Not Deleted.',
          html: `${arrayAsErrors}`,
          icon: 'error'
        });
      }
    });
  }

  showUpdateForm(customer: Customer) {
    this.showUpdate = !this.showUpdate
    this.router.navigate(['/update-customer', customer.customerId]);
  }


  refreshData() {
    this.customerService.viewAllCustomers().subscribe({
      next: response => {
        this.customers = response.responseData;
      },
      error: error => {
        this.showErrorMessage = true;
        this.errorMessage = error.error.errMessage;
      }
    });
  }

  searchCustomers() {
    if (this.searchItem) {
      this.customerService.searchCustomers(this.searchItem).subscribe({
        next: response => {
          this.customers = response.responseData;
        }
      });
    } else {
      this.viewAllCustomers();
    }
  }

  getCustomersByPages(currentPage: number) {
    this.pageNumber = currentPage;
    this.customerService.getCustomersByPages(this.pageNumber, this.pageSize, this.sortColumn, this.sortOrder).subscribe({
      next: response => {
        this.customers = response.responseData.content;
        this.totalPages = response.responseData.totalPages;
      },
      error: error => {
        this.showErrorMessage = true;
        this.errorMessage = error.error.errMessage;
      }
    });
  }

  onPageSizeChange() {
    this.customerService.getCustomersByPages(this.pageNumber, this.selectedPageSize, this.sortColumn, this.sortOrder).subscribe({
      next: response => {
        this.customers = response.responseData.content;
      },
      error: error => {
        this.showErrorMessage = true;
        this.errorMessage = error.error.errMessage;
      }
    });
  }

  addNewCustomer() {
    this.router.navigate(['signup']);
  }

  updatePageSizeOptions() {
    this.pageSizeOptions = Array.from({ length: this.totalNoOfPages }, (_, i) => (i + 1) * 5);
  }

  getTotalPages() {
    this.customerService.getCustomersByPages(this.pageNumber, this.pageSize, this.sortColumn, this.sortOrder).subscribe({
      next: response => {
        this.totalNoOfPages = response.responseData.totalPages;
        this.updatePageSizeOptions();
      }
    })
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getCustomersByPages(this.pageSizeOptions[0] / 5);
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.getCustomersByPages(this.pageSizeOptions[0] / 5);
    }
  }

  sort(column: string) {
    if (!this.sortOrder || this.sortOrder === 'desc') {
      this.sortOrder = 'asc';
    } else {
      this.sortOrder = 'desc';
    }
    this.sortColumn = column;
    this.getCustomersByPages(this.pageNumber);
  }

}

