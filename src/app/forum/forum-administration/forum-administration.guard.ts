import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class ForumAdministrationGuard implements CanActivate {

    isLogged: boolean = false;
    isAdmin: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.isAuth$.subscribe(value => {
            this.isLogged = value;
        })
        this.authService.isAdmin$.subscribe((value: boolean) => {
            this.isAdmin = value;
            this.canActivate();
        })
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.isLogged) {
            if (this.isAdmin) {
                return true
            } else {
                this.router.navigate(['/user']).catch(error => console.log(error));
                return false
            }
        }
        this.router.navigate(['/login']).catch(error => console.log(error));
        return false
    }

    ngOnDestroy() {
        this.authService.isAuth$.unsubscribe();
    }

}
