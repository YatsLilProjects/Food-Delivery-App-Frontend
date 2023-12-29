import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/model/MenuItem';
import { Restaurant } from 'src/app/model/Restaurant';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-show-restaurant-by-name',
  templateUrl: './show-restaurant-by-name.component.html',
  styleUrls: ['./show-restaurant-by-name.component.css']
})
export class ShowRestaurantByNameComponent implements OnInit {


  quantity: number = 0;
  selectedMenuItem: string;
  selectedMenuItemPrice: number;
  foodCart: string[] = [];
  totalPrice: any;
  isProcessingAddItemsToCart: boolean = false;
  errorMessage: string[] = [];
  restaurantTime: string = "Open Now: 9am - 10pm (Today)";
  isScrolled: boolean = false;
  menuItemList: MenuItem[] = []
  menuItemName: string;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 65;
  }

  moreInfo: String[] = [
    'Breakfast',
    'Home Delivery',
    'Takeaway Available',
    'Indoor Seating'
  ];

  constructor(private route: ActivatedRoute,
    public restaurantService: RestaurantService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const restaurantName = params['restaurantName'];
      this.restaurantService.selectedRestaurant = new Restaurant();
      this.restaurantService.getRestaurantByName(restaurantName).subscribe({
        next: response => {
          this.restaurantService.selectedRestaurant = response.responseData;
          this.menuItemList = this.restaurantService.selectedRestaurant.menuItems;
        },
        error: error => {
          this.errorMessage = error.error.errMessage;
          const arrayAsErrors = this.errorMessage.join(',');
          Swal.fire({
            title: 'Oops! Restaurant Not Found.',
            html: `${arrayAsErrors}`,
            icon: 'error'
          });
        }
      })
    });
  }

  onMenuItemSelect(menuItem: MenuItem) {
    menuItem.quantity = (menuItem.quantity || 0) + 1;
    this.quantity++;
    this.selectedMenuItem = menuItem.menuItemName;
    this.selectedMenuItemPrice = menuItem.menuItemPrice;
    if (this.foodCart) {
      this.foodCart.push(this.selectedMenuItem);
    }
    if (this.orderService.menuItemPrice) {
      this.orderService.menuItemPrice.push(this.selectedMenuItemPrice);
    }
    this.selectedMenuItem = '';
  }


  onMenuItemDeSelect(menuItem: MenuItem) {
    this.quantity--;
    if (menuItem.quantity > 0) {
      menuItem.quantity--;
      this.foodCart.pop();
    }
    this.selectedMenuItem = '';
  }

  calculateTotalPrice() {
    this.orderService.calculateTotalPrice(this.foodCart).subscribe({
      next: response => {
        this.totalPrice = response.responseData;
        this.processAddItemsToCart();
      }
    });
  }

  addItemsToFoodCart() {
    this.isProcessingAddItemsToCart = true;
    if (this.isProcessingAddItemsToCart) {
      this.calculateTotalPrice();
    }
  }

  processAddItemsToCart() {
    if (this.isProcessingAddItemsToCart) {
      this.isProcessingAddItemsToCart = false;
      this.orderService.foodCartObject.customer = this.customerService.loggedInCustomer;
      this.orderService.foodCartObject.totalCost = this.totalPrice;
      this.orderService.foodCartObject.itemList = this.foodCart;
      this.orderService.foodCartObject.restaurant = this.restaurantService.selectedRestaurant;
      this.orderService.addItemsToFoodCart(this.orderService.foodCartObject).subscribe({
        next: response => {
          this.orderService.foodCartObject = response.responseData;
          this.router.navigate(['confirm-order'])
        },
        error: error => {
          this.errorMessage = error.error.errMessage;
          const arrayAsErrors = this.errorMessage.join(',');
          Swal.fire({
            title: 'Oops! Items Not Added In Cart!',
            html: `${arrayAsErrors}`,
            icon: 'error'
          });
        }
      });
    }
  }

  findByMenuItemName() {
    if (this.menuItemName.trim() === '') {
      this.menuItemList = this.restaurantService.selectedRestaurant.menuItems;
    } else {
      this.restaurantService.findByMenuItemNameAndRestaurantName(this.menuItemName, this.restaurantService.selectedRestaurant.restaurantName).subscribe({
        next: response => {
          this.menuItemList = response.responseData;
        },
        error: error => {
          this.errorMessage = error.error.errMessage;
          const arrayAsErrors = this.errorMessage.join(',');
          Swal.fire(`${arrayAsErrors}`);
        }
      });
    }
  }

  onCheckboxChange(event: any): void {
    if (event.target.checked) {
      this.restaurantService.findVegMenus(this.restaurantService.selectedRestaurant.restaurantName).subscribe({
        next: response => {
          this.menuItemList = response.responseData;
        },
        error: error => {
          this.errorMessage = error.error.errMessage;
          const arrayAsErrors = this.errorMessage.join(',');
          Swal.fire(`${arrayAsErrors}`);
        }
      })
    } else {
      this.menuItemList = this.restaurantService.selectedRestaurant.menuItems;
    }
  }




}
