import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerRouteGuardService implements CanActivate {

  constructor(private logInService: LoginService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.logInService.isUserLoggedIn())
      return true;
    else
      this.router.navigate(['/login']);
    return false;
  }
}
