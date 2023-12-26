import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';
import { CuisineTypeData } from 'src/app/model/CuisineTypeData';
import { MenuItem } from 'src/app/model/MenuItem';
import { Restaurant } from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';
import Swal from 'sweetalert2';
import { DialogToUpdateComponent } from '../update-restaurant/dialog-to-update/dialog-to-update.component';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit, ComponentCanDeactivate {

  constructor(private restaurantService: RestaurantService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.viewAllCuisineTypes();
  }

  restaurant: Restaurant = new Restaurant()
  message: string;
  errorMessage: string[] = [];
  showCuisineTypeAdded: boolean = false;
  showCuisineAlreadyAdded: boolean = false;
  showMenuAdded: boolean = false;
  showMenuAlreadyAdded: boolean = false;
  menuItemName: string = '';
  menuItemPrice: number = 0;
  menuItemDesc: string = '';
  menuItemType: boolean = false;
  menuItemImage: string = '';
  isDirty: boolean = false;

  cuisineTypes: CuisineTypeData[];
  selectedCuisine: CuisineTypeData;

  tempCuisineIds: number[] = [];
  selectedCuisineObjects: CuisineTypeData[];
  selectedCuisineIds: number[] = [];
  selectedFile: string | ArrayBuffer | null | undefined = undefined;
  selectedMenuFile: string;
  showUpdateInput = false;

  restaurantId: number;

  addRestaurant() {
    this.getCuisineObjects();
    this.storeCuisineType();
    this.restaurantService.addRestaurant(this.restaurant).subscribe({
      next: response => {
        this.restaurantId = response.responseData.restaurantId;
        Swal.fire({
          title: 'Congratulations!! <br> Restaurant Added Successfully.',
          html: `Your restaurant id is ${this.restaurantId}.<br>You can use this id in future to update it's details.`,
          icon: 'success'
        });
      },
      error: error => {
        this.errorMessage = error.error.errMessage;
        const arrayAsErrors = this.errorMessage.join(',');
        Swal.fire({
          title: 'Oops! Restaurant Not Updated.',
          html: `${arrayAsErrors}`,
          icon: 'error'
        });
      }
    });
    setTimeout(() => {
      this.restaurant = new Restaurant()
    }, 2000)
  }


  storeCuisineType() {
    this.getCuisineObjects();
    if (!this.restaurant.cuisineTypeData) {
      this.restaurant.cuisineTypeData = [];
    }
    for (const selectedCuisine of this.selectedCuisineObjects) {
      this.restaurant.cuisineTypeData.push(selectedCuisine);
    }
  }

  storeMenu(menuItemName: string, menuItemPrice: number, menuItemDesc: string, menuItemType: boolean) {
    if (!this.restaurant.menuItems) {
      this.restaurant.menuItems = [];
    }
    const existingItem = this.restaurant.menuItems.find(item => item.menuItemName === menuItemName);
    if (existingItem) {
      this.showMenuAlreadyAdded = true;
      this.message = 'This menu item already exists';
    }
    else {
      const menuItem: MenuItem = new MenuItem();
      menuItem.menuItemName = menuItemName;
      menuItem.menuItemPrice = menuItemPrice;
      menuItem.menuItemDesc = menuItemDesc;
      menuItem.menuItemImage = this.selectedMenuFile;
      menuItem.vegeterian = menuItemType;

      this.restaurant.menuItems.push(menuItem);
      this.showMenuAdded = true;
      this.message = 'Added';
    }
    setTimeout(() => {
      this.showMenuAlreadyAdded = false;
      this.showMenuAdded = false;
    }, 1000);
  }

  viewAllCuisineTypes() {
    this.restaurantService.viewAllCuisineTypes().subscribe({
      next: response => {
        this.cuisineTypes = response.responseData;
        this.cuisineTypes.sort((a, b) => a.cuisineType.localeCompare(b.cuisineType));
      },
      error: error => {
        console.log(error.error.errMessage)
      }
    })
  }

  getObject(event: any) {
    let selectedCuisineId = event.target.value;
    if (this.tempCuisineIds.includes(selectedCuisineId)) {
      this.showCuisineAlreadyAdded = true;
      this.message = 'Selected cuisine type already added';
    } else {
      this.showCuisineTypeAdded = true;
      this.message = 'Added';
      this.tempCuisineIds.push(selectedCuisineId);
    }
    setTimeout(() => {
      this.showCuisineTypeAdded = false;
      this.showCuisineAlreadyAdded = false;
    }, 1000);
  }

  getCuisineObjects() {
    this.selectedCuisineObjects = this.selectedCuisineIds.map(selectedCuisineId => {
      let selectedCuisine = this.cuisineTypes.find(cuisine => cuisine.cuisineId == selectedCuisineId);
      return selectedCuisine ? selectedCuisine : { cuisineId: 0, cuisineType: '', restaurants: [], isCuisineEditMode: false };
    });
  }

  canDeactivate(): boolean {
    return !this.isDirty;
  }


  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFile = e.target?.result;
        this.restaurant.restaurantImage = this.selectedFile as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onMenuItemImageSelectedForOne(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedMenuFile = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  openDialog() {
    this.dialog.open(DialogToUpdateComponent, {
      width: '400px',
      height: '200px'
    });
  }

}







