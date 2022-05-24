import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isLogged : boolean = false;
  cookieValue : string;
  constructor(
    private router : Router,
    private authService : AuthService,
    private cookieService : CookieService
  ){
    this.authService.isAuth$.subscribe(value => {
      this.isLogged = value;
      this.canActivate()
    })
  }

  canActivate() : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLogged){
      this.cookieValue = this.cookieService.get('session')
      if(this.cookieValue /* vérifier le rôle de lié à l'utilisateur = admin*/){
        return true
      } else {
        return false
      }
    }
    this.router.navigate(['/login'])
    return false;
  }

  ngOnDestroy(){
    this.authService.isAuth$.unsubscribe();
  }

}
