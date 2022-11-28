import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthQuard implements CanActivate{
  constructor(
    private auth: AuthService,
    private route: Router
    ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.auth.isAuthentificated()){
      return true
    } else {
      this.auth.logout()
      this.route.navigate(['/admin', 'login'], {
      queryParams: {
        loginAgain: true
       }
      })
      return false
    }
  }

}
