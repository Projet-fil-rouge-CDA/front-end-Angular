import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VisitorGuard implements CanActivate {
  isLogged : boolean = false
  constructor(
    private router : Router,
    private authService: AuthService
  ){
    this.authService.isAuth$.subscribe(value => {
      this.isLogged = value;
      this.canActivate()
    })
  }

  canActivate() : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.isLogged){
      return true;
    }
    this.router.navigate(['/user']);
    return false
    }

    ngOnDestroy(){
      this.authService.isAuth$.unsubscribe();
    }
}
