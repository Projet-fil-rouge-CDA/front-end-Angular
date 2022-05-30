import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DropDownAnimation} from "../../animations/dropdown";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [DropDownAnimation]
})
export class DropdownComponent implements OnInit {
  isLogged = this.authService.isAuth$.value;
  role$ = this.authService.role$.value;
  isOpen = false;


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log(this.role$)
  }

  logout() {
    this.authService.logout();
  }
}
