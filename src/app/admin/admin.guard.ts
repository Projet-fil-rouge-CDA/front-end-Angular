import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../shared/services/token.service";
import {AuthService} from "../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    isLogged: boolean = false;
    isAdmin: boolean = false;
    constructor(
        private tokenService : TokenService,
        private router : Router,
        private authService : AuthService
    ) {
        this.authService.isAuth$.subscribe(value => {
            this.isLogged = value;
        })
        this.authService.isAdmin$.subscribe(value => {
            this.isAdmin = value;
            this.canActivate();
        })
    }
    canActivate() : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.isLogged){
            if(this.isAdmin){
                return true
            } else {
                this.router.navigate(['/user']);
                return false
            }
        }
        this.router.navigate(['/login']);
        return false
    }

    ngOnDestroy(){
        this.authService.isAuth$.unsubscribe();
    }

}
