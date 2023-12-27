import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-restaurants',
  templateUrl: './view-all-restaurants.component.html',
  styleUrls: ['./view-all-restaurants.component.css']
})
export class ViewAllRestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = [];
  showLoadDataSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMessage: string[] = [];
  successMessage: string;
  searchItem: string;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number;
  selectedPageSize: number = 5;
  selectedRestaurant: Restaurant;
  showUpdate: boolean = false;
  pageSizeOptions: number[] = [];
  totalNoOfPages: number;
  sortColumn: string = "restaurantName";
  sortOrder: string = "asc";

  constructor(private restaurantService: RestaurantService,
    private router: Router) { }

  ngOnInit() {
    this.viewAllRestaurants();
    this.getTotalPages();
  }

  viewAllRestaurants() {
    this.restaurantService.viewAllRestaurants().subscribe({
      next: response => {
        this.restaurants = response.responseData.slice(0, 5);
        this.showLoadDataSuccessMessage = response.success;
        this.successMessage = 'Restaurant data loaded successfully'
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

  deleteRestaurant(restaurantId: number) {
    this.restaurantService.deleteRestaurant(restaurantId).subscribe({
      next: response => {
        Swal.fire("Restaurant Deleted Successfully")
        this.refreshData();
      },
      error: error => {
        this.errorMessage = error.error.errMessage;
        const arrayAsErrors = this.errorMessage.join(',');
        Swal.fire({
          title: 'Oops! Restaurant Not Deleted.',
          html: `${arrayAsErrors}`,
          icon: 'error'
        });
      }
    });
  }

  showUpdateForm(restaurantId: number) {
    this.showUpdate = !this.showUpdate;
    this.router.navigate(['update-restaurant',restaurantId]);
  }

  refreshData() {
    this.restaurantService.viewAllRestaurants().subscribe({
      next: response => {
        this.restaurants = response.responseData;
      },
      error: error => {
        this.showErrorMessage = true;
        this.errorMessage = error.error.errMessage;
      }
    });
  }

  searchRestaurants() {
    if (this.searchItem) {
      this.restaurantService.searchRestaurants(this.searchItem).subscribe({
        next: response => {
          this.restaurants = response.responseData;
        }
      });
    } else {
      this.viewAllRestaurants();
    }
  }

  getRestaurantsByPages(currentPage: number) {
    this.pageNumber = currentPage;
    this.restaurantService.getRestaurantsByPages(this.pageNumber, this.pageSize, this.sortColumn, this.sortOrder).subscribe({
      next: response => {
        this.restaurants = response.responseData.content;
        this.totalPages = response.responseData.totalPages;
      },
      error: error => {
        this.showErrorMessage = true;
        this.errorMessage = error.error.errMessage;
      }
    });
  }

  onPageSizeChange() {
    this.restaurantService.getRestaurantsByPages(this.pageNumber, this.selectedPageSize, this.sortColumn, this.sortOrder).subscribe({
      next: response => {
        this.restaurants = response.responseData.content;
      },
      error: error => {
        this.showErrorMessage = true;
        this.errorMessage = error.error.errMessage;
      }
    });
  }

  addNewRestaurant() {
    this.router.navigate(['add-restaurant'])
  }

  updatePageSizeOptions() {
    this.pageSizeOptions = Array.from({ length: this.totalNoOfPages }, (_, i) => (i + 1) * 5);
  }

  getTotalPages() {
    this.restaurantService.getRestaurantsByPages(this.pageNumber, this.pageSize, this.sortColumn, this.sortOrder).subscribe({
      next: response => {
        this.totalNoOfPages = response.responseData.totalPages;
        this.updatePageSizeOptions();
      }
    })
  }


  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getRestaurantsByPages(this.pageSizeOptions[0] / 5);
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.getRestaurantsByPages(this.pageSizeOptions[0] / 5);
    }
  }

  sort(column: string) {
    if (!this.sortOrder || this.sortOrder === 'desc') {
      this.sortOrder = 'asc';
    } else {
      this.sortOrder = 'desc';
    }
    this.sortColumn = column;
    this.getRestaurantsByPages(this.pageNumber);
  }

}







