import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IRole } from '../interfaces/entity-interfaces';
import { LoguinServiceService } from '../services/auth/loguin-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authenticationService: LoguinServiceService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    console.warn("entra aki estooooo en el guardian", currentUser)
    if (currentUser) {
      return true;
    }
     this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authenticationService.currentUserValue) {
      return false;
    }
    /* const roles = route.data!.roles as IRole[];
 
     if (!this.authenticationService.hasRole(roles)) {
       return false;
     }*/
    return true;
  }
}
