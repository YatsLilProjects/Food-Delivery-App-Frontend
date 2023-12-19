import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';


import { RestaurantComponent } from './restaurant/restaurant.component';
import { CustomerComponent } from './customer/customer.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { LoginComponent } from './authentication/login/login.component';
import { OrderComponent } from './order/order.component';
import { ConfirmOrderComponent } from './order/confirm-order/confirm-order.component';
import { ShowRestaurantByCriteriaComponent } from './restaurant/show-restaurant-by-criteria/show-restaurant-by-criteria.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { AddRestaurantComponent } from './restaurant/add-restaurant/add-restaurant.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerRouteGuardService } from './service/route-guard-service/customer-route-guard.service';
import { AdminRouteGuardService } from './service/route-guard-service/admin-route-guard.service';
import { ViewAllRestaurantsComponent } from './restaurant/view-all-restaurants/view-all-restaurants.component';
import { OrderSuccessComponent } from './order/order-success/order-success.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';
import { UpdateRestaurantComponent } from './restaurant/update-restaurant/update-restaurant.component';
import { dirtycheckGuard } from './service/route-guard-service/dirtycheck.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [CustomerRouteGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [CustomerRouteGuardService] },
  { path: 'signup', component: SignupComponent,canDeactivate:[dirtycheckGuard]},
  { path: 'logout', component: LogoutComponent },
  { path: 'restaurants/:menuItem', component: RestaurantComponent, canActivate: [CustomerRouteGuardService] },
  { path: 'customers', component: CustomerComponent, canActivate: [AdminRouteGuardService] },
  { path: 'restaurant-by-criteria', component: ShowRestaurantByCriteriaComponent, canActivate: [CustomerRouteGuardService] },
  { path: 'order/:restaurant-name', component: OrderComponent, canActivate: [CustomerRouteGuardService] },
  { path: 'confirm-order', component: ConfirmOrderComponent, canActivate: [CustomerRouteGuardService] },
  { path: 'order-details', component: OrderDetailsComponent, canActivate: [CustomerRouteGuardService] },
  { path: 'add-restaurant', component: AddRestaurantComponent,canDeactivate:[dirtycheckGuard]},
  { path: 'admin-dashboard/:name', component: AdminComponent, canActivate: [AdminRouteGuardService] },
  { path: 'view-restaurants', component: ViewAllRestaurantsComponent, canActivate: [AdminRouteGuardService] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [CustomerRouteGuardService] },
  { path: 'update-restaurant', component: UpdateRestaurantComponent,canDeactivate:[dirtycheckGuard]},
  {path:'update-customer/:customerId',component:UpdateCustomerComponent,canDeactivate:[dirtycheckGuard]},
  { path: '**', component: ErrorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
