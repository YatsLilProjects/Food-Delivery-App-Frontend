import { ActivatedRouteSnapshot, CanDeactivate, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';

export const dirtycheckGuard: CanDeactivateFn<ComponentCanDeactivate>
  = (component: ComponentCanDeactivate) => {
    if (component.canDeactivate()) {
      return true;
    }
    else {
      return confirm("You have unsaved changes! Do you really want to go?")
    }
  };