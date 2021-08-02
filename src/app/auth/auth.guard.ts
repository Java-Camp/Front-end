import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { AuthorizationService } from "./authorization.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthorizationService, private router:Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isLoggedIn()) {
      // this.router.navigate(['/main']);
      return this.auth.isLoggedIn();
    }else {
      this.router.navigate(['/sign-in'], {
          queryParams: {
            return: '/accounts'
            //state.url
          }
        });
      return !this.auth.isLoggedIn();
    }
  }
}
