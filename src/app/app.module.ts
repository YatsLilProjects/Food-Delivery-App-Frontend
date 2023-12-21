import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { UpdateRestaurantComponent } from './restaurant/update-restaurant/update-restaurant.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { LoginComponent } from './authentication/login/login.component';
import { AddRestaurantComponent } from './restaurant/add-restaurant/add-restaurant.component';
import { ConfirmOrderComponent } from './order/confirm-order/confirm-order.component';
import { ShowRestaurantByCriteriaComponent } from './restaurant/show-restaurant-by-criteria/show-restaurant-by-criteria.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { AdminComponent } from './admin/admin.component';
import { ViewAllRestaurantsComponent } from './restaurant/view-all-restaurants/view-all-restaurants.component';
import { OrderSuccessComponent } from './order/order-success/order-success.component';
import { UniquePipe } from './service/unique.pipe';
import { MaterialModule } from './material/material.module';
import { DialogToUpdateComponent } from './restaurant/update-restaurant/dialog-to-update/dialog-to-update.component';
import { ShowRestaurantByNameComponent } from './restaurant/show-restaurant-by-name/show-restaurant-by-name.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    ErrorComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    SignupComponent,
    RestaurantComponent,
    UpdateRestaurantComponent,
    CustomerComponent,
    UpdateCustomerComponent,
    OrderComponent,
    AddRestaurantComponent,
    ConfirmOrderComponent,
    ShowRestaurantByCriteriaComponent,
    OrderDetailsComponent,
    AdminComponent,
    ViewAllRestaurantsComponent,
    OrderSuccessComponent,
    UniquePipe,
    DialogToUpdateComponent,
    ShowRestaurantByNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
