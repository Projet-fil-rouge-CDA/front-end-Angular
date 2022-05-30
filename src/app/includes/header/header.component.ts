import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false

  constructor(
    public router: Router,
    private authService: AuthService,
    private cookieService: CookieService
    ) {
  }

  ngOnInit(): void {
    this.authService.isAuth$.subscribe(value => {
      this.isLogged = value
      const checkCookie = this.cookieService.check('session')
    })
  }
  logout() {
    this.authService.logout();
  }
}
