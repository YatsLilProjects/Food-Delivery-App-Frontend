import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';
import { CuisineTypeData } from 'src/app/model/CuisineTypeData';
import { MenuItem } from 'src/app/model/MenuItem';
import { Restaurant } from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit, ComponentCanDeactivate {
  restaurants: Restaurant[];
  listOfCuisineTypes: string[] = [];

  isNameEditMode: boolean = false;
  isContactEditMode: boolean = false;
  isLocationEditMode: boolean = false;

  cuisineTypes: CuisineTypeData[];

  selectedCuisineObjects: CuisineTypeData[];
  selectedCuisineIds: number[] = [];

  menuItemName: string = '';
  menuItemPrice: number = 0;
  menuItemDesc: string = '';
  menuItemType: boolean = false;
  menuItemImage: string = '';

  errorMessage: string[] = [];
  isDirty: boolean = false;
  editForm: FormGroup;
  selectedFile: string;


  constructor(public restaurantService: RestaurantService) { }

  ngOnInit() {
    this.viewAllCuisineTypes();
    const storedRestaurant = localStorage.getItem('selectedRestaurant');
    this.restaurantService.selectedRestaurant = storedRestaurant ? JSON.parse(storedRestaurant) : null
  }

  updateRestaurant() {
    this.storeCuisineType();
    if (!this.restaurantService.selectedRestaurant.cuisineTypeData || this.restaurantService.selectedRestaurant.cuisineTypeData.length === 0) {
      Swal.fire({
        title: 'Oops! Restaurant Not Updated.',
        html: 'You need to add at least one cuisine type.',
        icon: 'error'
      });
    } else if (!this.restaurantService.selectedRestaurant.menuItems || this.restaurantService.selectedRestaurant.menuItems.length === 0) {
      Swal.fire({
        title: 'Oops! Restaurant Not Updated.',
        html: 'You need to add at least one menu item.',
        icon: 'error'
      });
    }
    else {
      this.restaurantService.updateRestaurant(this.restaurantService.selectedRestaurant).subscribe({
        next: response => {
          if (response.success) {
            Swal.fire("Restaurant Updated!");
            this.isDirty = false;
          }
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
    }
  }

  toggleEditMode(field: string) {
    if (field === 'name') {
      this.isNameEditMode = !this.isNameEditMode;
    }
    if (field === 'contact') {
      this.isContactEditMode = !this.isContactEditMode;
    }
    if (field === 'location') {
      this.isLocationEditMode = !this.isLocationEditMode;
    }
  }


  removeCuisine(index: number) {
    if (index >= 0 && index < this.restaurantService.selectedRestaurant.cuisineTypeData.length) {
      this.restaurantService.selectedRestaurant.cuisineTypeData.splice(index, 1);
    }
  }

  toggleEditModeForMenu(index: number) {
    if (index >= 0 && index < this.restaurantService.selectedRestaurant.menuItems.length) {
      this.restaurantService.selectedRestaurant.menuItems[index].isMenuEditMode = !this.restaurantService.selectedRestaurant.menuItems[index].isMenuEditMode;
    }
  }

  removeMenu(index: number) {
    if (index >= 0 && index < this.restaurantService.selectedRestaurant.menuItems.length) {
      this.restaurantService.selectedRestaurant.menuItems.splice(index, 1);
    }
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

  getCuisineObjects() {
    this.selectedCuisineObjects = this.selectedCuisineIds.map(selectedCuisineId => {
      let selectedCuisine = this.cuisineTypes.find(cuisine => cuisine.cuisineId == selectedCuisineId);
      return selectedCuisine ? selectedCuisine : { cuisineId: 0, cuisineType: '', restaurants: [], isCuisineEditMode: false };
    });
  }

  storeCuisineType() {
    this.getCuisineObjects();
    for (const selectedCuisine of this.selectedCuisineObjects) {
      const exists = this.restaurantService.selectedRestaurant.cuisineTypeData.some(
        cuisine => cuisine.cuisineType === selectedCuisine.cuisineType
      );
      if (!exists) {
        this.restaurantService.selectedRestaurant.cuisineTypeData.push(selectedCuisine);
      }
    }
  }

  storeMenu(menuItemName: string, menuItemPrice: number, menuItemDesc: string, menuItemType: boolean) {
    const existingItem = this.restaurantService.selectedRestaurant.menuItems.find(item => item.menuItemName === menuItemName);
    if (existingItem) {
      Swal.fire("Oops! This Menu Item Already Exists");
    }
    else {
      const menuItem: MenuItem = new MenuItem();
      menuItem.menuItemName = menuItemName;
      menuItem.menuItemPrice = menuItemPrice;
      menuItem.menuItemDesc = menuItemDesc;
      menuItem.menuItemImage = this.selectedFile;
      menuItem.vegeterian = menuItemType;

      this.restaurantService.selectedRestaurant.menuItems.push(menuItem);
      this.menuItemName = '';
      this.menuItemPrice = 0;
      this.menuItemDesc = '';
      this.menuItemType = false;
      this.menuItemImage = '';
      Swal.fire("Menu Item Added. Add More..");
    }
  }

  canDeactivate(): boolean {
    return !this.isDirty;
  }

  onRestaurantImageSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        this.restaurantService.selectedRestaurant.restaurantImage = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  }

  onMenuItemImageSelected(event: any, index: number): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        this.restaurantService.selectedRestaurant.menuItems[index].menuItemImage = imageUrl;
        this.isDirty = true;
      };
      reader.readAsDataURL(file);
    }
  }

  onMenuItemImageSelectedForOne(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFile = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }



}




