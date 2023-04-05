import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;

  isAdmin : boolean = false;

  constructor(
    public router: Router,
    private authService: AuthService
    ) {
  }

  ngOnInit(): void {
    this.authService.isAuth$.subscribe(value => {
      this.isLogged = value
    })
    this.authService.isAdmin$.subscribe(value => {
      this.isAdmin = value
    })
  }
  logout() {
    this.authService.logout();
  }
}
