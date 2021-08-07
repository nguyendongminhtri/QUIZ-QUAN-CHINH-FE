import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  admin: any = ["ADMIN"];
  constructor(private tokenService: TokenService,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.tokenService.getToken()){
      if(JSON.stringify(this.tokenService.getRoles())==JSON.stringify(this.admin)){
        return true;
      } else {
        this.router.navigate(['/'])
      }
    } else {
      this.router.navigate(['/login'])
    }

  }
  
}
